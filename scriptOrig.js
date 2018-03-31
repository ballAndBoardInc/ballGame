console.log('main.js is linked up')

import * as BABYLON from 'babylonjs';

window.addEventListener('DOMContentLoaded', function() {

   //CAVANSSES
   // Get the canvas DOM element
   var canvas = document.getElementById('renderCanvas');

   //ENGINES
   // Load the 3D engine
   var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

   //SCENES
   // CreateScene function that creates and return the scene
   var createScene = function createScene() {

      //SCENE
      // Create a basic BJS Scene object
      var scene = new BABYLON.Scene(engine);

      //CAMERA
      // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
      var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -40), scene);

      // Target the camera to scene origin
      camera.setTarget(BABYLON.Vector3.Zero());

      // Attach the camera to the canvas
      camera.attachControl(canvas, false);


      //COLLISIONS
      // scene.collisionsEnabled = true;
      // camera.checkCollisions = true;

      //LIGHTS
      // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
      var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

      //OBJECTS 



      //SPHERES
      var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 0.3, scene, false, BABYLON.Mesh.FRONTSIDE);

      // GROUNDS
      // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
      var ground = BABYLON.Mesh.CreateGround('ground1', 15, 15, 5, scene, false);

      // OBJECT POSITIONS
      sphere.position.y = 1;
      testBox.position.y = 5;

      // PHYSICS
      scene.enablePhysics();

      // PHYSICS IMPOSTERS
      sphere.physicsImpostor = new BABYLON.physicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 1, restitution: 0.9}, scene);
      ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

      // RETURN THE SCENE
      return scene;
   };


   // CALLED SCENES
   var scene = createScene();

   // THE RENDER LOOP
   engine.runRenderLoop(function () {
      scene.render();
   });

   // CANVAS EVENT HANDLER FOR BROWSER RESIZE
   window.addEventListener('resize', function () {
      engine.resize();
   });
});
