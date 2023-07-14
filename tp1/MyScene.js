import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";   //TP1 ex1
import { MyParallelogram } from "./MyParallelogram.js";   //TP1 ex1.3
import { MyTriangleSmall } from "./MyTriangleSmall.js";   //TP1 ex2
import { MyTriangleBig } from "./MyTriangleBig.js";   //TP1 ex2

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);   //TP1 ex1
    this.parallelogram = new MyParallelogram(this);  //TP1 ex1.3
    this.small_triangle = new MyTriangleSmall(this); //TP1 ex2
    this.big_triangle = new MyTriangleBig(this); //TP1 ex2

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displayDiamond = true;        //TP1 ex1.2
    this.displayTriangle = true;       //TP1 ex1.2
    this.displayParallelogram = true;  //TP1 ex1.4
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    // Draw Shapes
    if(this.displayDiamond) this.diamond.display();              //Draw MyDiamond TP1 ex1.2
    if(this.displayTriangle) this.triangle.display();            //Draw MyTriangle TP1 ex1.2
    if(this.displayParallelogram) this.parallelogram.display();  //Draw MyParallelogram TP1 ex 1.4

    // ---- BEGIN Primitive drawing section

    //this.diamond.display();
    //this.triangle.display();   //TP1 ex1

    this.small_triangle.display();  //TP1 ex2
    this.big_triangle.display();    //TP1 ex2

    // ---- END Primitive drawing section
  }
}
