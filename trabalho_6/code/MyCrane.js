/**
 * MyCrane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCrane extends CGFobject {
	constructor(scene) {
        super(scene);
        this.base = new MyCylinder(scene, 20, 20, true);
        this.arm = new MyCraneArm(scene);
        let deg2rad = Math.PI / 180.0;
        this.arm1angle = 20*deg2rad;
        this.angle1 = 0 * deg2rad;
        this.arm2angle = -30 * deg2rad;
        this.angle2 = 0 * deg2rad;
	};

	

	display() {

        let deg2rad = Math.PI / 180.0;

        //Base
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(90*deg2rad, 1, 0, 0);
        this.base.display();
        this.scene.popMatrix();

        //Everything execept the base will be rotated angle1 + arm1angle degrees
        this.scene.pushMatrix();
        this.scene.rotate((this.angle1+this.arm1angle) * deg2rad, 1, 0, 0);

        //Arm
        this.scene.pushMatrix();
        this.scene.rotate(-90*deg2rad, 1, 0, 0);
       
        this.arm.display();
        this.scene.popMatrix();

        //Articulation
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(90*deg2rad, 0, 1, 0);
        this.scene.translate(0, 10, -0.5);
        this.base.display();
        this.scene.popMatrix();

         //Arm
         this.scene.pushMatrix();
         this.scene.translate(0, 5, 0);
         this.scene.rotate(this.arm2angle, 1, 0, 0);
         this.scene.rotate(this.angle2, 1, 0, 0);
         this.arm.display();
         this.scene.popMatrix();

         //end of rotation angle1 + arm1angle degrees
         this.scene.popMatrix();
    }
    
    setArm1Angle(angle){
        let deg2rad = Math.PI / 180.0;
        this.angle1 = angle * deg2rad;
    }

    setArm2Angle(angle){
        let deg2rad = Math.PI / 180.0;
        this.angle1 = angle * deg2rad;
    }
};
