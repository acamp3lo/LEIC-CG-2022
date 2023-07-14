import { CGFobject } from '../lib/CGF.js';

export class MyCircle extends CGFobject {
	constructor(scene, n) {
		super(scene);
        this.n = n;
        this.deltaAngle = (2 * Math.PI) / n;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
		this.normals = [];
		this.texCoords = [];

        this.vertices.push(0, 0, 0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0.5);

        let angle = 0;

        for(let i=0; i<this.n; i++) {
            let x = Math.cos(angle);
            let z = -Math.sin(angle);

            this.vertices.push(x, 0, z);

            if( i !== this.n - 1 ) {
                this.indices.push( 0, i+1, (i+2) % (this.n + 1) );
            } else {
                this.indices.push(i+1, 1, 0);
            }
            this.normals.push(0, 1, 0);

            this.texCoords.push((x+1)/2, (z+1)/2);

            angle += this.deltaAngle;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
}