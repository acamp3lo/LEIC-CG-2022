import { CGFobject } from "../lib/CGF.js";
import { MyTrainModel } from "./MyTrainModel.js";

export class MyAnimatedTrain extends CGFobject {
    constructor(scene, trackPointsList) {
        super(scene);
        this.trackPointsList = trackPointsList;
        this.speed = 0.2;
        this.currentTrackPointIndex = 0;
        this.position = [trackPointsList[this.currentTrackPointIndex].x, 0, trackPointsList[this.currentTrackPointIndex].z];
        this.orientation = this.getOrientation();
        this.isBraking = false;
        this.brakingTime;       // Time when brakes are aplied
        this.brakingDistance;   // Distance to station when brakes are aplied
        this.brakingSpeed;      // Speed when brakes are aplied
        this.maxSpeed = 0.2;
        this.initObjects();
    }

    initObjects() {
        this.train = new MyTrainModel(this.scene);
    }

    getOrientation() {
        let currentPoint = this.trackPointsList[this.currentTrackPointIndex];
        let nextPoint;
        if((this.currentTrackPointIndex + 1) >= this.trackPointsList.length) {
            nextPoint = this.trackPointsList[0];
        } else {
            nextPoint = this.trackPointsList[this.currentTrackPointIndex + 1];
        }
        if( nextPoint.z < currentPoint.z ) {
            return ( (Math.atan( (nextPoint.x - currentPoint.x) / (nextPoint.z - currentPoint.z)) + Math.PI ) )
        } else {
            return ( Math.atan( (nextPoint.x - currentPoint.x) / (nextPoint.z - currentPoint.z) ) );
        }
    }

    update(t) {
        let nextPoint;
        if((this.currentTrackPointIndex + 1) >= this.trackPointsList.length) {
            nextPoint = this.trackPointsList[0];
        } else {
            nextPoint = this.trackPointsList[this.currentTrackPointIndex + 1];
        }
        let distanceToNextPoint = Math.sqrt( ( (nextPoint.x - this.position[0]) * (nextPoint.x - this.position[0]) ) + ( (nextPoint.z - this.position[2]) * (nextPoint.z - this.position[2]) ) );

        // console.log("trainLocation: (" + this.position[0] + ", " + this.position[2] + ")");
        // console.log("destination: (" + nextPoint.x + ", " + nextPoint.z + ")");
        // console.log("distanceToNextPoint: " + distanceToNextPoint);
        // console.log("speed: " + this.speed);
        //console.log("orientation: " + (this.orientation*(180/Math.PI)));

        if(nextPoint.type === "station") {
            if(distanceToNextPoint < 10) {
                // Stop the train!
                if(!this.isBraking) {
                    this.brakingTime = t;
                    this.brakingDistance = distanceToNextPoint;
                    this.brakingSpeed = this.speed;
                    this.isBraking = true;
                } else {
                    //console.log("BRAKING!");
                    //let dTime = t - this.brakingTime;
                    //this.speed = dTime * ((Math.sqrt(this.brakingSpeed) / (2 * this.brakingDistance)) - (2 * this.brakingDistance) + (this.speed / dTime));
                    //this.speed = (this.brakingDistance - distanceToNextPoint) / (t - this.brakingTime);
                }
            }
            if(this.speed <= 0) {
                //this.position = [trackPointsList[currentTrackPointIndex].x, 0, trackPointsList[currentTrackPointIndex].z];
                this.currentTrackPointIndex++;
                this.getOrientation();
                this.isBraking = false;
            }
        } else {
            // Get to cruising speed!
        }

        if(distanceToNextPoint < 0.2) {
            this.position = [nextPoint.x, 0, nextPoint.z];
            if(nextPoint == this.trackPointsList[0]) {
                this.currentTrackPointIndex = 0;
            } else {
                this.currentTrackPointIndex++;
            }
            this.orientation = this.getOrientation();
        }

        let directionVector = [ Math.sin(this.orientation), 0, Math.cos(this.orientation) ];
        this.position[0] += directionVector[0] * this.speed;
        this.position[2] += directionVector[2] * this.speed;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate((this.orientation), 0, 1, 0);
        this.train.display();
        this.scene.popMatrix();
    }
}