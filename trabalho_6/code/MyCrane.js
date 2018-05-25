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
        this.carpet = new Plane(scene, 10, 0, 1, 0, 1);

        let deg2rad = Math.PI / 180.0;
        this.arm1angle = 0*deg2rad;
        this.arm2angle = 0* deg2rad;

        this.arm1length = 7;
        this.arm2length = 3.5;

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

        //Texture
        this.craneAppearance = new CGFappearance(scene);
        this.craneAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.craneAppearance.setShininess(0.1);
        this.craneAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.craneAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.craneAppearance.loadTexture("../resources/images/crane.jpg");
	};

	

	display() {
        this.craneAppearance.apply();

        let deg2rad = Math.PI / 180.0;

        this.scene.pushMatrix();
        this.scene.pushMatrix();
        this.scene.translate(10, 0, -10);


        this.scene.pushMatrix();
        this.scene.rotate(this.horizontalAngle, 0, 1, 0);

        //Base
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.scale(0.7, 0.5, 0.7);
        this.scene.rotate(90*deg2rad, 1, 0, 0);
        this.base.display();
        this.scene.popMatrix();
        
        

        //Everything execept the base will be rotated angle1 + arm1angle degrees
        this.scene.pushMatrix();
        this.scene.rotate(this.arm1angle, 1, 0, 0);

        //Arm1
        
        this.scene.pushMatrix();
        this.scene.rotate(-90*deg2rad, 1, 0, 0);
        this.arm.display(this.arm1length);
        this.scene.popMatrix();
        

        //Articulation
        
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(90*deg2rad, 0, 1, 0);
        this.scene.translate(0, this.arm1length / 0.5, 0);
        this.base.display();
        this.scene.popMatrix();
        
        

         //Arm2
         
         this.scene.pushMatrix();
         this.scene.translate(0, this.arm1length, 0);
         this.scene.rotate(this.arm2angle, 1, 0, 0);
         this.scene.translate(0, -(this.arm.thickness/2), 0);
         this.arm.display(this.arm2length);
         this.scene.popMatrix();
         

         //end of rotation angle1 + arm1angle degrees
         this.scene.popMatrix();

         this.scene.pushMatrix();
         this.scene.translate(0, Math.cos(this.arm1angle) * this.arm1length - Math.sin(this.arm2angle + this.arm1angle)*this.arm2length, Math.sin(this.arm1angle)*this.arm1length + Math.cos(this.arm2angle + this.arm1angle)*this.arm2length);
         this.magnet.display();
         this.scene.popMatrix();

         

         // end of horizontal rotation
         this.scene.popMatrix();

         this.scene.pushMatrix();
         //his.scene.scale(this.RX1-this.RX2, this.RY1 -this.RY2);
         this.scene.rotate(90*deg2rad, 0,1, 0);
         //this.scene.translate(this.RX1, this.RY1);
         this.carpet.display();
         this.scene.popMatrix();

         this.scene.popMatrix();
         
         this.scene.pushMatrix();
         this.scene.translate(10, 0, -10);
         this.scene.rotate(this.horizontalAngle, 0, 1, 0);
         this.scene.translate(-10, -0, 10);
         if (this.vehicle != null)
         this.vehicle.display();

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
        this.vehicle = vehicle;
        }
        else this.vehicle = null;
        if (this.degreesLeft > 0){
            if (!this.isAtD)
             this.horizontalAngle += this.angleDec;
             else
             this.horizontalAngle -= this.angleDec;
          
            this.degreesLeft -= this.angleDec;
            }
            else {
                this.operating = false;
                if (this.vehicle != null)
                this.vehicle.isAttached = false;
                this.vehicle = null;
            }
    }
};
