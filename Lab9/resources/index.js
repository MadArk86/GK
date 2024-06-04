let canvas, renderer, scene, camera;
let controls;
let animating = false;
let frameNumber = 0;
let tempObject;

let objects = {
    structure: [],
    pivots: [],
    horses: [],
}

function render() {
    renderer.render(scene, camera);
}

function createWorld() {
    renderer.setClearColor("black");
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(30, canvas.width / canvas.height, 0.1, 100);
    camera.position.z = 30;
    var light = new THREE.DirectionalLight();
    light.position.set(0, 0, 1);
    camera.add(light);
    scene.add(camera);

    let floor = new THREE.Mesh(
        new THREE.CylinderGeometry(20, 20, 0.6, 4, 1),
        new THREE.MeshMatcapMaterial({
            color: 0x441c84,
            specular: 0x222222,
            shininess: 8,
            shading: THREE.FlatShading
        }),
    );
    floor.rotation.y = Math.PI / 9;
    scene.add(floor);

    let roof = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 12, 3, 12, 1),
        new THREE.MeshPhongMaterial({
            color: 0x441c84,
            specular: 0x222222,
            shininess: 8,
            shading: THREE.FlatShading
        })
    );
    roof.position.y = 9.1;
    roof.rotation.y = Math.PI / 9;
    scene.add(roof);

    let roof2 = new THREE.Mesh(
        new THREE.CylinderGeometry(12, 12, 0.3, 12, 1),
        new THREE.MeshPhongMaterial({
            color: 0x441c84,
            specular: 0x222222,
            shininess: 8,
            shading: THREE.FlatShading
        })
    );
    roof2.position.y = 7.5;
    roof2.rotation.y = Math.PI / 9;
    scene.add(roof2);

    let earthTexture = new THREE.TextureLoader().load('./resources/earth.jpg');
    let earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
    
    let earth = new THREE.Mesh(
        new THREE.SphereGeometry(3.7, 32, 32),
        earthMaterial
    );
    earth.position.y = 3.8;
    scene.add(earth);

    let poles = [];
    let pivots = [];
    for (let i = 0; i < 13; i++) {
        let pole = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.2, 7.5, 12, 1),
            new THREE.MeshPhongMaterial({
                color: 0x7c5426,
                specular: 0x222222,
                shininess: 8,
                shading: THREE.FlatShading
            })
        );

        let angle = i * Math.PI / 6.5;
        let radius = 11.4;

        let posX = Math.cos(angle) * radius;
        let posY = 3.9
        let posZ = Math.sin(angle) * radius;

        pole.position.set(posX, posY, posZ);
        scene.add(pole);
        poles.push(pole);

        let pivot = new THREE.Group();
        pivot.add(pole);
        scene.add(pivot);
        pivots.push(pivot);
    }

    let loader = new THREE.GLTFLoader();
    let horsesMeshes = []; // Array to store horse meshes

    for (let i = 0; i < 12; i++) {
        loader.load('https://threejs.org/examples/models/gltf/Horse.glb', (gltf) => {
            gltf.scene.scale.multiplyScalar(0.02);

            // Set position and rotation of the horse relative to its pillar
            gltf.scene.position.copy(poles[i].position);
            gltf.scene.position.y = 0.5;
            gltf.scene.rotation.y = -3.25 - (Math.PI * i / 6.5);

            // Parent the horse to the pivot point of its pillar
            pivots[i].add(gltf.scene);

            horsesMeshes.push(gltf.scene);
        });
    }

    objects = {
        pivots,
        horses: horsesMeshes,
        structure: [floor, roof, roof2, earth]
    }
}

function updateForFrame() {
    // Rotate the whole scene or other elements if needed
    for (const category in objects) {
        if (category !== 'horses') { // Skip horses for now
            for (const element of objects[category]) {
                element.rotation.y += 0.01;
            }
        }
    }

    // Specific animation for horses, if needed
    objects.horses.forEach((horse, index) => {
        // Example: Make horses bob up and down
        horse.position.y = Math.sin(frameNumber * 0.05 + index * 0.3) * 0.2 + 0.5;
    });
}

function installOrbitControls() {
    controls = new THREE.OrbitControls(camera, canvas);
    controls.noPan = true;
    controls.noZoom = true;
    controls.staticMoving = true;

    function move() {
        controls.update();
        if (!animating) {
            render();
        }
    }

    function down() {
        document.addEventListener("mousemove", move, false);
    }

    function up() {
        document.removeEventListener("mousemove", move, false);
    }

    function touch(event) {
        if (event.touches.length == 1) {
            move();
        }
    }

    canvas.addEventListener("mousedown", down, false);
    canvas.addEventListener("touchmove", touch, false);
}

function doAnimateCheckbox() {
    var run = document.getElementById("animateCheckbox").checked;
    if (run != animating) {
        animating = run;
        if (animating) {
            requestAnimationFrame(doFrame);
        }
    }
}

function doFrame() {
    if (animating) {
        frameNumber++;
        updateForFrame();
        render();
        requestAnimationFrame(doFrame);
    }
}

function init() {
    try {
        canvas = document.getElementById("glcanvas");
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: false
        });
    } catch (e) {
        document.getElementById("message").innerHTML = "<b>Sorry, an error occurred:<br>" +
            e + "</b>";
        return;
    }
    document.getElementById("animateCheckbox").checked = false;
    document.getElementById("animateCheckbox").onchange = doAnimateCheckbox;
    createWorld();
    installOrbitControls();
    render();
}
