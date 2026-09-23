"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const SKY = 0x8fc5ff;
const PAPER = 0xfff8e8;
const GOLD = 0xd9b56d;

function physical(
  color: number,
  options: Partial<THREE.MeshPhysicalMaterialParameters> = {},
) {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.34,
    metalness: 0.05,
    clearcoat: 0.35,
    clearcoatRoughness: 0.28,
    ...options,
  });
}

function addPassport() {
  const group = new THREE.Group();
  const cover = new THREE.Mesh(
    new RoundedBoxGeometry(1.18, 1.62, 0.14, 5, 0.08),
    physical(0x183e59, { roughness: 0.28, clearcoat: 0.55 }),
  );
  cover.castShadow = true;
  group.add(cover);

  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(0.24, 0.016, 12, 48),
    physical(GOLD, { metalness: 0.55, roughness: 0.22 }),
  );
  rim.position.set(0, 0.12, 0.082);
  group.add(rim);

  const meridian = new THREE.Mesh(
    new THREE.TorusGeometry(0.145, 0.011, 10, 36),
    physical(GOLD, { metalness: 0.55 }),
  );
  meridian.position.copy(rim.position);
  meridian.scale.x = 0.46;
  group.add(meridian);

  for (const y of [-0.42, -0.5]) {
    const line = new THREE.Mesh(
      new RoundedBoxGeometry(y === -0.42 ? 0.52 : 0.36, 0.018, 0.012, 2, 0.008),
      physical(GOLD, { metalness: 0.48 }),
    );
    line.position.set(0, y, 0.082);
    group.add(line);
  }

  group.rotation.set(-0.16, -0.3, 0.12);
  return group;
}

function addCertificate() {
  const group = new THREE.Group();
  const paper = new THREE.Mesh(
    new RoundedBoxGeometry(1.35, 1.72, 0.085, 5, 0.07),
    physical(PAPER, { roughness: 0.56, clearcoat: 0.08 }),
  );
  paper.castShadow = true;
  group.add(paper);

  const ink = physical(0x587086, { roughness: 0.64 });
  [0.38, 0.17, -0.05, -0.27].forEach((y, index) => {
    const line = new THREE.Mesh(
      new RoundedBoxGeometry(index === 0 ? 0.72 : 0.9, 0.022, 0.012, 2, 0.008),
      ink,
    );
    line.position.set(index === 0 ? -0.13 : 0, y, 0.052);
    group.add(line);
  });

  const seal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.17, 0.17, 0.025, 48),
    physical(0xc96464, { roughness: 0.3, clearcoat: 0.45 }),
  );
  seal.rotation.x = Math.PI / 2;
  seal.position.set(0.38, -0.57, 0.065);
  group.add(seal);

  group.rotation.set(0.15, 0.26, -0.12);
  return group;
}

function addPermitCard() {
  const group = new THREE.Group();
  const card = new THREE.Mesh(
    new RoundedBoxGeometry(1.55, 0.98, 0.1, 5, 0.1),
    physical(0xc8e5f7, {
      roughness: 0.25,
      clearcoat: 0.72,
      transmission: 0.08,
    }),
  );
  card.castShadow = true;
  group.add(card);

  const portrait = new THREE.Mesh(
    new RoundedBoxGeometry(0.35, 0.45, 0.018, 4, 0.045),
    physical(0x6d93ad, { roughness: 0.48 }),
  );
  portrait.position.set(-0.43, 0.06, 0.065);
  group.add(portrait);

  const chip = new THREE.Mesh(
    new RoundedBoxGeometry(0.25, 0.18, 0.02, 3, 0.035),
    physical(GOLD, { metalness: 0.48, roughness: 0.25 }),
  );
  chip.position.set(-0.48, -0.3, 0.065);
  group.add(chip);

  const ink = physical(0x38617c, { roughness: 0.55 });
  [0.2, 0.04, -0.12].forEach((y, index) => {
    const line = new THREE.Mesh(
      new RoundedBoxGeometry(index === 0 ? 0.52 : 0.63, 0.024, 0.012, 2, 0.009),
      ink,
    );
    line.position.set(0.32, y, 0.065);
    group.add(line);
  });

  group.rotation.set(-0.12, -0.28, 0.08);
  return group;
}

function addAirplane() {
  const airplane = new THREE.Group();
  const white = physical(0xf8fbff, {
    metalness: 0.12,
    roughness: 0.2,
    clearcoat: 0.8,
  });

  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.08, 0.54, 6, 16),
    white,
  );
  body.rotation.z = Math.PI / 2;
  airplane.add(body);

  const wingGeometry = new THREE.BufferGeometry();
  wingGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      [-0.16, 0, 0, 0.12, 0.44, 0, 0.2, 0, 0, 0.12, -0.44, 0],
      3,
    ),
  );
  wingGeometry.setIndex([0, 1, 2, 0, 2, 3]);
  wingGeometry.computeVertexNormals();
  const wings = new THREE.Mesh(wingGeometry, white);
  wings.rotation.y = -0.08;
  airplane.add(wings);

  const tail = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.24, 0.035),
    white,
  );
  tail.position.x = -0.28;
  tail.rotation.z = 0.32;
  airplane.add(tail);

  airplane.scale.setScalar(0.48);
  return airplane;
}

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
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setFallback(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.className = "landing-three-canvas";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.05, 8.4);

    const root = new THREE.Group();
    scene.add(root);

    const globe = new THREE.Group();
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.72, 96, 64),
      physical(0x2d6da3, {
        roughness: 0.2,
        clearcoat: 0.68,
        clearcoatRoughness: 0.16,
      }),
    );
    sphere.castShadow = true;
    globe.add(sphere);

    const grid = new THREE.Mesh(
      new THREE.SphereGeometry(1.735, 24, 16),
      new THREE.MeshBasicMaterial({
        color: 0xb9dcff,
        wireframe: true,
        transparent: true,
        opacity: 0.16,
      }),
    );
    globe.add(grid);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.86, 64, 48),
      new THREE.MeshBasicMaterial({
        color: SKY,
        transparent: true,
        opacity: 0.09,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      }),
    );
    globe.add(atmosphere);
    globe.rotation.z = -0.16;
    root.add(globe);

    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(2.34, 0.012, 12, 160),
      new THREE.MeshBasicMaterial({
        color: 0xd9edff,
        transparent: true,
        opacity: 0.45,
      }),
    );
    orbit.rotation.set(1.12, 0.1, -0.3);
    root.add(orbit);

    const passport = addPassport();
    passport.position.set(2.2, 1.45, 0.32);
    root.add(passport);

    const certificate = addCertificate();
    certificate.position.set(-2.15, -1.42, 0.48);
    root.add(certificate);

    const permit = addPermitCard();
    permit.position.set(2.18, -1.62, 0.68);
    root.add(permit);

    const airplane = addAirplane();
    root.add(airplane);

    scene.add(new THREE.HemisphereLight(0xe9f5ff, 0x10243e, 2.35));
    const key = new THREE.DirectionalLight(0xffffff, 4.6);
    key.position.set(4, 5, 7);
    key.castShadow = true;
    scene.add(key);
    const rim = new THREE.PointLight(SKY, 12, 16);
    rim.position.set(-4, 1, 4);
    scene.add(rim);
    const warm = new THREE.PointLight(0xffdfad, 5, 12);
    warm.position.set(3, -3, 3);
    scene.add(warm);

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

    const observer = new ResizeObserver(resize);
    observer.observe(host);
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
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;
      const ease = 1 - Math.exp(-delta * 7);
      pointer.lerp(pointerTarget, ease);

      root.rotation.y = THREE.MathUtils.lerp(
        root.rotation.y,
        pointer.x * 0.12,
        ease,
      );
      root.rotation.x = THREE.MathUtils.lerp(
        root.rotation.x,
        -pointer.y * 0.08,
        ease,
      );

      if (!reducedMotion) {
        globe.rotation.y += delta * 0.17;
        passport.position.y = 1.45 + Math.sin(elapsed * 0.72) * 0.12;
        passport.rotation.z = 0.12 + Math.sin(elapsed * 0.46) * 0.035;
        certificate.position.y = -1.42 + Math.sin(elapsed * 0.61 + 1.8) * 0.11;
        permit.position.y = -1.62 + Math.sin(elapsed * 0.78 + 3.1) * 0.09;

        const flight = elapsed * 0.34;
        airplane.position.set(
          Math.cos(flight) * 2.34,
          Math.sin(flight) * 1.02,
          Math.sin(flight) * 1.12 + 0.25,
        );
        airplane.rotation.set(
          0.28 * Math.sin(flight),
          -flight + Math.PI / 2,
          0.16,
        );
      } else {
        airplane.position.set(1.8, 0.55, 1.4);
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
      { rootMargin: "15% 0px", threshold: 0.01 },
    );
    visibilityObserver.observe(host);

    const onVisibility = () => syncAnimation();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      visibilityObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", resetPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => material.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
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
