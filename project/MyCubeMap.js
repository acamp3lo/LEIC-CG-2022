import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(scene);
        this.initTextures();
        this.initMaterials();
    }

    updateBuffers() {}

    enableNormalViz() {
        this.quad.enableNormalViz();
    }

    disableNormalViz() {
        this.quad.disableNormalViz();
    }

    initTextures() {
        this.texTopo;
        this.texFrente;
        this.texDireita;
        this.texTras;
        this.texEsquerda;
        this.texFundo;
    }

    updateTextures(textureList) {
        if( textureList.length === 6 ) {
            this.texTopo = textureList[0];
            this.texTras = textureList[1];
            this.texDireita = textureList[2];
            this.texFrente = textureList[3];
            this.texEsquerda = textureList[4];
            this.texFundo = textureList[5];
        }
    }

    initMaterials() {
        this.cubeMapMaterial = new CGFappearance(this.scene);
        this.cubeMapMaterial = new CGFappearance(this.scene);
        // this.cubeMapMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        // this.cubeMapMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        // this.cubeMapMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeMapMaterial.setShininess(1000);
    }

    display() {
        this.cubeMapMaterial.apply();

        this.scene.pushMatrix();

        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(-(90*(Math.PI/180)), 1, 0, 0);
        if(this.texFundo != undefined) {
            this.texFundo.bind();
        }
        this.quad.display();   //quadB

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0.5, 0);
        this.scene.rotate((90*(Math.PI/180)), 1, 0, 0);
        if(this.texTopo != undefined) {
            this.texTopo.bind();
        }
        this.quad.display();   //quadC

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.5);
        this.scene.rotate((180*(Math.PI/180)), 0, 1, 0);
        if(this.texFrente != undefined) {
            this.texFrente.bind();
        }
        this.quad.display();   //quadF

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, -0.5);
        if(this.texTras != undefined) {
            this.texTras.bind();
        }
        this.quad.display();   //quadT

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate((90*(Math.PI/180)), 0, 1, 0);
        if(this.texEsquerda != undefined) {
            this.texEsquerda.bind();
        }
        this.quad.display();   //quadE

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-(90*(Math.PI/180)), 0, 1, 0);
        if(this.texDireita != undefined) {
            this.texDireita.bind();
        }
        this.quad.display();   //quadD

        this.scene.popMatrix();
    }
}