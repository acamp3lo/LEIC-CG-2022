import { CGFinterface, dat } from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI( {width: 380} );

        var obj = this;

        var f0 = this.gui.addFolder('Elementary Objects');
        // Checkboxes for displaying elementary Objects
        f0.add(this.scene, 'displayAxis').name('Display Axis');
        f0.add(this.scene, 'displayMyCircle').name('Display MyCircle');
        f0.add(this.scene, 'displayMyCylinder').name('Display MyCylinder');
        f0.add(this.scene, 'displayMySphere').name('Display MySphere');
        f0.add(this.scene, 'displayMyPrism').name('Display MyPrism');

        var f1 = this.gui.addFolder('Main Objects');
        // Checkboxes for displaying main Objects
        f1.add(this.scene, 'displayMyTrack').name('Display MyTrack');
        f1.add(this.scene, 'displayMyTrainModel').name('Display MyTrainModel');
        f1.add(this.scene, 'displayMyStationModel').name('Display MyStationModel');
        f1.add(this.scene, 'displayMyAnimatedTrain').name('Display MyAnimatedTrain');
        f1.add(this.scene, 'displayMyPlane').name('Display Terrain');
        f1.add(this.scene, 'displayMyCubeMap').name('Display MyCubeMap');
        // MyCubeMap textures dropdown
        f1.add(this.scene, 'selectedCubeMapTexture', this.scene.cubeMaptextureIds).name('CubeMap Texture').onChange(this.scene.updateCubeMapTexture.bind(this.scene));
        
        this.initKeys();

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this;

        // disable the processKeyboard function
        this.processKeyboard = function () { };

        // create a named array to store which keys are being pressed
        this.activeKeys = {};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

}