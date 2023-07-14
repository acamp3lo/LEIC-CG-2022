import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MyPrism } from "./MyPrism.js";

export class MyStationModel extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initTextures();
        this.initMaterials();
        this.initElements();
    }

    initTextures() {
        this.windowTexture = new CGFtexture(this.scene, 'images/station_window.jpg');
        this.doorTexture = new CGFtexture(this.scene, 'images/station_door.jpg');
        this.wallTexture = new CGFtexture(this.scene, 'images/station_wall.jpg');
        this.baseTexture = new CGFtexture(this.scene, 'images/station_base.jpg');
        this.roofTexture = new CGFtexture(this.scene, 'images/station_roof.jpg');
    }

    initMaterials() {
        // Station Base Material
        this.baseMaterial = new CGFappearance(this.scene);
        this.baseMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.baseMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.baseMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.baseMaterial.setShininess(2.0);
        // Station Building Material
        this.buildingMaterial = new CGFappearance(this.scene);
        this.buildingMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.buildingMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.buildingMaterial.setSpecular(0.3, 0.3, 0.3, 1);
        this.buildingMaterial.setShininess(100.0);
        // Station Window Material
        this.windowMaterial = new CGFappearance(this.scene);
        this.windowMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.windowMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.windowMaterial.setSpecular(1, 1, 1, 1);
        this.windowMaterial.setShininess(10.0);
        // Station Door Material
        this.doorMaterial = new CGFappearance(this.scene);
        this.doorMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.doorMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.doorMaterial.setSpecular(0, 0, 0, 0);
        this.doorMaterial.setShininess(10.0);
        // Station Roof Material
        this.roofMaterial = new CGFappearance(this.scene);
        this.roofMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.roofMaterial.setSpecular(0.3, 0.3, 0.3, 1);
        this.roofMaterial.setShininess(10.0);
    }

    initElements() {
        this.base = new MyUnitCubeQuad(this.scene, this.baseTexture);
        this.mainBuilding = new MyUnitCubeQuad(this.scene, this.wallTexture);
        this.sideBuilding = new MyUnitCubeQuad(this.scene, this.wallTexture);
        this.window = new MyUnitCubeQuad(this.scene, this.wallTexture, this.windowTexture, this.wallTexture, this.windowTexture, this.wallTexture, this.wallTexture);
        this.door = new MyUnitCubeQuad(this.scene, this.wallTexture, this.doorTexture, this.wallTexture, this.wallTexture, this.wallTexture);
        this.roof = new MyPrism(this.scene, this.roofTexture, this.roofTexture, this.wallTexture, this.wallTexture);
    }

    display() {
        // Display Base
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.scale(18, 2, 8);
        this.baseMaterial.apply();
        this.base.display();
        this.scene.popMatrix();
        // Display Main Building
        this.scene.pushMatrix();
        this.scene.translate(0, 5, -1);
        this.scene.scale(6, 6, 4);
        this.buildingMaterial.apply();
        this.mainBuilding.display();
        this.scene.popMatrix();
        // Display Left Side Building
        this.scene.pushMatrix();
        this.scene.translate(-5, 3.5, -1);
        this.scene.scale(4, 3, 4);
        this.buildingMaterial.apply();
        this.sideBuilding.display();
        this.scene.popMatrix();
        // Display Right Side Building
        this.scene.pushMatrix();
        this.scene.translate(5, 3.5, -1);
        this.scene.scale(4, 3, 4);
        this.buildingMaterial.apply();
        this.sideBuilding.display();
        this.scene.popMatrix();
        // Display Front Left Window
        this.scene.pushMatrix();
        this.scene.translate(-1.5, 6.5, 1.05);
        this.scene.scale(0.8, 1, 0.1);
        this.windowMaterial.apply();
        this.window.display();
        this.scene.popMatrix();
        // Display Front Right Window
        this.scene.pushMatrix();
        this.scene.translate(1.5, 6.5, 1.05);
        this.scene.scale(0.8, 1, 0.1);
        this.windowMaterial.apply();
        this.window.display();
        this.scene.popMatrix();
        // Display Back Left Window
        this.scene.pushMatrix();
        this.scene.translate(-1.5, 6.5, -3.05);
        this.scene.scale(0.8, 1, 0.1);
        this.windowMaterial.apply();
        this.window.display();
        this.scene.popMatrix();
        // Display Back Right Window
        this.scene.pushMatrix();
        this.scene.translate(1.5, 6.5, -3.05);
        this.scene.scale(0.8, 1, 0.1);
        this.windowMaterial.apply();
        this.window.display();
        this.scene.popMatrix();
        // Display Middle Door
        this.scene.pushMatrix();
        this.scene.translate(0, 2.8, 1.05);
        this.scene.scale(1, 1.6, 0.1);
        this.doorMaterial.apply();
        this.door.display();
        this.scene.popMatrix();
        // Display Left Door
        this.scene.pushMatrix();
        this.scene.translate(-5, 2.8, 1.05);
        this.scene.scale(1, 1.6, 0.1);
        this.doorMaterial.apply();
        this.door.display();
        this.scene.popMatrix();
        // Display Right Door
        this.scene.pushMatrix();
        this.scene.translate(5, 2.8, 1.05);
        this.scene.scale(1, 1.6, 0.1);
        this.doorMaterial.apply();
        this.door.display();
        this.scene.popMatrix();
        // Display Middle Roof
        this.scene.pushMatrix();
        this.scene.translate(0, 8, -1);
        this.scene.scale(6, 2, 4);
        this.roofMaterial.apply();
        this.roof.display();
        this.scene.popMatrix();
        // Display Left Roof
        this.scene.pushMatrix();
        this.scene.translate(-5, 5, -1);
        this.scene.scale(4, 2, 4);
        this.roofMaterial.apply();
        this.roof.display();
        this.scene.popMatrix();
        // Display Right Roof
        this.scene.pushMatrix();
        this.scene.translate(5, 5, -1);
        this.scene.scale(4, 2, 4);
        this.roofMaterial.apply();
        this.roof.display();
        this.scene.popMatrix();
    }
}
