import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, texTopo, texFrente, texDireita, texTras, texEsquerda, texFundo) {
        super(scene);
        this.quad = new MyQuad(scene);
        this.texTopo = texTopo;
        this.texFrente = texFrente;
        this.texDireita = texDireita;
        this.texTras = texTras;
        this.texEsquerda = texEsquerda;
        this.texFundo = texFundo;
    }

    updateBuffers() {}

    enableNormalViz() {
        this.quad.enableNormalViz();
    }

    disableNormalViz() {
        this.quad.disableNormalViz();
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(0, -0.5, 0);
        this.scene.rotate((90*(Math.PI/180)), 1, 0, 0);
        if(this.texFundo != undefined) {
            this.texFundo.bind();
        }
        this.quad.display();   //quadB

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-(90*(Math.PI/180)), 1, 0, 0);
        if(this.texTopo != undefined) {
            this.texTopo.bind();
        }
        this.quad.display();   //quadC

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.5);
        if(this.texFrente != undefined) {
            this.texFrente.bind();
        }
        this.quad.display();   //quadF

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, -0.5);
        this.scene.rotate((180*(Math.PI/180)), 0, 1, 0);
        if(this.texTras != undefined) {
            this.texTras.bind();
        }
        this.quad.display();   //quadT

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-(90*(Math.PI/180)), 0, 1, 0);
        if(this.texEsquerda != undefined) {
            this.texEsquerda.bind();
        }
        this.quad.display();   //quadE

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.5, 0, 0);
        this.scene.rotate((90*(Math.PI/180)), 0, 1, 0);
        if(this.texDireita != undefined) {
            this.texDireita.bind();
        }
        this.quad.display();   //quadD

        this.scene.popMatrix();
    }
}