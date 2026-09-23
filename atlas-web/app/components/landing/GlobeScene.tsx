"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  addStudioLights,
  createAirplaneModel,
  createRenderer,
  disposeScene,
} from "@/app/components/landing/three/scene-models";

export function GlobeScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = createRenderer(host);
    } catch {
      setFallback(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(0, 0.05, 7.65);

    const presentation = new THREE.Group();
    presentation.rotation.x = -0.035;
    scene.add(presentation);

    const earthAxis = new THREE.Group();
    earthAxis.rotation.z = THREE.MathUtils.degToRad(-23.4);
    presentation.add(earthAxis);

    const earthSpin = new THREE.Group();
    earthSpin.rotation.y = -0.5;
    earthAxis.add(earthSpin);

    const earthMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.62,
      metalness: 0.02,
    });
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1.9, 64, 48),
      earthMaterial,
    );
    earthSpin.add(earth);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/earth-texture.png",
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
        earthMaterial.map = texture;
        earthMaterial.needsUpdate = true;
      },
      undefined,
      () => {
        earthMaterial.color.setHex(0x347caf);
      },
    );

    const grid = new THREE.Mesh(
      new THREE.SphereGeometry(1.913, 24, 16),
      new THREE.MeshBasicMaterial({
        color: 0xd9edff,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      }),
    );
    earthSpin.add(grid);

    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x8fc5ff,
      transparent: true,
      opacity: 0.11,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.035, 48, 32),
      atmosphereMaterial,
    );
    earthAxis.add(atmosphere);

    const flightPlane = new THREE.Group();
    flightPlane.rotation.set(1.02, 0.14, -0.3);
    earthAxis.add(flightPlane);

    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0xe6f4ff,
      transparent: true,
      opacity: 0.38,
    });
    const orbitLine = new THREE.Mesh(
      new THREE.TorusGeometry(2.55, 0.011, 8, 128),
      orbitMaterial,
    );
    flightPlane.add(orbitLine);

    const flightMotion = new THREE.Group();
    flightPlane.add(flightMotion);

    const airplane = createAirplaneModel();
    airplane.position.x = 2.55;
    airplane.rotation.z = Math.PI / 2;
    flightMotion.add(airplane);

    addStudioLights(scene, true);

    const pointer = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2();
    const clock = new THREE.Clock();
    let animationFrame = 0;
    let running = false;
    let inViewport = false;

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointerTarget.set(
        ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
        ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
      );
    };
    const resetPointer = () => pointerTarget.set(0, 0);
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", resetPointer);

    const render = () => {
      if (!running) return;
      const delta = Math.min(clock.getDelta(), 1 / 30);
      const elapsed = clock.elapsedTime;
      const ease = 1 - Math.exp(-delta * 6.5);
      pointer.lerp(pointerTarget, ease);

      const sceneDriftX = reducedMotion
        ? 0
        : Math.sin(elapsed * 0.22 + 0.8) * 0.018;
      const sceneDriftY = reducedMotion
        ? 0
        : Math.sin(elapsed * 0.18) * 0.035;

      presentation.rotation.y = THREE.MathUtils.lerp(
        presentation.rotation.y,
        pointer.x * 0.075 + sceneDriftY,
        ease,
      );
      presentation.rotation.x = THREE.MathUtils.lerp(
        presentation.rotation.x,
        -0.035 - pointer.y * 0.055 + sceneDriftX,
        ease,
      );

      if (!reducedMotion) {
        earthSpin.rotation.y += delta * 0.23;
        earthAxis.rotation.x = Math.sin(elapsed * 0.31) * 0.026;
        earthAxis.rotation.y = Math.sin(elapsed * 0.24 + 1.2) * 0.035;
        earthAxis.rotation.z =
          THREE.MathUtils.degToRad(-23.4) +
          Math.sin(elapsed * 0.27 + 0.5) * 0.012;

        flightMotion.rotation.z -=
          delta * (0.42 + Math.sin(elapsed * 0.24) * 0.025);
        airplane.position.z = Math.sin(elapsed * 0.92) * 0.055;
        airplane.rotation.x = Math.sin(elapsed * 0.84) * 0.13;
        airplane.rotation.y = Math.sin(elapsed * 0.57 + 0.8) * 0.055;
        airplane.rotation.z =
          Math.PI / 2 + Math.sin(elapsed * 0.66 + 0.4) * 0.028;

        atmosphere.scale.setScalar(1 + Math.sin(elapsed * 0.52) * 0.007);
        atmosphereMaterial.opacity =
          0.11 + Math.sin(elapsed * 0.48 + 0.4) * 0.018;
        orbitMaterial.opacity =
          0.34 + Math.sin(elapsed * 0.62 + 1.1) * 0.065;
      }

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };

    const syncAnimation = () => {
      const shouldRun = inViewport && !document.hidden;
      if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(animationFrame);
      } else if (shouldRun && !running) {
        running = true;
        clock.getDelta();
        animationFrame = requestAnimationFrame(render);
      }
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry?.isIntersecting ?? false;
        syncAnimation();
      },
      { rootMargin: "12% 0px", threshold: 0.01 },
    );
    visibilityObserver.observe(host);

    const onVisibility = () => syncAnimation();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", resetPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      disposeScene(scene, renderer);
    };
  }, []);

  return (
    <div className="landing-scene" aria-hidden="true">
      <div className="landing-three-host" ref={hostRef}>
        {fallback ? <span className="landing-three-fallback" /> : null}
      </div>
    </div>
  );
}
