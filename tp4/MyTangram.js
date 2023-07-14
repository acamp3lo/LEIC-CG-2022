import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmallRed } from "./MyTriangleSmallRed.js";
import { MyTriangleSmallPurple } from "./MyTriangleSmallPurple.js";
import { MyTriangleBigBlue } from "./MyTriangleBigBlue.js";
import { MyTriangleBigOrange } from "./MyTriangleBigOrange.js";

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.small_red_triangle = new MyTriangleSmallRed(scene);
        this.small_purple_triangle = new MyTriangleSmallPurple(scene);
        this.big_blue_triangle = new MyTriangleBigBlue(scene);
        this.big_orange_triangle = new MyTriangleBigOrange(scene);
        this.initMaterials();
    }

    updateBuffers() {}

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.small_red_triangle.enableNormalViz();
        this.small_purple_triangle.enableNormalViz();
        this.big_blue_triangle.enableNormalViz();
        this.big_orange_triangle.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.small_red_triangle.disableNormalViz();
        this.small_purple_triangle.disableNormalViz();
        this.big_blue_triangle.disableNormalViz();
        this.big_orange_triangle.disableNormalViz();
    }

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/tangram.png');
    }

    display() {
        this.scene.pushMatrix();

        this.material.apply();

        this.scene.translate(0, 2, 0);
        this.scene.rotate((90*(Math.PI/180)), 0, 0, 1);
        this.big_orange_triangle.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-(2-Math.sqrt(8)/2), 2-Math.sqrt(8)/2, 0);
        this.scene.rotate((135*(Math.PI/180)), 0, 0, 1);
        this.big_blue_triangle.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(Math.sqrt(2)/2, 2-Math.sqrt(2)/2, 0);
        this.scene.rotate((45*(Math.PI/180)), 0, 0, 1);
        this.small_purple_triangle.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        let offset = 3-Math.sqrt(8);

        this.scene.translate(-offset, -2 + offset, 0);
        this.scene.rotate((180*(Math.PI/180)), 0, 0, 1);
        this.triangle.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-(2 + offset), -2 + offset, 0);
        this.scene.rotate((180*(Math.PI/180)), 1, 0, 0);  // indices alterados no ficheiro MyParallelogram para a face do paralelogramo ficar coerente com o resto da figura
        this.parallelogram.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-2 - offset, -3 + offset, 0);
        this.small_red_triangle.display();

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

        this.diamond.display();

        this.scene.popMatrix();
    }
}