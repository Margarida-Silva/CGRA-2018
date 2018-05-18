class MyVehicle extends CGFobject {
    /* DIMENSOES:
    
    -comprimento: 5
    -largura:2.4
    -altura:2
    -comprimento da base maior do trapezio: 3
    -altura do trapezio: 0.6
    -raio das rodas: 0.53

    */
    constructor(scene) {
        super(scene);
        this.top = new MyVehicleTop(scene);
        this.bottom = new MyVehicleBottom(scene);
        this.quad = new MyQuad(scene, 0, 1, 0, 1);
        this.wheel = new MyCylinder(scene, 20, 5, true);

        this.wheelsAngleMovement = 0;   //only when there's motion
        this.rotationAngle = Math.PI / 100;
        this.steerAngle = 0;

        this.carHeading = 0;
        this.carLocation = [0, 0, 0];
        this.carSpeed = 0;
        this.wheelBase = 3.0;
        this.dt = 2;

        //Tire texture
        this.tireAppearance = new CGFappearance(scene);
        this.tireAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.tireAppearance.setShininess(0.1);
        this.tireAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tireAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
        this.tireAppearance.loadTexture("../resources/images/tire.jpg");
    }

    //centrado na origem do referencial
    display() {
        let deg2rad = Math.PI / 180.0;

        this.scene.pushMatrix();

        let frontWheel = [this.carLocation[0] + this.wheelBase / 2 * Math.cos(this.carHeading), this.carLocation[1] + this.wheelBase / 2 * Math.sin(this.carHeading)];
        let backWheel = [this.carLocation[0] - this.wheelBase / 2 * Math.cos(this.carHeading), this.carLocation[1] - this.wheelBase / 2 * Math.sin(this.carHeading)];

        backWheel[0] += this.carSpeed * this.dt * Math.cos(this.carHeading);
        backWheel[1] += this.carSpeed * this.dt * Math.sin(this.carHeading);
        frontWheel[0] += this.carSpeed * this.dt * Math.cos(this.carHeading + this.steerAngle);
        frontWheel[1] += this.carSpeed * this.dt * Math.sin(this.carHeading + this.steerAngle);

        this.carLocation[0] = (frontWheel[0] + backWheel[0]) / 2;
        this.carLocation[1] = (frontWheel[1] + backWheel[1]) / 2;
        this.carHeading = Math.atan2(frontWheel[1] - backWheel[1], frontWheel[0] - backWheel[0]);
        this.steerAngleRotation = 0;

        this.scene.translate(this.carLocation[0], 0, -this.carLocation[1]);
        this.scene.rotate(this.carHeading, 0, 1, 0);

        let angularVelocity = (-this.carSpeed / 0.53); //0.53: wheel's radius
        this.wheelsAngleMovement += angularVelocity;

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
        this.scene.translate(0, 0, -1.2);
        this.bottom.display();
        this.scene.popMatrix();

        this.tireAppearance.apply();


        //left front wheel
        this.scene.pushMatrix();
        this.scene.translate(1.35, 0.53, -1.2);
        this.scene.rotate(this.steerAngle, 0, 1, 0);
        this.scene.rotate(-this.steerAngleRotation, 0, 0, 1);
        this.scene.rotate(this.wheelsAngleMovement, 0, 0, 1);
        this.scene.scale(0.53, 0.53, 0.3);
        this.wheel.display();
        this.scene.popMatrix();


        //right front wheel
        this.scene.pushMatrix();
        this.scene.translate(1.35, 0.53, 1.2 - 0.3);
        this.scene.rotate(this.steerAngle, 0, 1, 0);
        this.scene.rotate(-this.steerAngleRotation, 0, 0, 1);
        this.scene.rotate(this.wheelsAngleMovement, 0, 0, 1);
        this.scene.scale(0.53, 0.53, 0.3);
        this.wheel.display();
        this.scene.popMatrix();

        //right back wheel
        this.scene.pushMatrix();
        this.scene.scale(0.53, 0.53, 0.3);
        this.scene.translate(-1.35 * 2, 1, (1.2 - 0.3) / 0.3);
        this.scene.rotate(-this.steerAngleRotation, 0, 0, 1);
        this.scene.rotate(this.wheelsAngleMovement, 0, 0, 1);
        this.wheel.display();
        this.scene.popMatrix();

        //left back wheel
        this.scene.pushMatrix();
        this.scene.scale(0.53, 0.53, 0.3);
        this.scene.translate(-1.35 * 2, 1, -1.2 / 0.3);
        this.scene.rotate(-this.steerAngleRotation, 0, 0, 1);
        this.scene.rotate(this.wheelsAngleMovement, 0, 0, 1);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

    };

    update(motionDirection) {

        //update the vehicle's position
        if (motionDirection == 'W')
            this.carSpeed = this.carSpeed + 0.001;
        if (motionDirection == 'S')
            this.carSpeed = this.carSpeed - 0.001;
        if (motionDirection == 'A') {
            this.steerAngle += this.rotationAngle;
            if (this.steerAngle >= (Math.PI / 4))
                this.steerAngle = (Math.PI / 4);

        }
        if (motionDirection == 'D') {
            this.steerAngle -= this.rotationAngle;
            if (Math.abs(this.steerAngle) >= (Math.PI / 4))
                this.steerAngle = - (Math.PI / 4);
        }

    }
}