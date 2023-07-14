import {CGFobject} from '../lib/CGF.js';

export class MyTriangleSmallPurple extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -1, 0, 0,   //0
            1, 0, 0,    //1
            0, 1, 0     //2
        ]

        this.normals = [];

		for(var i = 0; i < this.vertices.length/3; i++) {
			this.normals.push(0, 0, 1);
		}

        this.indices = [
            0, 1, 2
        ]

        this.texCoords = [
			0, 0,
			0, 0.5,
			0.25, 0.25
		]

        this.primitiveType = this.scene.gl.TRIANGLES;

	    this.initGLBuffers();
    }
}