console.log('main.js is linked up')

import * as BABYLON from 'babylonjs';

window.addEventListener('DOMContentLoaded', function () {

   //CAVANSSES
   // Get the canvas DOM element
   var canvas = document.getElementById('renderCanvas');

   //ENGINES
   // Load the 3D engine
   var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
   
   
   //CREATE SCENE
   var createScene = function () {

      //SCENE
      // This creates a basic Babylon Scene object (non-mesh)
      var scene = new BABYLON.Scene(engine);

      //CAMERA
      // This creates and positions a free camera (non-mesh)
      var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 60, 0), scene);

      // This targets the camera to scene origin
      camera.setTarget(BABYLON.Vector3.Zero());

      // This attaches the camera to the canvas
      camera.attachControl(canvas, false);

      //LIGHTS
      // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
      var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

      // Default intensity is 1. Let's dim the light a small amount
      light.intensity = 0.7;

      //OBJECTS
      // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
      var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

      // //OBJECT OPTIONS
      var boxOptions = {
         height: 1,
         width: 1,
         depth: 0.5
      };

      //BOXES
      var testBox = BABYLON.MeshBuilder.CreateBox("testBox", boxOptions, scene);

      // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
      var ground = BABYLON.Mesh.CreateGround("ground1", 15, 15, 2, scene);

      // Move the sphere upward 1/2 its height
      sphere.position.y = 5;
      testBox.position.y = 2;
      testBox.position.x = 1;

      //PHYSICS
      scene.enablePhysics();

      //PHYSICS IMPOSTERS
      sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);

      testBox.physicsImpostor = new BABYLON.PhysicsImpostor(testBox, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);

      ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

      //INTERVAL AND SHAPE GENERATOR

      let i = 1;
      let acceleration = 1000;
      

      function interval(acceleration) {
         const interval = setInterval(newShape, acceleration);
      }

      function newShape() {
         i = i + 1;
         acceleration = acceleration + 100;
         console.log(i, acceleration);
         var newSphere = BABYLON.Mesh.CreateSphere("sphere1", 16, getRandom(0.5, 2), scene);
         newSphere.position.y = getRandom(10, 15);
         newSphere.position.x = getRandom(-5, 5);
         newSphere.position.z = getRandom(-5, 5);
         newSphere.physicsImpostor = new BABYLON.PhysicsImpostor(newSphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
      };
      interval(acceleration);

      // RETURN THE SCENE
      return scene;
   };

   // CALLED SCENES
   var scene = createScene();

   //GET RANDOM NUMBER FUNCTION
   function getRandom(min, max) {
      return Math.random() * (max - min) + min;
   };

   // THE RENDER LOOP
   engine.runRenderLoop(function () {
      // interval();
      // newShape();
      scene.render();
   });

   // CANVAS EVENT HANDLER FOR BROWSER RESIZE
   window.addEventListener('resize', function () {
      engine.resize();
   });
});
