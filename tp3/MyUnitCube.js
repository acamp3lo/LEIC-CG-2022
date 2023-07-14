import {CGFobject} from '../lib/CGF.js';

export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	updateBuffers() {
        
    }
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0.5,	//0 <-
			0.5, -0.5, 0.5,	    //1
			0.5, -0.5, -0.5,    //2
			-0.5, -0.5, -0.5,	//3
            -0.5, 0.5, 0.5,     //4
            0.5, 0.5, 0.5,      //5
            0.5, 0.5, -0.5,     //6
            -0.5, 0.5, -0.5,    //7
			-0.5, -0.5, 0.5,	//8 <-
			0.5, -0.5, 0.5,	    //9
			0.5, -0.5, -0.5,    //10
			-0.5, -0.5, -0.5,	//11
            -0.5, 0.5, 0.5,     //12
            0.5, 0.5, 0.5,      //13
            0.5, 0.5, -0.5,     //14
            -0.5, 0.5, -0.5,    //15
			-0.5, -0.5, 0.5,	//16 <-
			0.5, -0.5, 0.5,	    //17
			0.5, -0.5, -0.5,    //18
			-0.5, -0.5, -0.5,	//19
            -0.5, 0.5, 0.5,     //20
            0.5, 0.5, 0.5,      //21
            0.5, 0.5, -0.5,     //22
            -0.5, 0.5, -0.5     //23
		];

		this.normals = [
			0, -1, 0,    //0
			0, -1, 0,    //1
			0, -1, 0,    //2
			0, -1, 0,    //3
			0, 1, 0,     //4
			0, 1, 0,     //5
			0, 1, 0,     //6
			0, 1, 0,     //7
			-1, 0, 0,    //8
			1, 0, 0,     //9
			1, 0, 0,     //10
			-1, 0, 0,    //11
			-1, 0, 0,    //12
			1, 0, 0,     //13
			1, 0, 0,     //14
			-1, 0, 0,    //15
			0, 0, 1,     //16
			0, 0, 1,     //17
			0, 0, -1,    //18
			0, 0, -1,    //19
			0, 0, 1,     //20
			0, 0, 1,     //21
			0, 0, -1,    //22
			0, 0, -1,    //23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 0,     //face de baixo T1
			0, 3, 2,     //face de baixo T2
            4, 5, 6,     //face de cima T1
            6, 7, 4,     //face de cima T2
            11, 8, 12,   //face da esquerda T1
            11, 12, 15,  //face da esquerda T2
            9, 10, 13,   //face da direita T1
            10, 14, 13,  //face da direita T2
			16, 17, 20,  //face da frente T1
            17, 21, 20,  //face da frente T2
            22, 18, 19,  //face de trás T1
            22, 19, 23   //face de trás T2
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

