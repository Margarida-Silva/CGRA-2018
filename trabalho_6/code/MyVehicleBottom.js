class MyVehicleBottom extends CGFobject {

    /**
 	* MyVehicleBottom
	* @param gl {WebGLRenderingContext}
 	* @constructor
 	*/
    constructor(scene) {
    super(scene);
    this.plate = new MyWheelPlate(scene);
    this.plane = new Plane(scene, 0, 1, 0, 1, 4);
    }

    /**
     * Displays the vehicle's bottom
     */
    display(){

        let deg2rad=Math.PI/180.0;

         //right front
         this.scene.pushMatrix();
         this.scene.scale(0.22, 1, 1);
         this.scene.translate(10.65, 0.9, 2.4);
         this.plane.display();
         this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.4, 2.4);
        this.plate.display();
        this.scene.popMatrix();

        //left front
        this.scene.pushMatrix();
        this.scene.rotate(-180*deg2rad,0,1,0);
        this.scene.scale(0.22, 1, 1);
        this.scene.translate(-10.7, 0.9,0);
        this.plane.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.rotate(-180*deg2rad,0,1,0);
        this.scene.translate(-2.25, 0.4, 0);
        this.plate.display();
        this.scene.popMatrix();


        //right back
        this.scene.pushMatrix();
         this.scene.scale(0.22, 1, 1);
         this.scene.translate(-11, 0.9, 2.4);
         this.plane.display();
         this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2.35, 0.4, 2.4);
        this.plate.display();
        this.scene.popMatrix();

        //left back
        this.scene.pushMatrix();
        this.scene.rotate(-180*deg2rad,0,1,0);
        this.scene.scale(0.22, 1, 1);
        this.scene.translate(11, 0.9,0);
        this.plane.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.rotate(-180*deg2rad,0,1,0);
        this.scene.translate(0.6, 0.4, 0);
        this.plate.display();
        this.scene.popMatrix();


        //intermediate right
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 1);
        this.scene.scale(1.11, 1, 1);
        this.scene.translate(-0.044, 0.9, 2.4);
        this.plane.display();
        this.scene.popMatrix();

        //intermediate left
        this.scene.pushMatrix();
        this.scene.rotate(-180*deg2rad, 0, 1, 0);
        this.scene.scale(1.11, 1, 1);
        this.scene.translate(0.045, 0.9, 0);
        this.plane.display();
        this.scene.popMatrix();

    }
}