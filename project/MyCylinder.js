import { CGFobject } from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, h, n) {
        super(scene);
        this.h = h;
        this.n = n;
        this.deltaAngle = (2 * Math.PI) / n;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let y = 0; y <= this.h; y+=this.h) {
            let angle = 0;
            for (let i = 0; i <= this.n; i++) {
                this.vertices.push(Math.cos(angle), y, -Math.sin(angle));
                this.normals.push(Math.cos(angle), Math.cos(Math.PI / 4.0), -Math.sin(angle));

                angle += this.deltaAngle;

                if (y === 0) {
                    if( i !== this.n ) {
                        this.indices.push( i + 1, (this.n + (i + 2)), i );
                    }
                    this.texCoords.push(i/this.n, 0);
                } else {
                    if(i !== this.n) {
                        this.indices.push( i, (this.n + (i + 2)), (this.n + (i + 1)) );
                    }
                    this.texCoords.push(i/this.n, 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}