class MyVehicle extends CGFobject {
    /* 
    
    Vehicle dimensions:
    
    -length: 5
    -width:2.4
    -height:2
    -longer trapezoid base length: 3
    -trapezoid height: 0.6
    -wheel radius: 0.53

    */

    /**
 	* MyVehicle
	* @param gl {WebGLRenderingContext}
 	* @constructor
 	*/
    constructor(scene) {
        super(scene);
        this.top = new MyVehicleTop(scene);
        this.bottom = new MyVehicleBottom(scene);
        this.quad = new Plane(scene, 0, 1, 0, 1, 20);
        this.wheel = new MyCylinder(scene, 100, 5, true);
        this.lamp = new MyLamp(scene, 20, 20);

        this.currApperance = null;

        this.wheelsAngleMovement = 0;   //only when there's motion
        this.rotationAngle = Math.PI / 100;
        this.steerAngle = 0;

        this.carHeading = 0;
        this.carLocation = [0, 0, 0];
        this.carSpeed = 0;
        this.wheelBase = 3.0;
        this.dt = 2;

        this.z = 0;

        this.isAttached = false;

        this.length = 5;
        this.width = 2.4;
        this.height = 2;

        this.maxSpeed = 0.25;
        this.maxSteerAngle = Math.PI/4;

        this.dropped = false;

        //Tire texture
        this.tireAppearance = new CGFappearance(scene);
        this.tireAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.tireAppearance.setShininess(0.1);
        this.tireAppearance.setDiffuse(0.3, 0.3, 0.3, 1);
        this.tireAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.tireAppearance.loadTexture("../resources/images/tire.png");

        //Tire's top texture
        this.tireTopAppearance = new CGFappearance(scene);
        this.tireTopAppearance.setSpecular(0.5, 0.5, 0.5, 1);
        this.tireTopAppearance.setShininess(0.1);
        this.tireTopAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
        this.tireTopAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.tireTopAppearance.loadTexture("../resources/images/tire_rim.jpg");

        //Vehicle's lamp
        this.lampAppearance = new CGFappearance(scene);
        this.lampAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.lampAppearance.setDiffuse(0.8, 0.8, 0.9, 1);
        this.lampAppearance.setSpecular(0.2, 0.2, 0.2, 1);
        this.lampAppearance.setShininess(120);

        //Front texture
        this.frontAppearance = new CGFappearance(scene);
        this.frontAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.frontAppearance.setShininess(0.1);
        this.frontAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.frontAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //Back texture
        this.backAppearance = new CGFappearance(scene);
        this.backAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.backAppearance.setShininess(0.1);
        this.backAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.backAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.setFrontAppearances();
        this.setBackAppearances();


    }

    /**
     * Defines the vehicle's front appearances. This method is called only once (by the constructor)
     */
    setFrontAppearances() {
        this.frontBlue = new CGFappearance(this.scene);
        this.frontBlue.setSpecular(0.5, 0.5, 0.5, 1);
        this.frontBlue.setShininess(0.1);
        this.frontBlue.setDiffuse(0.9, 0.9, 0.9, 1);
        this.frontBlue.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.frontBlue.loadTexture("../resources/images/front_blue.jpg");

        this.frontPurple = new CGFappearance(this.scene);
        this.frontPurple.setSpecular(0.5, 0.5, 0.5, 1);
        this.frontPurple.setShininess(0.1);
        this.frontPurple.setDiffuse(0.9, 0.9, 0.9, 1);
        this.frontPurple.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.frontPurple.loadTexture("../resources/images/front_purple.jpg");

        this.frontCamouflage = new CGFappearance(this.scene);
        this.frontCamouflage.setSpecular(0.1, 0.1, 0.1, 1);
        this.frontCamouflage.setShininess(0.1);
        this.frontCamouflage.setDiffuse(0.9, 0.9, 0.9, 1);
        this.frontCamouflage.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.frontCamouflage.loadTexture("../resources/images/front_camouflage.jpg");
    }

     /**
     * Defines the vehicle's back appearances. This method is called only once (by the constructor)
     */
    setBackAppearances() {
        this.backBlue = new CGFappearance(this.scene);
        this.backBlue.setSpecular(0.5, 0.5, 0.5, 1);
        this.backBlue.setShininess(0.1);
        this.backBlue.setDiffuse(0.9, 0.9, 0.9, 1);
        this.backBlue.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.backBlue.loadTexture("../resources/images/back_blue.jpg");

        this.backPurple = new CGFappearance(this.scene);
        this.backPurple.setSpecular(0.5, 0.5, 0.5, 1);
        this.backPurple.setShininess(0.1);
        this.backPurple.setDiffuse(0.9, 0.9, 0.9, 1);
        this.backPurple.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.backPurple.loadTexture("../resources/images/back_purple.jpg");

        this.backCamouflage = new CGFappearance(this.scene);
        this.backCamouflage.setSpecular(0.1, 0.1, 0.1, 1);
        this.backCamouflage.setShininess(0.1);
        this.backCamouflage.setDiffuse(0.9, 0.9, 0.9, 1);
        this.backCamouflage.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.backCamouflage.loadTexture("../resources/images/back_camouflage.jpg");
    }

    /**
     * Displays the vehicle
     */
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

        this.scene.translate(this.carLocation[0], this.z, -this.carLocation[1]);
        this.scene.rotate(this.carHeading, 0, 1, 0);

        let angularVelocity = (-this.carSpeed / 0.53); //0.53: wheel's radius
        this.wheelsAngleMovement += angularVelocity;

        //top
        this.scene.pushMatrix();
        this.scene.translate(-0.25, 1.4, -1.2);
        this.scene.scale(3 / 7, 0.6, 1);
        this.top.display();
        this.scene.popMatrix();

        this.applyCurrAppearance();

        //front
        this.scene.pushMatrix();
        this.scene.rotate(-90 * deg2rad, 1, 0, 0);
        this.scene.scale(1.20, 2.4, 1);
        this.scene.translate(((1.2 / 2) / 1.2) + (1.25 / 1.2), 0, 1.4);
        this.quad.display();
        this.scene.rotate(90 * deg2rad, 0, 1, 0);
        this.scene.scale(0.2 / 1.2, 0.2 / 2.4, 0.2);
        this.scene.translate(3, 4.8, 2);
        this.lampAppearance.apply();
        this.lamp.display();
        this.scene.translate(0, -9.6, 0);
        this.lamp.display();
        this.scene.popMatrix();
        this.applyCurrAppearance();

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
        this.frontAppearance.apply();
        this.quad.display();
        this.applyCurrAppearance();
        this.scene.popMatrix();


        //side back
        this.scene.pushMatrix();
        this.scene.rotate(-90 * deg2rad, 0, 1, 0);
        this.scene.scale(2.4, 1, 1);
        this.scene.translate(0, 1.4 - 0.5, 2.5);
        this.backAppearance.apply();
        this.quad.display();
        this.applyCurrAppearance();
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
        this.tireAppearance.apply();
        this.wheel.display();
        this.tireTopAppearance.apply();
        this.wheel.displayTop();
        this.scene.popMatrix();


        //right front wheel
        this.scene.pushMatrix();
        this.scene.translate(1.35, 0.53, 1.2 - 0.3);
        this.scene.rotate(this.steerAngle, 0, 1, 0);
        this.scene.rotate(-this.steerAngleRotation, 0, 0, 1);
        this.scene.rotate(this.wheelsAngleMovement, 0, 0, 1);
        this.scene.scale(0.53, 0.53, 0.3);
        this.tireAppearance.apply();
        this.wheel.display();
        this.tireTopAppearance.apply();
        this.wheel.displayTop();
        this.scene.popMatrix();

        //right back wheel
        this.scene.pushMatrix();
        this.scene.scale(0.53, 0.53, 0.3);
        this.scene.translate(-1.35 * 2, 1, (1.2 - 0.3) / 0.3);
        this.scene.rotate(-this.steerAngleRotation, 0, 0, 1);
        this.scene.rotate(this.wheelsAngleMovement, 0, 0, 1);
        this.tireAppearance.apply();
        this.wheel.display();
        this.tireTopAppearance.apply();
        this.wheel.displayTop();
        this.scene.popMatrix();

        //left back wheel
        this.scene.pushMatrix();
        this.scene.scale(0.53, 0.53, 0.3);
        this.scene.translate(-1.35 * 2, 1, -1.2 / 0.3);
        this.scene.rotate(-this.steerAngleRotation, 0, 0, 1);
        this.scene.rotate(this.wheelsAngleMovement, 0, 0, 1);
        this.tireAppearance.apply();
        this.wheel.display();
        this.tireTopAppearance.apply();
        this.wheel.displayTop();
        this.scene.popMatrix();

        this.scene.popMatrix();

    }

    /**
     * Sets the vehicle's texture to the given texture
     * @param {CGFappearance} appearance The appearance to be used in the vehicle
     * @param {String} textString The word used to describe the given texture
     */
    setAppearance(appearance, textString) {
        this.currApperance = appearance;
        switch (textString) {
            case 'BLUE':
                this.backAppearance = this.backBlue;
                this.frontAppearance = this.frontBlue;
                break;
            case 'PURPLE':
                this.backAppearance = this.backPurple;
                this.frontAppearance = this.frontPurple;
                break;
            case 'CAMOUFLAGE':
                this.backAppearance = this.backCamouflage;
                this.frontAppearance = this.frontCamouflage;
                break;
        };
    }

    /**
     * Applies the current appearance to the vehicle. Called by the display method.
     */
    applyCurrAppearance() {
        if (this.currApperance instanceof CGFappearance)
            this.currApperance.apply();
    }

    /**
     * Updates the car's speed and/or the front wheels' direction given the user input.
     * @param {String} motionDirection Must be one of the following: 'W','S','A' or 'D'
     */
    update(motionDirection) {

        if (motionDirection == 'W')
            this.carSpeed = this.carSpeed + 0.001;
        if (motionDirection == 'S')
            this.carSpeed = this.carSpeed - 0.001;
        if (motionDirection == 'A') {
            this.steerAngle += this.rotationAngle;
            if (this.steerAngle >= this.maxSteerAngle)
                this.steerAngle =   this.maxSteerAngle;
        }
        if (motionDirection == 'D') {
            this.steerAngle -= this.rotationAngle;
            if (Math.abs(this.steerAngle) >= this.maxSteerAngle)
                this.steerAngle = - this.maxSteerAngle;
        }

        if (this.carSpeed > this.maxSpeed)
            this.carSpeed = this.maxSpeed;
        else if (this.carSpeed < -this.maxSpeed)
            this.carSpeed = -this.maxSpeed;
    }

    /**
     * Returns the car's position
     * @returns {Array} The car's position 
     */
    getPosition() {
        return this.carLocation;
    }
}
