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

      //GLOBAL GAME OVER
      let gameOver = false;

      //SCENE
      // This creates a basic Babylon Scene object (non-mesh)
      var scene = new BABYLON.Scene(engine);

      //PHYSICS
      scene.enablePhysics();

      //CAMERA
      // This creates and positions a free camera (non-mesh)
      var camera = new BABYLON.UniversalCamera("camera1", new BABYLON.Vector3(10, 0, 55), scene);

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

      // PLAYER SPHERE Params: name, subdivs, size, scene
      var playerMesh = BABYLON.Mesh.CreateSphere("playerSphere", 16, 1.5, scene);
      var playerMaterial = new BABYLON.StandardMaterial("playerMaterial", scene);
      playerMaterial.diffuseColor = new BABYLON.Color3(255, 255, 255);
      playerMaterial.wireframe = true;
      playerMesh.material = playerMaterial;

      // PLAYER IMPOSTER
      playerMesh.physicsImpostor = new BABYLON.PhysicsImpostor(playerMesh, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 5, restitution: 0.9 }, scene);

      //PLAYER CONTROLS
      // CONTROLS
      const LEFT = 65; // A
      const RIGHT = 68; // D
      const UP = 87; // W
      const DOWN = 83; // S
      

      playerMesh.applyImpulse(new BABYLON.Vector3(50, 10, 0), playerMesh.getAbsolutePosition());

      //PLANE
      var gamePlane = BABYLON.MeshBuilder.CreatePlane("gamePlane", { width: 15, height: 45, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
      var gamePlaneMaterial = new BABYLON.StandardMaterial("playerMaterial", scene);
      gamePlaneMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      gamePlane.material = gamePlaneMaterial;

      //GAME PLANE IMPOSTER
      gamePlane.physicsImpostor = new BABYLON.PhysicsImpostor(gamePlane, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

      //POSITION AND ROTATE
      playerMesh.position.z = 15;
      gamePlane.position.z = 10;
      gamePlane.rotate(BABYLON.Axis.X, Math.PI / 1.6, BABYLON.Space.WORLD);


      //INTERVAL AND SHAPE GENERATOR
      // This function is used to accelerate the rate of shapes dropping to increase the difficulty.
      let increment = 1;
      let intervalTime = 1000;
      
      function interval() {
         let interval = setTimeout(newShape, intervalTime);
         increment ++;
         if (intervalTime > 50) {
            intervalTime -= 10;
         }

         //SETTING GAMEOVER CIRCUMSTANCES
         // if (playerMesh.position.y < -15) {
         //    gameOver = true;
         // }

         // function deleteMesh(meshName) {
         //    if (meshName.position.y < 0) {
         //       meshName.dispose();
         //    }
         // }
         
      };
      interval();


      //NEW SHAPES FUNCTION
      // Based on the time interval, this creates randomly sized/coloured shapes.
      function newShape() {
         if (increment % 2 === 0) {
            var newSphere = BABYLON.Mesh.CreateSphere("genSphere", 16, getRandom(0.5, 3), scene);

            var newSphereMaterial = new BABYLON.StandardMaterial("playerMaterial", scene);
            newSphereMaterial.diffuseColor = new BABYLON.Color3(getRandom(0.5, 6), getRandom(0.5, 6), getRandom(0.5, 3));
            newSphere.material = newSphereMaterial;
            newSphere.position.y = getRandom(15, 35);
            newSphere.position.x = getRandom(-5, 5);
            newSphere.position.z = getRandom(-5, 5);
            newSphere.physicsImpostor = new BABYLON.PhysicsImpostor(newSphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: getRandom(10, 20), restitution: getRandom(0.4, 0.6) }, scene);
         }

         if (increment % 2 === 1) {
            var newBox = BABYLON.MeshBuilder.CreateBox("genBox", { height: getRandom(0.5, 3), width: getRandom(0.5, 3), depth: getRandom(0.5, 3) }, scene);

            var newBoxMaterial = new BABYLON.StandardMaterial("playerMaterial", scene);
            newBoxMaterial.diffuseColor = new BABYLON.Color3(getRandom(0.5, 6), getRandom(0.5, 6), getRandom(0.5, 3));
            newBox.material = newBoxMaterial;
            
            newBox.rotate(BABYLON.Axis.X, Math.PI / getRandom(1, 4), BABYLON.Space.WORLD);
            newBox.rotate(BABYLON.Axis.Y, Math.PI / getRandom(1, 4), BABYLON.Space.WORLD);
            newBox.position.y = getRandom(15, 35);
            newBox.position.x = getRandom(-5, 5);
            newBox.position.z = getRandom(-5, 5);
            newBox.physicsImpostor = new BABYLON.PhysicsImpostor(newBox, BABYLON.PhysicsImpostor.BoxImpostor, { mass: getRandom(10, 20), restitution: getRandom(0.4, 0.6) }, scene);
         }

         if (increment % 3 === 0) {
            var newSphere = BABYLON.Mesh.CreateSphere("genSphere", 16, getRandom(0.5, 3), scene);

            var newSphereMaterial = new BABYLON.StandardMaterial("playerMaterial", scene);
            newSphereMaterial.diffuseColor = new BABYLON.Color3(getRandom(0.5, 6), getRandom(0.5, 6), getRandom(0.5, 3));
            newSphere.material = newSphereMaterial;
            newSphere.position.y = getRandom(15, 35);
            newSphere.position.x = getRandom(-5, 5);
            newSphere.position.z = getRandom(-5, 5);
            newSphere.physicsImpostor = new BABYLON.PhysicsImpostor(newSphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: getRandom(10, 20), restitution: getRandom(0.4, 0.6) }, scene);
         }
         
         if (gameOver === false) {
            interval();
         }
      };

      // RETURN THE SCENE
      return scene;
   };

   //GET RANDOM NUMBER GENERIC FUNCTION
   function getRandom(min, max) {
      return Math.random() * (max - min) + min;
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
