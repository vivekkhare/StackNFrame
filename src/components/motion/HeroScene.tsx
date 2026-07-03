"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";
import { HeroFallback } from "./HeroFallback";

const BLUE = 0x7fb0f2;
const GOLD = 0xe8d5b0;
const FOG = 0x060b16;

const W = 1.5;
const D = 1.15;
const FLOORS = [-1.15, -0.35, 0.45, 1.25];
const CORNERS: [number, number][] = [
  [-W, -D],
  [W, -D],
  [W, D],
  [-W, D],
];

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

const easeOutCubic = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

/** Soft radial glow texture for node sprites (fake bloom, no postprocessing). */
function makeGlowTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.25, "rgba(255,255,255,0.6)");
  grad.addColorStop(0.6, "rgba(255,255,255,0.12)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function lineSegments(pts: number[], color: number, opacity: number) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return new THREE.LineSegments(
    geo,
    new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
  );
}

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  // Client-only component (ssr:false): probing WebGL in the lazy initializer
  // is safe and avoids a setState-in-effect cascade.
  const [webgl] = useState(() => supportsWebGL());
  const fallback = reduce || !webgl;

  useEffect(() => {
    if (fallback) return;
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(FOG, 6.5, 12);
    const camera = new THREE.PerspectiveCamera(
      40,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    /* ---- structure, split into pieces so it can assemble in sequence ---- */

    // floor plates (each its own group so it can drop-settle independently)
    const floorGroups: THREE.Group[] = FLOORS.map((y) => {
      const pts: number[] = [];
      const ring = [
        [-W, -D],
        [W, -D],
        [W, D],
        [-W, D],
      ];
      for (let i = 0; i < 4; i++) {
        const [ax, az] = ring[i];
        const [bx, bz] = ring[(i + 1) % 4];
        pts.push(ax, y, az, bx, y, bz);
      }
      pts.push(-W, y, 0, W, y, 0); // cross beam
      const fg = new THREE.Group();
      fg.add(lineSegments(pts, BLUE, 0.5));
      group.add(fg);
      return fg;
    });

    // columns (scaleY draws them upward after the floors land)
    const colPts: number[] = [];
    const yBot = FLOORS[0];
    const yTop = FLOORS[FLOORS.length - 1];
    for (const [cx, cz] of [...CORNERS, [0, -D], [0, D]] as [number, number][]) {
      colPts.push(cx, yBot, cz, cx, yTop, cz);
    }
    const columns = lineSegments(colPts, BLUE, 0.45);
    columns.position.y = yBot;
    columns.geometry.translate(0, -yBot, 0);
    group.add(columns);

    // glowing node sprites at intersections (additive = bloom look)
    const glowTex = makeGlowTexture();
    const sprites: { sprite: THREE.Sprite; base: number; phase: number }[] = [];
    FLOORS.forEach((y, fi) => {
      CORNERS.forEach(([cx, cz], ci) => {
        const isGold = fi === FLOORS.length - 1 && cx > 0;
        const mat = new THREE.SpriteMaterial({
          map: glowTex,
          color: isGold ? GOLD : BLUE,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const sprite = new THREE.Sprite(mat);
        sprite.position.set(cx, y, cz);
        const scale = isGold ? 0.55 : 0.32;
        sprite.scale.setScalar(scale);
        group.add(sprite);
        sprites.push({
          sprite,
          base: isGold ? 0.9 : 0.55,
          phase: fi * 1.3 + ci * 0.7,
        });
      });
    });

    // data pulses: points of light traveling up the corner columns
    const pulses: {
      sprite: THREE.Sprite;
      corner: [number, number];
      speed: number;
      offset: number;
    }[] = [];
    for (let i = 0; i < 5; i++) {
      const mat = new THREE.SpriteMaterial({
        map: glowTex,
        color: i % 3 === 0 ? GOLD : BLUE,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.setScalar(0.14);
      group.add(sprite);
      pulses.push({
        sprite,
        corner: CORNERS[i % 4],
        speed: 0.14 + (i % 3) * 0.05,
        offset: i * 0.23,
      });
    }

    // faint blueprint ground grid
    const grid = new THREE.GridHelper(6, 12, BLUE, BLUE);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0;
    grid.position.y = yBot - 0.02;
    group.add(grid);

    /* ---- interaction + animation ---- */

    let targetTiltX = 0;
    let targetTiltZ = 0;
    let tiltX = 0;
    let tiltZ = 0;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      targetTiltX = (e.clientY / window.innerHeight - 0.5) * 0.16;
      targetTiltZ = (e.clientX / window.innerWidth - 0.5) * 0.16;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    let running = false;
    const start = performance.now();

    const animate = () => {
      if (!running) return;
      raf = requestAnimationFrame(animate);
      const t = (performance.now() - start) / 1000;

      /* construction sequence (first ~2.6s) */
      floorGroups.forEach((fg, i) => {
        const p = easeOutCubic((t - 0.15 - i * 0.22) / 0.7);
        fg.position.y = (1 - p) * 0.5;
        fg.scale.setScalar(0.86 + p * 0.14);
        const mat = (fg.children[0] as THREE.LineSegments)
          .material as THREE.LineBasicMaterial;
        mat.opacity = p * 0.5;
      });
      const colP = easeOutCubic((t - 1.1) / 0.9);
      columns.scale.y = Math.max(0.001, colP);
      (columns.material as THREE.LineBasicMaterial).opacity = colP * 0.45;
      (grid.material as THREE.Material as THREE.LineBasicMaterial).opacity =
        easeOutCubic((t - 1.6) / 1) * 0.08;

      /* nodes ignite after their floor lands, then breathe */
      sprites.forEach(({ sprite, base, phase }, i) => {
        const ignite = easeOutCubic((t - 0.6 - Math.floor(i / 4) * 0.22) / 0.5);
        (sprite.material as THREE.SpriteMaterial).opacity =
          ignite * (base * (0.75 + Math.sin(t * 1.4 + phase) * 0.25));
      });

      /* pulses ride the columns once the structure stands */
      const pulseGate = easeOutCubic((t - 2.2) / 0.8);
      pulses.forEach(({ sprite, corner, speed, offset }) => {
        const cycle = (t * speed + offset) % 1;
        sprite.position.set(
          corner[0],
          yBot + cycle * (yTop - yBot),
          corner[1],
        );
        const fade = Math.sin(cycle * Math.PI);
        (sprite.material as THREE.SpriteMaterial).opacity =
          pulseGate * fade * 0.85;
      });

      /* motion: slow rotation, pointer lean, breathing camera */
      group.rotation.y = t * 0.14;
      tiltX += (targetTiltX - tiltX) * 0.04;
      tiltZ += (targetTiltZ - tiltZ) * 0.04;
      group.rotation.x = tiltX;
      group.rotation.z = tiltZ;

      camera.position.set(
        5.2 + Math.sin(t * 0.18) * 0.18,
        3.4 + Math.sin(t * 0.14 + 1) * 0.14,
        5.2 + Math.cos(t * 0.18) * 0.18,
      );
      camera.lookAt(0, 0.1, 0);

      renderer.render(scene, camera);
    };

    const setRunning = (next: boolean) => {
      if (next === running) return;
      running = next;
      if (running) animate();
      else cancelAnimationFrame(raf);
    };
    const visibility = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting && !document.hidden),
      { threshold: 0.05 },
    );
    visibility.observe(mount);
    const onVisibilityChange = () => {
      if (document.hidden) setRunning(false);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    setRunning(true);
    setReady(true);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      renderer.dispose();
      glowTex.dispose();
      scene.traverse((obj) => {
        if (
          obj instanceof THREE.Mesh ||
          obj instanceof THREE.LineSegments ||
          obj instanceof THREE.Sprite ||
          obj instanceof THREE.Points
        ) {
          if ("geometry" in obj) obj.geometry?.dispose();
          (obj.material as THREE.Material).dispose();
        }
      });
      mount.removeChild(renderer.domElement);
    };
  }, [fallback]);

  if (fallback) return <HeroFallback />;

  return (
    <div className="relative h-full w-full">
      {!ready && (
        <div className="absolute inset-0">
          <HeroFallback />
        </div>
      )}
      <div
        ref={mountRef}
        className={`h-full w-full transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />
    </div>
  );
}
