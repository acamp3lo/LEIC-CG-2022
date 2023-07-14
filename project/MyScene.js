import { CGFscene, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { CGFcamera2 } from "./CGFcamera2.js";
import { MyPlane } from "./MyPlane.js";
import { MyPoint } from "./MyPoint.js";
import { MyTrack } from "./MyTrack.js";
import { MyCircle } from "./MyCircle.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyTrainModel } from "./MyTrainModel.js";
import { MySphere } from "./MySphere.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyAnimatedTrain } from "./MyAnimatedTrain.js";
import { MyStationModel } from "./MyStationModel.js";
import { MyPrism } from "./MyPrism.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize development scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 200, 0,1,0,1);
        this.circle = new MyCircle(this, 8);
        this.cylinder = new MyCylinder(this, 3, 8);
        this.sphere = new MySphere(this, 20, 20);
        this.prism = new MyPrism(this);

        //Objects connected to MyInterface
        this.displayAxis = false;
        this.displayMyPlane = true;
        this.displayMyTrack = true;
        this.displayMyCircle = false;
        this.displayMyCylinder = false;
        this.displayMySphere = false;
        this.displayMyPrism = false;
        this.displayMyTrainModel = false;
        this.displayMyStationModel = false;
        this.displayMyCubeMap = true;
        this.displayMyAnimatedTrain = true;
        
        this.selectedCubeMapTexture = -1;

        this.demoCubeMapTextures = [
            new CGFtexture(this, 'images/demo_cubemap/top.png'),
            new CGFtexture(this, 'images/demo_cubemap/front.png'),
            new CGFtexture(this, 'images/demo_cubemap/right.png'),
            new CGFtexture(this, 'images/demo_cubemap/back.png'),
            new CGFtexture(this, 'images/demo_cubemap/left.png'),
            new CGFtexture(this, 'images/demo_cubemap/bottom.png')
        ];
        this.testCubeMapTextures = [
            new CGFtexture(this, 'images/test_cubemap/py.png'),
            new CGFtexture(this, 'images/test_cubemap/pz.png'),
            new CGFtexture(this, 'images/test_cubemap/px.png'),
            new CGFtexture(this, 'images/test_cubemap/nz.png'),
            new CGFtexture(this, 'images/test_cubemap/nx.png'),
            new CGFtexture(this, 'images/test_cubemap/ny.png')
        ];
        this.desertCubeMapTextures = [
            new CGFtexture(this, 'images/desert_cubemap/top.png'),
            new CGFtexture(this, 'images/desert_cubemap/front.png'),
            new CGFtexture(this, 'images/desert_cubemap/right.png'),
            new CGFtexture(this, 'images/desert_cubemap/back.png'),
            new CGFtexture(this, 'images/desert_cubemap/left.png'),
            new CGFtexture(this, 'images/desert_cubemap/bottom.png')
        ];
        this.sanfranciscoCubeMapTextures = [
            new CGFtexture(this, 'images/sanfrancisco_cubemap/top.jpg'),
            new CGFtexture(this, 'images/sanfrancisco_cubemap/front.jpg'),
            new CGFtexture(this, 'images/sanfrancisco_cubemap/right.jpg'),
            new CGFtexture(this, 'images/sanfrancisco_cubemap/back.jpg'),
            new CGFtexture(this, 'images/sanfrancisco_cubemap/left.jpg'),
            new CGFtexture(this, 'images/sanfrancisco_cubemap/bottom.jpg')
        ];

        this.cubeMaptextures = [ this.demoCubeMapTextures, this.testCubeMapTextures, this.desertCubeMapTextures, this.sanfranciscoCubeMapTextures ];

        this.cubeMaptextureIds = { 'Demo CubeMap': 0, 'Test CubeMap': 1, 'Desert CubeMap': 2, 'San Francisco CubeMap': 3 };

        this.trackPointsList = [
            new MyPoint(8, 0, "simple"),
            new MyPoint(0, 14, "station"),
            new MyPoint(-8, 28, "simple"),
            new MyPoint(-20, 32, "simple"),
            new MyPoint(-28, 28, "simple"),
            new MyPoint(-32, 8, "simple"),
            new MyPoint(-32, -8, "simple"),
            new MyPoint(-24, -20, "simple"),
            new MyPoint(0, -20, "station"),
            new MyPoint(24, -20, "simple"),
            new MyPoint(40, -10, "simple"),
            new MyPoint(50, 4, "simple"),
            new MyPoint(48, 18, "simple"),
            new MyPoint(38, 20, "simple"),
            new MyPoint(24, 6, "simple"),
            new MyPoint(16, 0, "simple")
        ];
        // Initialize MyTrack
        this.track = new MyTrack(this, this.trackPointsList);
        // Initialize MyTrainModel
        this.train = new MyTrainModel(this);
        // Initialize MyCubeMap
        this.cubeMap = new MyCubeMap(this);
        // Initialize MyTrainAnimated
        this.animatedTrain = new MyAnimatedTrain(this, this.trackPointsList);
        // Initialize MyStationModel
        this.station = new MyStationModel(this);
    }

    initMaterials() {
        this.mySphereMaterial = new CGFappearance(this);
        this.mySphereMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.mySphereMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mySphereMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.mySphereMaterial.setShininess(10.0);
        this.mySphereMaterial.loadTexture('images/earth.jpg');

        this.myPlaneGrassMaterial = new CGFappearance(this);
        this.myPlaneGrassMaterial.setAmbient(0.5, 0.5, 0.5, 1);
        this.myPlaneGrassMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.myPlaneGrassMaterial.setSpecular(0.3, 0.3, 0.3, 0.3);
        this.myPlaneGrassMaterial.setShininess(10.0);
        this.myPlaneGrassMaterial.loadTexture('images/terrain_grass.jpg');
        
        this.myPlaneSandMaterial = new CGFappearance(this);
        this.myPlaneSandMaterial.setAmbient(0.3, 0.3, 0.3, 1);
        this.myPlaneSandMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.myPlaneSandMaterial.setSpecular(0.7, 0.7, 0.7, 0.5);
        this.myPlaneSandMaterial.setShininess(10.0);
        this.myPlaneSandMaterial.loadTexture('images/terrain_sand.jpg');
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setPosition(2.0, 2.0, -1.0, 1.0);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setSpecular(1.0, 1.0, 0.0, 1.0);
        this.lights[1].enable();
        this.lights[1].update();
    }

    initCameras() {
        this.camera = new CGFcamera2(0.4, 0.1, 500, vec3.fromValues(-50,50,70), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    updateCubeMapTexture() {
        this.cubeMap.updateTextures(this.cubeMaptextures[this.selectedCubeMapTexture]);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        if(this.displayMyAnimatedTrain) {
            this.animatedTrain.update(t);
        }
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis) {
            this.axis.display();
        }

        this.setDefaultAppearance();

        // MyPlane drawing
        this.pushMatrix();
        this.translate(0, -0.05, 0);
        this.scale(300,1,300);
        this.rotate(-Math.PI*0.5, 1,0,0);
        if(this.displayMyPlane) {
            if(this.selectedCubeMapTexture == 2) {
                this.myPlaneSandMaterial.apply();
            } else {
                this.myPlaneGrassMaterial.apply();
            }
            this.plane.display();
        }
        this.popMatrix();

        // MyCircle drawing
        if(this.displayMyCircle) {
            this.circle.display();
        }
        // MyCylinder drawing
        if(this.displayMyCylinder) {
            this.cylinder.display();
        }
        // MySphere drawing
        if(this.displayMySphere) {
            this.mySphereMaterial.apply();
            this.sphere.display();
        }
        // MyPrism drawing
        if(this.displayMyPrism) {
            this.prism.display();
        }
        // MyTrack drawing
        if(this.displayMyTrack) {
            this.track.display();
        }
        // MyTrainModel drawing
        if(this.displayMyTrainModel) {
            this.train.display();
        }
        // MyCubeMap drawing
        if(this.displayMyCubeMap) {
            this.pushMatrix();
            this.translate( this.camera.position[0], this.camera.position[1] + (24.9 - this.camera.position[1]), this.camera.position[2] );
            this.scale(300, 50, 300);
            this.cubeMap.display();
            this.popMatrix();
        }
        // MyAnimatedTrain drawing
        if(this.displayMyAnimatedTrain) {
            this.animatedTrain.display();
        }
        // MyStationModel drawing
        if(this.displayMyStationModel) {
            this.station.display();
        }
    }
}