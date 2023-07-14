import {CGFobject} from '../lib/CGF.js';

export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0.5,	//0
			0.5, -0.5, 0.5,	    //1
			0.5, -0.5, -0.5,    //2
			-0.5, -0.5, -0.5,	//3
            -0.5, 0.5, 0.5,     //4
            0.5, 0.5, 0.5,      //5
            0.5, 0.5, -0.5,     //6
            -0.5, 0.5, -0.5     //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,  //face de baixo T1
			2, 3, 0,  //face de baixo T2
            4, 5, 6,  //face de cima T1
            6, 7, 4,  //face de cima T2
            3, 0, 4,  //face da esquerda T1
            3, 4, 7,  //face da esquerda T2
            0, 1, 4,  //face da frente T1
            1, 5, 4,  //face da frente T2
            1, 2, 5,  //face da direita T1
            2, 6, 5,  //face da direita T2
            6, 2, 3,  //face de trás T1
            6, 3, 7,  //face de trás T2
            3, 1, 0,  //face de baixo T1
            3, 2, 1   //face de baixo T2
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

