import {CGFobject} from '../lib/CGF.js';

export class MyParallelogram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0,    //0
            2, 0, 0,    //1
            3, 1, 0,    //2
            1, 1, 0     //3
        ];

        this.normals = [];

		for(var i = 0; i < this.vertices.length/3; i++) {
			this.normals.push(0, 0, -1);
		}

        this.indices = [
            0, 3, 1,
            1, 3, 2
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

	    this.initGLBuffers();
    }
}

