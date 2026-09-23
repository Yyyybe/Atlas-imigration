import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const GOLD = 0xd7b66f;
const PAPER = 0xfffbef;

function material(
  color: number,
  options: Partial<THREE.MeshStandardMaterialParameters> = {},
) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.46,
    metalness: 0.03,
    ...options,
  });
}

function roundedBox(
  width: number,
  height: number,
  depth: number,
  radius: number,
  meshMaterial: THREE.Material,
) {
  return new THREE.Mesh(
    new RoundedBoxGeometry(width, height, depth, 4, radius),
    meshMaterial,
  );
}

export function createPassportModel() {
  const passport = new THREE.Group();
  passport.name = "passport";

  const pages = roundedBox(
    1.08,
    1.48,
    0.13,
    0.055,
    material(0xf1eadc, { roughness: 0.8 }),
  );
  pages.position.set(0.035, -0.015, -0.055);
  passport.add(pages);

  const cover = roundedBox(
    1.18,
    1.62,
    0.105,
    0.072,
    material(0x173b56, { roughness: 0.3, metalness: 0.08 }),
  );
  cover.position.z = 0.035;
  passport.add(cover);

  const spine = new THREE.Mesh(
    new THREE.BoxGeometry(0.055, 1.48, 0.12),
    material(0x0d2d45, { roughness: 0.38 }),
  );
  spine.position.set(-0.53, 0, 0.03);
  passport.add(spine);

  const gold = material(GOLD, { roughness: 0.26, metalness: 0.58 });
  const crest = new THREE.Mesh(
    new THREE.TorusGeometry(0.225, 0.014, 10, 42),
    gold,
  );
  crest.position.set(0.03, 0.15, 0.099);
  passport.add(crest);

  const latitude = new THREE.Mesh(
    new THREE.TorusGeometry(0.16, 0.009, 8, 36),
    gold,
  );
  latitude.position.copy(crest.position);
  latitude.scale.y = 0.45;
  passport.add(latitude);

  const longitude = latitude.clone();
  longitude.scale.set(0.42, 1, 1);
  passport.add(longitude);

  [0.39, 0.27].forEach((width, index) => {
    const line = roundedBox(width, 0.018, 0.014, 0.007, gold);
    line.position.set(0.03, -0.43 - index * 0.09, 0.099);
    passport.add(line);
  });

  return passport;
}

export function createCertificateModel() {
  const certificate = new THREE.Group();
  certificate.name = "certificate";

  const shadowPage = roundedBox(
    1.34,
    1.68,
    0.07,
    0.055,
    material(0xe8dfcc, { roughness: 0.86 }),
  );
  shadowPage.position.set(0.055, -0.045, -0.055);
  shadowPage.rotation.z = -0.025;
  certificate.add(shadowPage);

  const page = roundedBox(
    1.38,
    1.72,
    0.065,
    0.055,
    material(PAPER, { roughness: 0.72 }),
  );
  certificate.add(page);

  const ink = material(0x536b7d, { roughness: 0.74 });
  const heading = roundedBox(0.72, 0.025, 0.014, 0.008, ink);
  heading.position.set(-0.16, 0.48, 0.049);
  certificate.add(heading);

  [0.95, 0.82, 0.92, 0.66].forEach((width, index) => {
    const line = roundedBox(width, 0.018, 0.012, 0.006, ink);
    line.position.set(-0.03, 0.24 - index * 0.18, 0.049);
    certificate.add(line);
  });

  const seal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.17, 0.17, 0.025, 40),
    material(0xb94f55, { roughness: 0.35, metalness: 0.08 }),
  );
  seal.rotation.x = Math.PI / 2;
  seal.position.set(0.39, -0.57, 0.055);
  certificate.add(seal);

  const sealRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.105, 0.011, 8, 32),
    material(0xf4c3b6, { roughness: 0.38 }),
  );
  sealRing.position.set(0.39, -0.57, 0.072);
  certificate.add(sealRing);

  return certificate;
}

export function createPermitModel() {
  const permit = new THREE.Group();
  permit.name = "permit";

  const card = roundedBox(
    1.6,
    1.02,
    0.09,
    0.095,
    material(0xc8e4f3, { roughness: 0.28, metalness: 0.05 }),
  );
  permit.add(card);

  const band = roundedBox(
    1.44,
    0.12,
    0.012,
    0.03,
    material(0x3c7094, { roughness: 0.5 }),
  );
  band.position.set(0, 0.35, 0.057);
  permit.add(band);

  const portrait = roundedBox(
    0.37,
    0.48,
    0.018,
    0.045,
    material(0x7fa3b9, { roughness: 0.58 }),
  );
  portrait.position.set(-0.46, 0.01, 0.059);
  permit.add(portrait);

  const head = new THREE.Mesh(
    new THREE.CircleGeometry(0.075, 28),
    material(0xd9ebf4, { roughness: 0.62 }),
  );
  head.position.set(-0.46, 0.09, 0.071);
  permit.add(head);

  const shoulders = new THREE.Mesh(
    new THREE.CircleGeometry(0.13, 28, 0, Math.PI),
    material(0xd9ebf4, { roughness: 0.62 }),
  );
  shoulders.position.set(-0.46, -0.14, 0.071);
  permit.add(shoulders);

  const chip = roundedBox(
    0.27,
    0.19,
    0.018,
    0.028,
    material(GOLD, { roughness: 0.28, metalness: 0.46 }),
  );
  chip.position.set(-0.49, -0.35, 0.059);
  permit.add(chip);

  const ink = material(0x3a6480, { roughness: 0.64 });
  [0.52, 0.64, 0.48].forEach((width, index) => {
    const line = roundedBox(width, 0.021, 0.012, 0.007, ink);
    line.position.set(0.31, 0.15 - index * 0.17, 0.059);
    permit.add(line);
  });

  return permit;
}

function createWingGeometry(
  length: number,
  span: number,
  sweep: number,
  thickness: number,
) {
  const shape = new THREE.Shape();
  const rootFront = length * 0.48;
  const rootBack = -length * 0.52;
  const tipFront = rootFront - sweep;
  const tipBack = rootBack - sweep * 0.48;
  const rootGap = span * 0.075;

  shape.moveTo(rootFront, rootGap);
  shape.lineTo(tipFront, span);
  shape.lineTo(tipBack, span);
  shape.lineTo(rootBack, rootGap);
  shape.lineTo(rootBack, -rootGap);
  shape.lineTo(tipBack, -span);
  shape.lineTo(tipFront, -span);
  shape.lineTo(rootFront, -rootGap);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: Math.min(0.012, thickness * 0.3),
    bevelThickness: Math.min(0.008, thickness * 0.22),
    curveSegments: 2,
  });
  geometry.translate(0, 0, -thickness / 2);
  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();
  return geometry;
}

export function createAirplaneModel() {
  const airplane = new THREE.Group();
  airplane.name = "airplane";
  const white = material(0xf8fbff, { roughness: 0.2, metalness: 0.16 });
  const blue = material(0x2f76ad, { roughness: 0.24, metalness: 0.16 });
  const navy = material(0x102e45, { roughness: 0.3, metalness: 0.2 });
  const warmWhite = material(0xe8f2f8, {
    roughness: 0.34,
    metalness: 0.08,
  });

  const fuselage = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.067, 0.78, 24, 3),
    white,
  );
  fuselage.rotation.z = -Math.PI / 2;
  airplane.add(fuselage);

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.092, 24, 16), white);
  nose.scale.set(1.55, 1, 1);
  nose.position.x = 0.42;
  airplane.add(nose);

  const tailCone = new THREE.Mesh(
    new THREE.ConeGeometry(0.078, 0.25, 24, 2),
    warmWhite,
  );
  tailCone.rotation.z = Math.PI / 2;
  tailCone.position.x = -0.505;
  airplane.add(tailCone);

  const wings = new THREE.Mesh(
    createWingGeometry(0.34, 0.66, 0.2, 0.045),
    white,
  );
  wings.position.set(0.025, -0.006, 0);
  airplane.add(wings);

  const wingAccent = new THREE.Mesh(
    createWingGeometry(0.16, 0.62, 0.12, 0.049),
    blue,
  );
  wingAccent.position.set(-0.16, -0.008, 0);
  airplane.add(wingAccent);

  const tailWings = new THREE.Mesh(
    createWingGeometry(0.19, 0.255, 0.075, 0.032),
    warmWhite,
  );
  tailWings.position.set(-0.37, 0.018, 0);
  airplane.add(tailWings);

  const finShape = new THREE.Shape();
  finShape.moveTo(-0.49, 0.035);
  finShape.lineTo(-0.39, 0.29);
  finShape.lineTo(-0.22, 0.04);
  finShape.closePath();
  const finGeometry = new THREE.ExtrudeGeometry(finShape, {
    depth: 0.035,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.009,
    bevelThickness: 0.006,
  });
  finGeometry.translate(0, 0, -0.0175);
  const fin = new THREE.Mesh(finGeometry, blue);
  airplane.add(fin);

  [-0.29, 0.29].forEach((side) => {
    const engine = new THREE.Mesh(
      new THREE.CylinderGeometry(0.052, 0.043, 0.2, 18, 1),
      blue,
    );
    engine.rotation.z = -Math.PI / 2;
    engine.position.set(0.02, -0.085, side);
    airplane.add(engine);

    const intake = new THREE.Mesh(new THREE.CircleGeometry(0.039, 18), navy);
    intake.rotation.y = Math.PI / 2;
    intake.position.set(0.122, -0.085, side);
    airplane.add(intake);
  });

  const windowMaterial = material(0x173b56, {
    roughness: 0.18,
    metalness: 0.34,
  });
  [-0.2, -0.09, 0.02, 0.13, 0.24].forEach((x) => {
    [-1, 1].forEach((side) => {
      const window = new THREE.Mesh(
        new THREE.SphereGeometry(0.014, 10, 8),
        windowMaterial,
      );
      window.scale.set(1.25, 0.74, 0.46);
      window.position.set(x, 0.044, side * 0.078);
      airplane.add(window);
    });
  });

  const cockpit = new THREE.Mesh(
    new THREE.SphereGeometry(0.046, 16, 10),
    navy,
  );
  cockpit.scale.set(1.15, 0.48, 0.8);
  cockpit.position.set(0.39, 0.056, 0);
  airplane.add(cockpit);

  const navigationLights = [
    { color: 0xf15a64, z: 0.66 },
    { color: 0x62d5a4, z: -0.66 },
  ];
  navigationLights.forEach(({ color, z }) => {
    const light = new THREE.Mesh(
      new THREE.SphereGeometry(0.018, 12, 8),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1.8,
        roughness: 0.22,
      }),
    );
    light.position.set(-0.18, 0, z);
    airplane.add(light);
  });

  airplane.scale.setScalar(0.7);
  return airplane;
}

export function addStudioLights(scene: THREE.Scene, warm = false) {
  scene.add(new THREE.HemisphereLight(0xeaf6ff, 0x10243e, 2.2));

  const key = new THREE.DirectionalLight(0xffffff, 3.3);
  key.position.set(4, 5, 7);
  scene.add(key);

  const rim = new THREE.PointLight(0x8fc5ff, 8, 16);
  rim.position.set(-4, 1.5, 4);
  scene.add(rim);

  if (warm) {
    const fill = new THREE.PointLight(0xffddb0, 4.5, 12);
    fill.position.set(3, -3, 4);
    scene.add(fill);
  }
}

export function createRenderer(host: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  const mobile = window.matchMedia("(max-width: 760px)").matches;
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, mobile ? 1.15 : 1.45),
  );
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.domElement.className = "landing-three-canvas";
  host.appendChild(renderer.domElement);
  return renderer;
}

export function disposeScene(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
  scene.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    object.geometry.dispose();
    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material];
    materials.forEach((meshMaterial) => {
      if (
        meshMaterial instanceof THREE.MeshStandardMaterial &&
        meshMaterial.map
      ) {
        meshMaterial.map.dispose();
      }
      meshMaterial.dispose();
    });
  });
  renderer.dispose();
  renderer.domElement.remove();
}
