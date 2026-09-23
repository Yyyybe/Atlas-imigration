"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  addStudioLights,
  createCertificateModel,
  createPassportModel,
  createPermitModel,
  createRenderer,
  disposeScene,
} from "@/app/components/landing/three/scene-models";

type DocumentSceneProps = {
  activeStep: number;
};

type Pose = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

const POSES: Array<[Pose, Pose, Pose]> = [
  [
    {
      position: [-1.28, 0.7, 0.15],
      rotation: [-0.17, 0.3, -0.15],
      scale: 0.96,
    },
    {
      position: [0.4, 0.62, 0.48],
      rotation: [0.12, -0.24, 0.09],
      scale: 1,
    },
    {
      position: [0.95, -0.82, 0.75],
      rotation: [-0.1, 0.24, -0.06],
      scale: 1.03,
    },
  ],
  [
    {
      position: [-1.05, 0.22, 0.18],
      rotation: [-0.07, 0.16, -0.11],
      scale: 0.96,
    },
    {
      position: [0, 0.18, 0.52],
      rotation: [0.02, 0, 0.025],
      scale: 1.02,
    },
    {
      position: [1.08, 0.06, 0.82],
      rotation: [-0.04, -0.17, 0.08],
      scale: 1,
    },
  ],
  [
    {
      position: [-1.58, 0.48, 0.02],
      rotation: [-0.06, 0.28, -0.16],
      scale: 0.86,
    },
    {
      position: [0, 0.12, 0.3],
      rotation: [0.01, 0, 0],
      scale: 0.9,
    },
    {
      position: [1.58, -0.28, 0.5],
      rotation: [-0.03, -0.28, 0.13],
      scale: 0.84,
    },
  ],
];

export function DocumentScene({ activeStep }: DocumentSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef(activeStep);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

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
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
    camera.position.set(0, 0.04, 6.7);

    const presentation = new THREE.Group();
    scene.add(presentation);

    const documents = [
      createPassportModel(),
      createCertificateModel(),
      createPermitModel(),
    ] as const;
    documents.forEach((documentModel, index) => {
      const pose = POSES[0][index];
      documentModel.position.set(...pose.position);
      documentModel.rotation.set(...pose.rotation);
      documentModel.scale.setScalar(pose.scale);
      presentation.add(documentModel);
    });

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
      const ease = reducedMotion ? 1 : 1 - Math.exp(-delta * 5.8);
      const poseIndex = Math.min(2, Math.max(0, activeStepRef.current));
      pointer.lerp(pointerTarget, ease);

      presentation.rotation.y = THREE.MathUtils.lerp(
        presentation.rotation.y,
        pointer.x * 0.08,
        ease,
      );
      presentation.rotation.x = THREE.MathUtils.lerp(
        presentation.rotation.x,
        -pointer.y * 0.055,
        ease,
      );

      documents.forEach((documentModel, index) => {
        const pose = POSES[poseIndex][index];
        const float = reducedMotion
          ? 0
          : Math.sin(elapsed * (0.52 + index * 0.07) + index * 1.6) * 0.045;

        documentModel.position.x = THREE.MathUtils.lerp(
          documentModel.position.x,
          pose.position[0],
          ease,
        );
        documentModel.position.y = THREE.MathUtils.lerp(
          documentModel.position.y,
          pose.position[1] + float,
          ease,
        );
        documentModel.position.z = THREE.MathUtils.lerp(
          documentModel.position.z,
          pose.position[2],
          ease,
        );
        documentModel.rotation.x = THREE.MathUtils.lerp(
          documentModel.rotation.x,
          pose.rotation[0],
          ease,
        );
        documentModel.rotation.y = THREE.MathUtils.lerp(
          documentModel.rotation.y,
          pose.rotation[1],
          ease,
        );
        documentModel.rotation.z = THREE.MathUtils.lerp(
          documentModel.rotation.z,
          pose.rotation[2],
          ease,
        );
        const nextScale = THREE.MathUtils.lerp(
          documentModel.scale.x,
          pose.scale,
          ease,
        );
        documentModel.scale.setScalar(nextScale);
      });

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
    <div className="landing-document-scene">
      <div className="landing-document-three-host" ref={hostRef}>
        {fallback ? (
          <div className="landing-document-fallback">
            <span />
            <span />
            <span />
          </div>
        ) : null}
      </div>
    </div>
  );
}
