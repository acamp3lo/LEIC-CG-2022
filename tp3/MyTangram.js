import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.small_triangle = new MyTriangleSmall(scene);
        this.big_triangle = new MyTriangleBig(scene);
        this.initMaterials();
    }

    updateBuffers() {}

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.small_triangle.enableNormalViz();
        this.big_triangle.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.small_triangle.disableNormalViz();
        this.big_triangle.disableNormalViz();
    }

    initMaterials() {
        // Orange Material
        this.orangeMaterial = new CGFappearance(this.scene);
        this.orangeMaterial.setAmbient(0.5, 0.25, 0, 1.0);
        this.orangeMaterial.setDiffuse(1, 0.5, 0, 1.0);
        this.orangeMaterial.setSpecular(0.7, 0.7, 0.7, 1.0);
        this.orangeMaterial.setShininess(10.0);

        // Blue Material
        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setAmbient(0.1, 0.1, 0.5, 1.0);
        this.blueMaterial.setDiffuse(0.3, 0.3, 1, 1.0);
        this.blueMaterial.setSpecular(0.7, 0.7, 0.7, 1.0);
        this.blueMaterial.setShininess(10.0);

        // Purple Material
        this.purpleMaterial = new CGFappearance(this.scene);
        this.purpleMaterial.setAmbient(0.2, 0, 0.2, 1.0);
        this.purpleMaterial.setDiffuse(0.5, 0, 0.5, 1.0);
        this.purpleMaterial.setSpecular(0.7, 0.7, 0.7, 1.0);
        this.purpleMaterial.setShininess(10.0);

        // Pink Material
        this.pinkMaterial = new CGFappearance(this.scene);
        this.pinkMaterial.setAmbient(0.5, 0.31, 0.35, 1.0);
        this.pinkMaterial.setDiffuse(1, 0.63, 0.7, 1.0);
        this.pinkMaterial.setSpecular(0.6, 0.5, 0.5, 1.0);
        this.pinkMaterial.setShininess(10.0);

        // Yellow Material
        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setAmbient(0.5, 0.5, 0, 1.0);
        this.yellowMaterial.setDiffuse(1, 1, 0, 1.0);
        this.yellowMaterial.setSpecular(0.7, 0.7, 0.7, 1.0);
        this.yellowMaterial.setShininess(10.0);

        // Red Material
        this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setAmbient(0.5, 0, 0, 1.0);
        this.redMaterial.setDiffuse(1, 0, 0, 1.0);
        this.redMaterial.setSpecular(0.7, 0.7, 0.7, 1.0);
        this.redMaterial.setShininess(10.0);
    }

    display() {

        this.orangeMaterial.apply();

        this.scene.pushMatrix();

        this.scene.translate(0, 2, 0);
        this.scene.rotate((90*(Math.PI/180)), 0, 0, 1);
        this.big_triangle.display();

        this.blueMaterial.apply();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-(2-Math.sqrt(8)/2), 2-Math.sqrt(8)/2, 0);
        this.scene.rotate((135*(Math.PI/180)), 0, 0, 1);
        this.big_triangle.display();

        this.purpleMaterial.apply();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(Math.sqrt(2)/2, 2-Math.sqrt(2)/2, 0);
        this.scene.rotate((45*(Math.PI/180)), 0, 0, 1);
        this.small_triangle.display();

        this.pinkMaterial.apply();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        let offset = 3-Math.sqrt(8);

        this.scene.translate(-offset, -2 + offset, 0);
        this.scene.rotate((180*(Math.PI/180)), 0, 0, 1);
        this.triangle.display();

        this.yellowMaterial.apply();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-(2 + offset), -2 + offset, 0);
        this.scene.rotate((180*(Math.PI/180)), 1, 0, 0);  // indices alterados no ficheiro MyParallelogram para a face do paralelogramo ficar coerente com o resto da figura
        this.parallelogram.display();

        this.redMaterial.apply();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-2 - offset, -3 + offset, 0);
        this.small_triangle.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();


        var D1_tranlation1 = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        1, 0, 0, 1
        ];

        var D1_tranlation2 = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 3.5, 0, 1
        ];

        let ang = 22.5 * (Math.PI/180);

        var D1_rotation = [
        Math.cos(ang), Math.sin(ang), 0, 0,
        -Math.sin(ang), Math.cos(ang), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
        ];

        this.scene.multMatrix(D1_tranlation2);  //terceira transformação   ^
        this.scene.multMatrix(D1_rotation);     //segunda transformação    |
        this.scene.multMatrix(D1_tranlation1);  //primeira transformação   |

        this.scene.customMaterial.apply();

        this.diamond.display();

        this.scene.popMatrix();
    }


}