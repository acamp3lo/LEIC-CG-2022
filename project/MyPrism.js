import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";
import { MyTriangle } from "./MyTriangle.js"

export class MyPrism extends CGFobject {
    constructor(scene, texFrente, texTras, texEsquerda, texDireita, texFundo) {
        super(scene);
        this.quad = new MyQuad(scene);
        this.triangle = new MyTriangle(scene);
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

        this.scene.rotate((90*(Math.PI/180)), 1, 0, 0);
        if(this.texFundo != undefined) {
            this.texFundo.bind();
        }
        this.quad.display();   //quadB

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0.25, 0.25);
        this.scene.rotate((-45*(Math.PI/180)), 1, 0, 0);
        this.scene.scale(1, 1/(2*Math.sin(45*(Math.PI/180))), 1);
        if(this.texFrente != undefined) {
            this.texFrente.bind();
        }
        this.quad.display();   //quadF

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0.25, -0.25);
        this.scene.rotate((-135*(Math.PI/180)), 1, 0, 0);
        this.scene.scale(1, 1/(2*Math.sin(45*(Math.PI/180))), 1);
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
        this.triangle.display();   //trianguloE

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.5, 0, 0);
        this.scene.rotate((90*(Math.PI/180)), 0, 1, 0);
        if(this.texDireita != undefined) {
            this.texDireita.bind();
        }
        this.triangle.display();   //trianguloD

        this.scene.popMatrix();
    }
}