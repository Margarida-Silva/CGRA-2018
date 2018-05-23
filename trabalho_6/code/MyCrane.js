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
        this.magnet = new MyMagnet(scene);

        let deg2rad = Math.PI / 180.0;
        this.arm1angle = 20*deg2rad;
        this.arm2angle = 0 * deg2rad;

        //"Recolha"
        this.RX1 = 5;
        this.RX2 = 15;
        this.RY1 = 5;
        this.RY2 = 15;
        //"Deposito"
        this.DX =0;
        this.DY =0;

        this.isAtD = true;
        this.operating = false;

        //held car
        this.car = null;

        //angle left to move
        this.horizontalAngle = 0;
        this.angleDec = 1*deg2rad;
        this.degreesLeft = 0;
	};

	

	display() {

        let deg2rad = Math.PI / 180.0;

        this.scene.pushMatrix();
        this.scene.pushMatrix();
        this.scene.translate(10, 0.5, -10);


        this.scene.pushMatrix();
        this.scene.rotate(this.horizontalAngle, 0, 1, 0);

        //Base
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(90*deg2rad, 1, 0, 0);
        this.base.display();
        this.scene.popMatrix();

        //Everything execept the base will be rotated angle1 + arm1angle degrees
        this.scene.pushMatrix();
        this.scene.rotate(this.arm1angle, 1, 0, 0);

        //Arm1
        this.scene.pushMatrix();
        this.scene.translate(0, -0.2, 0);
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

         //Arm2
         this.scene.pushMatrix();
         this.scene.scale(1, 1, 0.7);
         this.scene.translate(0, 5, 0);
         this.scene.rotate(this.arm2angle, 1, 0, 0);
         this.arm.display();
         this.scene.popMatrix();

         //end of rotation angle1 + arm1angle degrees
         this.scene.popMatrix();


         this.scene.pushMatrix();
         this.scene.translate(0, -2, 0);
        this.scene.translate(0 , (Math.cos(this.arm1angle))*5  - Math.sin(this.arm2angle)*5, Math.sin(this.arm1angle)*5 + Math.cos(this.arm2angle)*5*0.65);
        //console.log("arm1: " + this.arm1angle + "  arm2:" + this.arm2angle);
         this.magnet.display();
         this.scene.popMatrix();

         

         // end of horizontal rotation
         this.scene.popMatrix();

         this.scene.popMatrix();
         this.scene.pushMatrix();
         this.scene.rotate(this.horizontalAngle, 0, 1, 0);
         if (this.vehicle != null)
         this.vehicle.display();

         this.scene.popMatrix();

         this.scene.popMatrix();
        }
    
    setArm1Angle(angle){
        let deg2rad = Math.PI / 180.0;
        this.angle1 = angle * deg2rad;
    }

    setArm2Angle(angle){
        let deg2rad = Math.PI / 180.0;
        this.angle2 = angle * deg2rad;
    }

    move(){
        this.degreesLeft = Math.PI;
        if (!this.operating){
            if (this.isAtD)
            this.isAtD = false;
            else
            this.isAtD = true;
            this.operating = true;
        }
      
        

    }

    update(currTime, vehicle){
        if (vehicle.carLocation[0] >= this.RX1 && vehicle.carLocation[1] <= this.RX2 && vehicle.carLocation[0] >= this.RY1 && vehicle.carLocation[1]<= this.RY2){
        vehicle.isAttached = true;
        this.vehicle = vehicle
        }
        else this.vehicle = null;
        if (this.degreesLeft > 0){
            if (!this.isAtD)
             this.horizontalAngle += this.angleDec;
             else
             this.horizontalAngle -= this.angleDec;
          
            this.degreesLeft -= this.angleDec;
            }
            else this.operating = false;
    }
};
