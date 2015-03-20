'use strict'

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
	75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

var geometry = new THREE.RingGeometry(0.01, window.innerWidth, 64, 64);

var material = new THREE.MeshBasicMaterial(
	{
		side: THREE.DoubleSide,
		wireframe: true
	}
);

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

document.body.appendChild(renderer.domElement);

function* upDown(start, step, min, max) {
	var i = start;
	while (true) {
		while (i < max) {
			yield i += step;
		}
		while (i > min) {
			yield i -= step;
		}
	}
}

var r = upDown(1, 0.005, 0.5, 1);
var g = upDown(0, 0.007, 0.5, 1);
var b = upDown(0.5, 0.011, 0.5, 1);

function render() {
	requestAnimationFrame(render);
	cube.rotation.z += 0.005;
	cube.material.color.setRGB(r.next().value, g.next().value, b.next().value);
	renderer.render(scene, camera);
}

render(scene, camera, renderer);
