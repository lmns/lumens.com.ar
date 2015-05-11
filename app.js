'use strict';

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
	75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

var geometry = new THREE.RingGeometry(0.0, window.innerWidth, 170, 170);

var material = new THREE.MeshBasicMaterial(
	{
		side: THREE.DoubleSide,
		wireframe: true
	}
);

var ring = new THREE.Mesh(geometry, material);
scene.add(ring);

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

var r = upDown(1, 0.001, 0.1, 1);
var g = upDown(0, 0.001, 0.1, 1);
var b = upDown(0.5, 0.001, 0.1, 1);

function render() {
	requestAnimationFrame(render);
	ring.rotation.z += 0.001;
	ring.rotation.x -= 0.0002;
	ring.material.color.setRGB(r.next().value, g.next().value, b.next().value);
	renderer.render(scene, camera);
}

render(scene, camera, renderer);

document.body.addEventListener('click', function () {
	if (screenfull.enabled) {
		screenfull.request();
		document.body.style.cursor = 'none';
	}
});

function resizeHandler () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

var fsEvents = "resize fullscreenchange webkitfullscreenchange mozfullscreenchange";
fsEvents.split(" ").forEach(function (e) {
	window.addEventListener(e, resizeHandler, false);
});
