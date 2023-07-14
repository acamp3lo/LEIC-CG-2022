import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyCircle } from "./MyCircle.js";
import { MySphere } from "./MySphere.js";

export class MyTrainModel extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initTextures();
        this.initElements();
        this.initMaterials();
    }

    initMaterials() {
        // Train Base Material
        this.baseMaterial = new CGFappearance(this.scene);
        this.baseMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.baseMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.baseMaterial.setSpecular(1, 1, 1, 0.8);
        this.baseMaterial.setShininess(10.0);

        // Train Cabine Material
        this.cabineMaterial = new CGFappearance(this.scene);
        this.cabineMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.cabineMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cabineMaterial.setSpecular(0, 0, 0, 0);
        this.cabineMaterial.setShininess(10.0);

        // Train Boiler Material
        this.boilerMaterial = new CGFappearance(this.scene);
        this.boilerMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.boilerMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.boilerMaterial.setSpecular(1, 1, 1, 0.8);
        this.boilerMaterial.setShininess(10.0);
        this.boilerMaterial.loadTexture('images/train_boiler.jpg');

        // Train Boiler End Material
        this.boilerEndMaterial = new CGFappearance(this.scene);
        this.boilerEndMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.boilerEndMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.boilerEndMaterial.setSpecular(1, 1, 1, 0.8);
        this.boilerEndMaterial.setShininess(10.0);
        this.boilerEndMaterial.loadTexture('images/train_boilerEnd.jpg');

        // Train Chimney Material
        this.chimneyMaterial = new CGFappearance(this.scene);
        this.chimneyMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.chimneyMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.chimneyMaterial.setSpecular(1, 1, 1, 0.8);
        this.chimneyMaterial.setShininess(10.0);
        this.chimneyMaterial.loadTexture('images/train_chimney.jpg');

        // Train Wheel Rim Material
        this.wheelRimMaterial = new CGFappearance(this.scene);
        this.wheelRimMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.wheelRimMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.wheelRimMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.wheelRimMaterial.setShininess(10.0);
        this.wheelRimMaterial.loadTexture('images/train_wheelRim.png');

        // Train Wheel Hub Material
        this.wheelHubMaterial = new CGFappearance(this.scene);
        this.wheelHubMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.wheelHubMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.wheelHubMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.wheelHubMaterial.setShininess(10.0);
        this.wheelHubMaterial.loadTexture('images/train_wheelHub.jpg');
    }

    initTextures() {
        this.baseTexture = new CGFtexture(this.scene, 'images/train_base.jpg');
        this.cabineTexture = new CGFtexture(this.scene, 'images/train_cabine.jpg');
        this.cabineDoorTexture = new CGFtexture(this.scene, 'images/train_cabineDoor.jpg');
    }

    initElements() {
        this.base = new MyUnitCubeQuad(this.scene, this.baseTexture, this.baseTexture, this.baseTexture, this.baseTexture, this.baseTexture, this.baseTexture);
        this.cabine = new MyUnitCubeQuad(this.scene, this.cabineTexture, this.cabineTexture, this.cabineTexture, this.cabineDoorTexture, this.cabineTexture, undefined);
        this.boiler = new MyCylinder(this.scene, 3.5, 24);
        this.boilerEnd = new MySphere(this.scene, 24, 24);
        this.chimney = new MyCylinder(this.scene, 1.3, 14);
        this.wheelRim = new MyCylinder(this.scene, 0.2, 24);
        this.wheelHub = new MyCircle(this.scene, 24);
        this.cargoBoxWall = new MyUnitCubeQuad(this.scene, this.baseTexture, this.baseTexture, this.baseTexture, this.baseTexture, this.baseTexture, this.baseTexture);
    }

    wheelDisplay(x, z) {
        this.scene.pushMatrix();
        this.scene.translate(x, 0.75, z);
        this.scene.rotate(-(90*(Math.PI/180)), 0, 0, 1);
        this.scene.scale(0.8, 0.8, 0.8);
        this.wheelRimMaterial.apply();
        this.wheelRim.display();  
        this.scene.translate(0, 0.2, 0);
        this.wheelHubMaterial.apply();
        this.wheelHub.display();
        this.scene.rotate((180*(Math.PI/180)), 1, 0, 0);
        this.scene.translate(0, 0.2, 0);
        this.wheelHub.display();
        this.scene.popMatrix();
    }

    display() {
        // Display Base
        this.scene.pushMatrix();
        this.scene.translate(0, 1.5, 0);
        this.scene.scale(2.5, 1, 7.5);
        this.baseMaterial.apply();
        this.base.display();
        this.scene.popMatrix();
        
        // Display Cabine
        this.scene.pushMatrix();
        this.scene.translate(0, 3.25, -0.9);
        this.scene.scale(2, 2.5, 1.8);
        this.cabineMaterial.apply();
        this.cabine.display();
        this.scene.popMatrix();

        // Display Boiler
        this.scene.pushMatrix();
        this.scene.translate(0, 2.8, 3.5);
        this.scene.rotate(-(90*(Math.PI/180)), 1, 0, 0);
        this.scene.scale(0.9, 1, 0.9);
        this.boilerMaterial.apply();
        this.boiler.display();
        this.scene.popMatrix();
        //Display Boiler End
        this.scene.pushMatrix();
        this.scene.translate(0, 2.8, 3.5);
        this.scene.scale(0.9, 0.9, 0.5);
        this.boilerEndMaterial.apply();
        this.boilerEnd.display();
        this.scene.popMatrix();

        // Display Chimney
        this.scene.pushMatrix();
        this.scene.translate(0, 3.5, 2.5);
        this.scene.scale(0.25, 1, 0.25);
        this.chimneyMaterial.apply();
        this.chimney.display();
        this.scene.popMatrix();

        // Display Wheels
        this.wheelDisplay(-1.4, -2);    // Right back
        this.wheelDisplay(-1.4, 2);    // Right front
        this.wheelDisplay(1.25, -2);    // Left back
        this.wheelDisplay(1.25, 2);    // Left front

        // Display Left Cargo Box Wall
        this.scene.pushMatrix();
        this.scene.translate(-1.15, 2.5, -3.2);
        this.scene.rotate(-(90*(Math.PI/180)), 0, 1, 0);
        this.scene.scale(1, 1, 0.1);
        this.baseMaterial.apply();
        this.cargoBoxWall.display();
        this.scene.popMatrix();
        // Display Right Cargo Box Wall
        this.scene.pushMatrix();
        this.scene.translate(1.15, 2.5, -3.2);
        this.scene.rotate(-(90*(Math.PI/180)), 0, 1, 0);
        this.scene.scale(1, 1, 0.1);
        this.baseMaterial.apply();
        this.cargoBoxWall.display();
        this.scene.popMatrix();
        // Display Back Cargo Box Wall
        this.scene.pushMatrix();
        this.scene.translate(0, 2.5, -3.65);
        this.scene.scale(2.25, 1, 0.1);
        this.baseMaterial.apply();
        this.cargoBoxWall.display();
        this.scene.popMatrix();
        // Display Front Cargo Box Wall
        this.scene.pushMatrix();
        this.scene.translate(0, 2.5, -2.75);
        this.scene.scale(2.25, 1, 0.1);
        this.baseMaterial.apply();
        this.cargoBoxWall.display();
        this.scene.popMatrix();
    }
}