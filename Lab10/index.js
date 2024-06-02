const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1, 300);
light.position.set(-5, -1, 0.5);
camera.add(light);
scene.add(camera);

const material = new THREE.MeshPhongMaterial(
    {
        color: 0x000000 
    }
);

const points = [
    {"x": 1.2, "y": 0},
    {"x": 1.2, "y": 0.4},
    {"x": 0.9, "y": 0.4},
    {"x": 0.9, "y": 0.5},
    {"x": 0.78, "y": 1.2},
    {"x": 0.66, "y": 2.5},
    {"x": 0.5, "y": 4},
    {"x": 0.7, "y": 4},
    {"x": 0.7, "y": 4.25},
    {"x": 1, "y": 4.25},
    {"x": 1, "y": 4.9}
];


points.push({"x": 0.9, "y": 5.2});
points.push({"x": 0.5, "y": 5.5});
points.push({"x": 0.6, "y": 6});
points.push({"x": 0, "y": 6});

const geometry = new THREE.LatheGeometry(points, 32);
const lathe = new THREE.Mesh(geometry, material);
lathe.position.set(0, -4, 0);
scene.add(lathe);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

camera.position.z = 5;

animate();