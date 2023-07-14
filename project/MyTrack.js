import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyTrackSegment } from "./MyTrackSegment.js";
import { MyStationModel } from "./MyStationModel.js";

export class MyTrack extends CGFobject {
    constructor(scene, trackPointsList) {
        super(scene);
        this.pointsList = trackPointsList;
        this.segmentArray = [];
        this.station = new MyStationModel(this.scene);
        this.initMaterials();
        this.initSegments();
    }

    initMaterials() {
        this.trackMaterial = new CGFappearance(this.scene);
        this.trackMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.trackMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.trackMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.trackMaterial.setShininess(10.0);
        this.trackMaterial.loadTexture('images/tracks.png');
    }

    initSegments() {
        for( let i = 0; i < this.pointsList.length; i++ ) {
            this.segmentArray[i] = new MyTrackSegment(this.scene, this.pointsList[i], this.pointsList[ (i+1) % this.pointsList.length ]);
        }
    }
    
    display() {
        let stationAngle;
        let auxAngle;
        let xOffset;
        let zOffset;
        
        for(let i = 0; i < this.segmentArray.length; i++) {
            this.trackMaterial.apply();
            this.segmentArray[i].display();

            if(this.pointsList[i].type == "station") {
                stationAngle = -(Math.atan2((this.pointsList[i+1].z - this.pointsList[i].z), (this.pointsList[i+1].x - this.pointsList[i].x)) * 180 / Math.PI);
                auxAngle = 90 - (180 - stationAngle);
                xOffset = 7 * Math.cos(auxAngle);
                zOffset = 7 * Math.sin(auxAngle);
                if(this.pointsList[i+1].x <= this.pointsList[i].x) {
                    xOffset = -( xOffset - (Math.cos(auxAngle)/2) );
                    zOffset = -( zOffset - (Math.sin(auxAngle)/2) );
                }

                this.scene.pushMatrix();
                this.scene.translate( this.pointsList[i].x + xOffset, 0, this.pointsList[i].z + zOffset );
                this.scene.rotate((stationAngle * (Math.PI/180)), 0, 1, 0);
                this.station.display();
                this.scene.popMatrix();
            }
        }
    }
}