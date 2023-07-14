import { CGFscene } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyUnitCubeQuad extends CGFscene {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(scene);
        this.scene = scene;
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(0, -0.5, 0);
        this.scene.rotate((90*(Math.PI/180)), 1, 0, 0);
        this.quad.display();   //quadB

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-(90*(Math.PI/180)), 1, 0, 0);
        this.quad.display();   //quadC

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.5);
        this.quad.display();   //quadF

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, -0.5);
        this.scene.rotate((180*(Math.PI/180)), 0, 1, 0);
        this.quad.display();   //quadT

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-(90*(Math.PI/180)), 0, 1, 0);
        this.quad.display();   //quadE

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.5, 0, 0);
        this.scene.rotate((90*(Math.PI/180)), 0, 1, 0);
        this.quad.display();   //quadD

        this.scene.popMatrix();
    }
}