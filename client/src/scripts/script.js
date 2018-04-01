console.log('main.js is linked up')

import * as BABYLON from 'babylonjs';
// import * as GUI from 'babylonjs-gui';

// var ctx = document.querySelector("canvas").getContext("2d");

// window.addEventListener("keydown", function (e) {
//   e.preventDefault();
//   ctx.fillText(e.keyCode, Math.random() * 300, Math.random() * 150);
// });

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
    var camera = new BABYLON.UniversalCamera("camera1", new BABYLON.Vector3(10, 5, 80), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);

    //LIGHTS
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    //GLOW FOR EMMISSIVE LIGHTS
    var gl = new BABYLON.GlowLayer("glow", scene);

    //OBJECTS

    // PLAYER SPHERE Params: name, subdivs, size, scene
    var playerMesh = BABYLON.Mesh.CreateSphere("playerSphere", 16, 1.5, scene);
    var playerMaterial = new BABYLON.StandardMaterial("playerMaterial", scene);
    playerMaterial.diffuseColor = new BABYLON.Color3(255, 255, 255);
    playerMaterial.emissiveColor = new BABYLON.Color3(255, 255, 255);
    playerMaterial.wireframe = true;
    playerMesh.material = playerMaterial;

    // PLAYER IMPOSTER
    playerMesh.physicsImpostor = new BABYLON.PhysicsImpostor(playerMesh, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 2, restitution: 0.5 }, scene);

    //PLAYER CONTROLS
    // CONTROLS

    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        {
          trigger: BABYLON.ActionManager.OnKeyDownTrigger,
          parameter: 'a'
        },
        function () { 
          console.log('a pressed'); 
          playerMesh.applyImpulse(new BABYLON.Vector3(10, 0, 0), playerMesh.getAbsolutePosition());
        }
      )
    );

    scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        {
          trigger: BABYLON.ActionManager.OnKeyDownTrigger,
          parameter: 'w'
        },
        function () { 
          console.log('w pressed'); 
          playerMesh.applyImpulse(new BABYLON.Vector3(0, 0, -10), playerMesh.getAbsolutePosition());
        }
      )
    );
    scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        {
          trigger: BABYLON.ActionManager.OnKeyDownTrigger,
          parameter: 'd'
        },
        function () { 
          console.log('d pressed'); 
          playerMesh.applyImpulse(new BABYLON.Vector3(-10, 0, 0), playerMesh.getAbsolutePosition());
        }
      )
    );
    scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        {
          trigger: BABYLON.ActionManager.OnKeyDownTrigger,
          parameter: 's'
        },
        function () { 
          console.log('s pressed'); 
          playerMesh.applyImpulse(new BABYLON.Vector3(0, 0, 10), playerMesh.getAbsolutePosition());
        }
      )
    );


    //PLANES

    //ANGLED PLANE
    var angledPlane = BABYLON.MeshBuilder.CreatePlane("angledPlane", { width: 15, height: 45, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    var angledPlaneMaterial = new BABYLON.StandardMaterial("playerMaterial", scene);
    angledPlaneMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    angledPlane.material = angledPlaneMaterial;

    //ANGLED PLANE IMPOSTER
    angledPlane.physicsImpostor = new BABYLON.PhysicsImpostor(angledPlane, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

    //FLAT PLANE
    var flatPlane = BABYLON.MeshBuilder.CreatePlane("flatPlane", { width: 15, height: 15, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    var flatPlaneMaterial = new BABYLON.StandardMaterial("playerMaterial", scene);
    flatPlaneMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    flatPlane.material = flatPlaneMaterial;

    //FLAT PLANE IMPOSTER
    flatPlane.physicsImpostor = new BABYLON.PhysicsImpostor(flatPlane, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

    //POSITION AND ROTATE
    playerMesh.position.z = 26;
    playerMesh.position.y = -14;

    angledPlane.position.z = 10;
    angledPlane.rotate(BABYLON.Axis.X, Math.PI / 1.3, BABYLON.Space.WORLD);

    flatPlane.position.z = 30;
    flatPlane.position.y = -15;
    flatPlane.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);

    //INTERVAL AND SHAPE GENERATOR
    // This function is used to accelerate the rate of shapes dropping to increase the difficulty.
    let increment = 1;
    let intervalTime = 1000;

    function interval() {
      let interval = setTimeout(newShape, intervalTime);
      increment++;
      if (intervalTime > 50) {
        intervalTime -= 10;
      }

      //SETTING GAMEOVER CIRCUMSTANCES
      if (playerMesh.position.y < -30) {
        gameOver = true;
      }

    };
    interval();

    //GUI
    // var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // var rect1 = new BABYLON.GUI.Rectangle();
    // rect1.width = 0.2;
    // rect1.height = "40px";
    // rect1.cornerRadius = 20;
    // rect1.color = "Orange";
    // rect1.thickness = 4;
    // rect1.background = "green";
    // advancedTexture.addControl(rect1);   


    //SHAPE DESTRUCTOR
    // To allow the simulation to run indefinitely, let's track how many entities are in-play, and kill anything that falls into the abyss
    const MAX_ENTITIES = 400;
    const DIE_AT_Y = -25;
    let entityCount = 0;
    let entities = [];
    function addEntity (entity, imposter) {
      if (entity && imposter) {
        entities.push([entity, imposter]);
        entityCount++;
      }
    }
    function pruneEntities() {
      let entity, imposter;
      for (let i=0; i < entities.length; i++) {
        [entity, imposter] = entities[i]; // Array destructuring!
        if (entity.position.y < DIE_AT_Y) {
          entity.dispose();
          imposter.dispose();
          entities.splice(i, 1); // Delete the entity from our entity list.
          entityCount--;
        }
      }
    }

    //NEW SHAPES FUNCTION
    // Based on the time interval, this creates randomly sized/coloured shapes.
    function newShape() {
      console.log("newshape called");
      if (entityCount < MAX_ENTITIES) {
        if (increment % 2 === 0) {
          var newSphere = BABYLON.Mesh.CreateSphere("genSphere", 16, getRandom(0.5, 3), scene);

          var newSphereMaterial = new BABYLON.StandardMaterial("playerMaterial", scene);
          newSphereMaterial.diffuseColor = new BABYLON.Color3(getRandom(0.5, 6), getRandom(0.5, 6), getRandom(0.5, 3));
          newSphere.material = newSphereMaterial;
          newSphere.position.y = getRandom(15, 35);
          newSphere.position.x = getRandom(-5, 5);
          newSphere.position.z = getRandom(-5, 5);
          newSphere.physicsImpostor = new BABYLON.PhysicsImpostor(newSphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: getRandom(10, 20), restitution: getRandom(0.4, 0.6) }, scene);
          addEntity(newSphere, newSphere.physicsImpostor);
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
          addEntity(newBox, newBox.physicsImpostor);
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
          addEntity(newSphere, newSphere.physicsImpostor);
        }
      }
      pruneEntities();
      console.log(entityCount);        
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
