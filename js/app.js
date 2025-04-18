
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js';
import {{ PointerLockControls }} from 'https://cdn.jsdelivr.net/npm/three@0.154.0/examples/jsm/controls/PointerLockControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0d0ff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Δάπεδο & τοίχοι (ένα κουτί - δωμάτιο)
const room = new THREE.Mesh(
    new THREE.BoxGeometry(20, 10, 20),
    [
        new THREE.MeshBasicMaterial({{ color: 0xffffff }}),  // Right
        new THREE.MeshBasicMaterial({{ color: 0xffffff }}),  // Left
        new THREE.MeshBasicMaterial({{ color: 0xffffff }}),  // Top
        new THREE.MeshBasicMaterial({{ color: 0x999999 }}),  // Bottom (floor)
        new THREE.MeshBasicMaterial({{ color: 0xffffff }}),  // Front
        new THREE.MeshBasicMaterial({{ color: 0xffffff }})   // Back
    ]
);
room.geometry.scale(1, 1, -1);  // Invert normals
scene.add(room);

// Controls
const controls = new PointerLockControls(camera, document.body);
document.body.addEventListener('click', () => controls.lock(), false);
scene.add(controls.getObject());

// Movement
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const keys = {};

document.addEventListener('keydown', e => keys[e.code] = true);
document.addEventListener('keyup', e => keys[e.code] = false);

function animate() {{
    requestAnimationFrame(animate);

    direction.z = Number(keys['KeyW']) - Number(keys['KeyS']);
    direction.x = Number(keys['KeyD']) - Number(keys['KeyA']);
    direction.normalize();

    if (controls.isLocked) {{
        velocity.x -= velocity.x * 0.1;
        velocity.z -= velocity.z * 0.1;

        velocity.x += direction.x * 0.1;
        velocity.z += direction.z * 0.1;

        controls.moveRight(velocity.x);
        controls.moveForward(velocity.z);
    }}

    renderer.render(scene, camera);
}}
animate();

// Φόρτωση εικόνων από φάκελο "images"
const loader = new THREE.TextureLoader();
const imagePositions = [
    [-8, 2, -9], [0, 2, -9], [8, 2, -9],  // Wall 1
    [-8, 2, 9], [0, 2, 9], [8, 2, 9]     // Wall 2
];
const imageFiles = ['product1.jpg', 'product2.jpg', 'product3.jpg', 'product4.jpg'];

imageFiles.forEach((file, i) => {{
    loader.load('images/' + file, texture => {{
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(3, 3),
            new THREE.MeshBasicMaterial({{ map: texture }})
        );
        const pos = imagePositions[i];
        plane.position.set(pos[0], pos[1], pos[2]);
        if (pos[2] > 0) plane.rotation.y = Math.PI;
        scene.add(plane);
    }});
}});
