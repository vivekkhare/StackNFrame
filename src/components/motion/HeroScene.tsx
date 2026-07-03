"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";
import { HeroFallback } from "./HeroFallback";

const AZURE = 0x5ca9ff;
const INK = 0xeaf2fb;

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

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  // This component is client-only (ssr:false), so probing WebGL in the lazy
  // initializer is safe and avoids a setState-in-effect cascade.
  const [webgl] = useState(() => supportsWebGL());
  const fallback = reduce || !webgl;

  useEffect(() => {
    if (fallback) return;
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(5, 4.4, 5);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // the frame: azure wireframe cube
    const cage = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(2.6, 2.6, 2.6)),
      new THREE.LineBasicMaterial({
        color: AZURE,
        transparent: true,
        opacity: 0.45,
      }),
    );
    group.add(cage);

    // the stack: 4 translucent slabs with hairline edges
    const slabGeo = new THREE.BoxGeometry(1.9, 0.06, 1.9);
    const slabs: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const top = i === 3;
      const slab = new THREE.Mesh(
        slabGeo,
        new THREE.MeshBasicMaterial({
          color: top ? AZURE : INK,
          transparent: true,
          opacity: top ? 0.22 : 0.07,
        }),
      );
      slab.position.y = i * 0.62 - 0.93;
      slab.add(
        new THREE.LineSegments(
          new THREE.EdgesGeometry(slabGeo),
          new THREE.LineBasicMaterial({
            color: top ? AZURE : INK,
            transparent: true,
            opacity: top ? 0.9 : 0.35,
          }),
        ),
      );
      slabs.push(slab);
      group.add(slab);
    }

    // scan line: thin emissive plane sweeping the stack
    const scan = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 0.015),
      new THREE.MeshBasicMaterial({
        color: AZURE,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      }),
    );
    scene.add(scan);

    let raf = 0;
    let running = false;
    const start = performance.now();
    const animate = () => {
      if (!running) return;
      raf = requestAnimationFrame(animate);
      const t = (performance.now() - start) / 1000;

      group.rotation.y = t * 0.24;
      slabs.forEach((slab, i) => {
        slab.position.y = i * 0.62 - 0.93 + Math.sin(t * 0.9 + i) * 0.05;
      });

      const cycle = (t % 4.5) / 4.5;
      scan.position.y = -1.3 + cycle * 2.9;
      scan.lookAt(camera.position);
      (scan.material as THREE.MeshBasicMaterial).opacity =
        cycle < 0.06 || cycle > 0.92 ? 0 : 0.8;

      renderer.render(scene, camera);
    };

    // Render only while the hero is actually visible; saves battery and
    // keeps the main thread free once the user scrolls past.
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
      ro.disconnect();
      renderer.dispose();
      slabGeo.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
          obj.geometry.dispose();
          const mat = obj.material as THREE.Material;
          mat.dispose();
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
