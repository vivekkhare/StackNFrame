"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";
import { HeroFallback } from "./HeroFallback";

const BLUE = 0x7fb0f2;
const GOLD = 0xe8d5b0;

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

/** Wireframe tower: floor plates + columns + glowing corner nodes, per the reference art. */
function buildTower(group: THREE.Group) {
  const w = 1.5;
  const d = 1.15;
  const floors = [-1.15, -0.35, 0.45, 1.25];

  const linePts: number[] = [];
  const push = (
    a: [number, number, number],
    b: [number, number, number],
  ) => linePts.push(...a, ...b);

  // floor plate outlines
  for (const y of floors) {
    push([-w, y, -d], [w, y, -d]);
    push([w, y, -d], [w, y, d]);
    push([w, y, d], [-w, y, d]);
    push([-w, y, d], [-w, y, -d]);
    // cross beams
    push([-w, y, 0], [w, y, 0]);
  }
  // corner + mid columns
  const yBot = floors[0];
  const yTop = floors[floors.length - 1];
  for (const [cx, cz] of [
    [-w, -d],
    [w, -d],
    [w, d],
    [-w, d],
    [0, -d],
    [0, d],
  ] as const) {
    push([cx, yBot, cz], [cx, yTop, cz]);
  }

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(linePts, 3),
  );
  const lines = new THREE.LineSegments(
    lineGeo,
    new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.5 }),
  );
  group.add(lines);

  // glowing nodes at structural intersections
  const bluePts: number[] = [];
  const goldPts: number[] = [];
  floors.forEach((y, fi) => {
    for (const [cx, cz] of [
      [-w, -d],
      [w, -d],
      [w, d],
      [-w, d],
    ] as const) {
      // warm the top floor's near corners (the reference's champagne glow)
      if (fi === floors.length - 1 && cx > 0) goldPts.push(cx, y, cz);
      else bluePts.push(cx, y, cz);
    }
  });

  const mkPoints = (pts: number[], color: number, size: number) => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity: 0.95,
        sizeAttenuation: false,
      }),
    );
  };
  const blueNodes = mkPoints(bluePts, BLUE, 4);
  const goldNodes = mkPoints(goldPts, GOLD, 6);
  group.add(blueNodes, goldNodes);

  // faint blueprint ground grid
  const grid = new THREE.GridHelper(6, 12, BLUE, BLUE);
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material).opacity = 0.08;
  grid.position.y = yBot - 0.02;
  group.add(grid);

  return { blueNodes, goldNodes };
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
    const camera = new THREE.PerspectiveCamera(
      40,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(5.2, 3.4, 5.2);
    camera.lookAt(0, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const { blueNodes, goldNodes } = buildTower(group);

    // pointer parallax: the structure leans gently toward the cursor
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

      group.rotation.y = t * 0.16;
      tiltX += (targetTiltX - tiltX) * 0.04;
      tiltZ += (targetTiltZ - tiltZ) * 0.04;
      group.rotation.x = tiltX;
      group.rotation.z = tiltZ;

      // nodes breathe softly, offset from each other
      (blueNodes.material as THREE.PointsMaterial).opacity =
        0.65 + Math.sin(t * 1.6) * 0.3;
      (goldNodes.material as THREE.PointsMaterial).opacity =
        0.7 + Math.sin(t * 1.1 + 1.4) * 0.3;

      renderer.render(scene, camera);
    };

    // Render only while visible; saves battery and main-thread time.
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
      scene.traverse((obj) => {
        if (
          obj instanceof THREE.Mesh ||
          obj instanceof THREE.LineSegments ||
          obj instanceof THREE.Points
        ) {
          obj.geometry.dispose();
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
