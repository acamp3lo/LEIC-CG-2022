import { CGFobject } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";

export class MyTrackSegment extends CGFobject {
    constructor(scene, p1, p2) {
        super(scene);
        this.p1 = p1;
        this.p2 = p2;
        this.distance = Math.sqrt( ((this.p2.x - this.p1.x)*(this.p2.x - this.p1.x)) + ((this.p2.z - this.p1.z)*(this.p2.z - this.p1.z)) );
        this.angle = -(Math.atan2((this.p2.z - this.p1.z), (this.p2.x - this.p1.x)) * 180 / Math.PI);
        this.segment = new MyPlane(scene, 1, 0, this.distance, 0, 0);
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate( (this.p1.x + this.p2.x) / 2 , 0, (this.p1.z + this.p2.z) / 2 );

        this.scene.rotate((this.angle*(Math.PI/180)), 0, 1, 0);

        this.scene.scale(this.distance, 1, 4);

        this.scene.rotate((-90*(Math.PI/180)), 1, 0, 0);

        this.segment.display();

        this.scene.popMatrix();
    }
}