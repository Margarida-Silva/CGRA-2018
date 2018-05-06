class MyVehicle extends CGFobject {
    /* DIMENSOES:
    
    -comprimento: 5
    -largura:2.4
    -altura:2
    -comprimento da base maior do trapezio: 3
    -altura do trapezio: 0.6

    */
    constructor(scene, speed) {
        super(scene);
        this.top = new MyVehicleTop(scene);
        this.bottom = new MyVehicleBottom(scene);
        this.quad = new MyQuad(scene, 0, 1, 0, 1);
        this.wheel = new MyCylinder(scene, 20, 5, true);
        this.position = [0, 0, 0];
        this.angle = 0; //car's angle
        this.velocity = [speed, 0, 0];
        this.frontWheelsAngle = 0;  //in rad.
        this.frontWheelsAngleRotation = 0;  //in rad. Only when there's motion.
        this.rotationAngle = (Math.PI / 30);    //angle of the front wheels rotation when 'A' or 'D' are pressed
    }


    //centrado na origem do referencial
    display() {
        let deg2rad = Math.PI / 180.0;

        this.scene.pushMatrix();

        this.scene.translate(this.position[0], 0,this.position[1]);
        this.scene.rotate(this.angle,0,1,0);

        //top
        this.scene.pushMatrix();
        this.scene.translate(-0.25, 1.4, -1.2);
        this.scene.scale(3 / 7, 0.6, 1);
        this.top.display();
        this.scene.popMatrix();

        //front
        this.scene.pushMatrix();
        this.scene.rotate(-90 * deg2rad, 1, 0, 0);
        this.scene.scale(1.20, 2.4, 1);
        this.scene.translate(((1.2 / 2) / 1.2) + (1.25 / 1.2), 0, 1.4);
        this.quad.display();
        this.scene.popMatrix();

        //back
        this.scene.pushMatrix();
        this.scene.rotate(-90 * deg2rad, 1, 0, 0);
        this.scene.scale(0.75, 2.4, 1);
        this.scene.translate(-((0.75 / 2) / 0.75) - (1.75 / 0.75), 0, 1.4);
        this.quad.display();
        this.scene.popMatrix();

        //side front
        this.scene.pushMatrix();
        this.scene.rotate(90 * deg2rad, 0, 1, 0);
        this.scene.scale(2.4, 1, 1);
        this.scene.translate(0, 1.4 - 0.5, 2.45);
        this.quad.display();
        this.scene.popMatrix();
        

        //side back
        this.scene.pushMatrix();
        this.scene.rotate(-90 * deg2rad, 0, 1, 0);
        this.scene.scale(2.4, 1, 1);
        this.scene.translate(0, 1.4 - 0.5, 2.5);
        this.quad.display();
        this.scene.popMatrix();
        

        //bottom
        this.scene.pushMatrix();
        this.scene.translate(0,0,-1.2);
        this.bottom.display();
        this.scene.popMatrix();


        //left front wheel
        this.scene.pushMatrix();
        this.scene.translate(1.35, 0.53, -1.2);
        this.scene.rotate(this.frontWheelsAngle, 0, 1, 0);
        this.scene.rotate(-this.frontWheelsAngleRotation,0,0,1);
        this.scene.scale(0.53, 0.53, 0.3);
        this.wheel.display();
        this.scene.popMatrix();
        

        //right front wheel
        this.scene.pushMatrix();
        this.scene.translate(1.35, 0.53, 1.2 - 0.3);
        this.scene.rotate(this.frontWheelsAngle, 0, 1, 0);
        this.scene.rotate(-this.frontWheelsAngleRotation,0,0,1);
        this.scene.scale(0.53, 0.53, 0.3);
        this.wheel.display();
        this.scene.popMatrix();

        //right back wheel
        this.scene.pushMatrix();
        this.scene.scale(0.53, 0.53, 0.3);
        this.scene.translate(-1.35 * 2, 1, (1.2-0.3)/0.3);
        this.scene.rotate(-this.frontWheelsAngleRotation,0,0,1);
        this.wheel.display();
        this.scene.popMatrix();

        //left back wheel
        this.scene.pushMatrix();
        this.scene.scale(0.53, 0.53, 0.3);
        this.scene.translate(-1.35 * 2, 1, -1.2/0.3);
        this.scene.rotate(-this.frontWheelsAngleRotation,0,0,1);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        
    };

    update(motionDirection, speed) {

        //update velocity vector based on the current speed
      /*  this.velocity[0] /= (velocityModule / speed);
        this.velocity[1] /= (velocityModule / speed);
        this.velocity[2] /= (velocityModule / speed);*/
        this.velocity[0] = speed * Math.cos(this.angle);
        this.velocity[2] = speed * Math.sin(this.angle);
        this.velocity[1] = 0;
        let velocityModule = Math.sqrt(Math.pow(this.velocity[0], 2) + Math.pow(this.velocity[1], 2) + Math.pow(this.velocity[2], 2));

        //update the vehicle's position
        if (motionDirection == 'W') {
            this.position[0] += this.velocity[0];
            this.position[2] += this.velocity[2];
            this.angle+=this.frontWheelsAngle*0.03;
            this.frontWheelsAngleRotation += 2*velocityModule / 0.4;    //0.4 = wheel's radius
        }
        else if (motionDirection == 'S') {
            this.position[0] -= this.velocity[0];
            this.position[2] -= this.velocity[2];
            this.angle-=this.frontWheelsAngle*0.03;
            this.frontWheelsAngleRotation -= 2*velocityModule / 0.4;    //0.4 = wheel's radius
        }
        else if (motionDirection == 'A') {
            this.frontWheelsAngle += this.rotationAngle;
            if (this.frontWheelsAngle >= (Math.PI / 4))
                this.frontWheelsAngle = (Math.PI / 4);

        }
        else if (motionDirection == 'D') {
            this.frontWheelsAngle -= this.rotationAngle;
            if (Math.abs(this.frontWheelsAngle) >= (Math.PI / 4))
                this.frontWheelsAngle = - (Math.PI / 4);
        }
    }
}