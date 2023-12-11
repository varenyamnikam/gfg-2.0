import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import gsap from 'gsap';

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.header__canvas');

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#131417');

// AxesHelper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/11.png');

/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load('/fonts/Poppins_Regular.json', (font) => {
  const fontOptions = {
    font,
    size: 0.35,
    height: 0.1,
    curveSegments: 15,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  };

  const text1 = new TextGeometry('G F G', fontOptions);
  text1.center();

  const text2 = new TextGeometry('X', fontOptions);
  text2.center();

  const text3 = new TextGeometry('P C C O E R', fontOptions);
  text3.center();

  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

  const Text1 = new THREE.Mesh(text1, material);
  Text1.position.y = 0.75;
  Text1.position.x = -1;

  gsap.to(Text1.position, { duration: 1, x: 0 });

  const Text2 = new THREE.Mesh(text2, material);

  const Text3 = new THREE.Mesh(text3, material);
  Text3.position.y = -0.75;
  Text3.position.x = 1;

  gsap.to(Text3.position, { duration: 1, x: 0 });

  scene.add(Text1, Text2, Text3);
});

/**
 * Sizes
 */
const sizes = {
  width: 400,
  height: 400,
};

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
// camera.position.x = 1;
// camera.position.y = 1;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 4;
controls.minDistance = 3;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Pan with mouse
 */
canvas.addEventListener('mousemove', (e) => {
  camera.position.x = (sizes.width / 2 - e.offsetX) / 200;
  camera.position.y = (sizes.height / 2 - e.offsetY) / 200;

  camera.updateProjectionMatrix();
  controls.update();
});

canvas.addEventListener('mouseout', () => {
  camera.position.x = 0;
  camera.position.y = 0;

  camera.updateProjectionMatrix();
  controls.update();
});

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
