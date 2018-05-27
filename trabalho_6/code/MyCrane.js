class MyCrane extends CGFobject {

    /**
    * MyCrane
    * @param gl {WebGLRenderingContext}
    * @constructor
    */
    constructor(scene) {
        super(scene);
        this.base = new MyCylinder(scene, 20, 20, true);
        this.arm = new MyCraneArm(scene);
        this.magnet = new MyMagnet(scene);
        this.carpet = new Plane(scene, 0, 1, 0, 1, 10);

        this.deg2rad = Math.PI / 180;

        this.defaultArm1HorizontalAngle = 180 * this.deg2rad;
        this.defaultArm1VerticalAngle = 10 * this.deg2rad;
        this.defaultArm2Angle = 20 * this.deg2rad;

        this.piledCars = 0;

        this.arm1HorizontalAngle = this.defaultArm1HorizontalAngle;
        this.arm1VerticalAngle = this.defaultArm1VerticalAngle;
        this.arm2angle = this.defaultArm2Angle;

        this.arm1length = 15;
        this.arm2length = 9;

        this.craneX = 15;
        this.craneY = 0;
        this.craneZ = - (Math.sin(this.arm1VerticalAngle) * this.arm1length) - (Math.cos(this.arm2angle + this.arm1VerticalAngle) * this.arm2length);

        //"Recolha"
        this.RX = this.craneX;
        this.RY = 0;
        this.RLength = 5;
        this.RWidth = 3;
        //"Deposito"
        this.DX = this.craneX;
        this.DY = - 2 * this.craneZ;
        this.DLength = 5;
        this.DWidth = 3;

        this.rotationRadius = 0.0;

        this.isAtD = true;
        this.isAtR = false;
        this.isMovingCar = false;
        this.inProcess = false;
        //Catch car flags and variables
        this.isCatchingCarH = false;
        this.catchingCarHFase = 1;
        this.isCatchingCarV = false;
        this.catchingCarVFase = 1;
        this.catchingCarV1Fase = 1;
        this.catchingCarHPositiveAngleSignal = false;
        this.catchingCarHDegrees = 0.0;
        this.carInitialAngle = 0.0;

        //held car
        this.vehicle = null;

        this.DhorizontalAngle = this.defaultArm1HorizontalAngle;
        this.angleDec = 1 * this.deg2rad;

        //Texture
        this.craneAppearance = new CGFappearance(scene);
        this.craneAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.craneAppearance.setShininess(0.1);
        this.craneAppearance.setDiffuse(0.3, 0.3, 0.3, 1);
        this.craneAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.craneAppearance.loadTexture("../resources/images/crane.jpg");
    };


    /**
     * Displays the crane's body
     */
    display() {

        this.craneAppearance.apply();

        //R Carpet
        this.scene.pushMatrix();
        this.scene.rotate(-90 * this.deg2rad, 1, 0, 0);
        this.scene.scale(this.RLength, this.RWidth, 1);
        this.scene.translate(0, 0,0.003); //so that the carpet is visible
        this.scene.translate(this.RX / this.RLength, this.RY / this.RWidth, 0);
        this.carpet.display();
        this.scene.popMatrix();

        //D Carpet
        this.scene.pushMatrix();
        this.scene.rotate(-90 * this.deg2rad, 1, 0, 0);
        this.scene.scale(this.DLength, this.DWidth, 1);
        this.scene.translate(0, 0,0.003); //so that the carpet is visible
        this.scene.translate(this.DX / this.DLength, this.DY / this.DWidth, 0);
        this.carpet.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.pushMatrix();
        this.scene.translate(this.craneX, this.craneY, this.craneZ);

        this.scene.pushMatrix();
        this.scene.rotate(this.arm1HorizontalAngle, 0, 1, 0);

        //Base

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.scale(0.7, 0.5, 0.7);
        this.scene.rotate(90 * this.deg2rad, 1, 0, 0);
        this.base.display();
        this.scene.popMatrix();



        //Everything execept the base will be rotated angle1 + arm1VerticalAngle degrees
        this.scene.pushMatrix();
        this.scene.rotate(this.arm1VerticalAngle, 1, 0, 0);

        //Arm1

        this.scene.pushMatrix();
        this.scene.rotate(-90 * this.deg2rad, 1, 0, 0);
        this.arm.display(this.arm1length);
        this.scene.popMatrix();


        //Articulation

        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(90 * this.deg2rad, 0, 1, 0);
        this.scene.translate(0, this.arm1length / 0.5, -0.5);
        this.base.display();
        this.scene.popMatrix();

        //Arm2

        this.scene.pushMatrix();
        this.scene.translate(0, this.arm1length, 0);
        this.scene.rotate(this.arm2angle, 1, 0, 0);
        this.scene.translate(0, -(this.arm.thickness / 2), 0);
        this.arm.display(this.arm2length);
        this.scene.popMatrix();


        //end of rotation angle1 + arm1VerticalAngle degrees
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, Math.cos(this.arm1VerticalAngle) * this.arm1length - Math.sin(this.arm2angle + this.arm1VerticalAngle) * this.arm2length, Math.sin(this.arm1VerticalAngle) * this.arm1length + Math.cos(this.arm2angle + this.arm1VerticalAngle) * this.arm2length);
        this.magnet.display();
        this.scene.popMatrix();


        // end of horizontal rotation
        this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.craneX, this.craneY, this.craneZ);
        this.scene.rotate(this.carInitialAngle + this.arm1HorizontalAngle, 0, 1, 0);
        this.scene.translate(-this.craneX, -this.craneY, -this.craneZ);

        this.scene.popMatrix();
    }
    
    /**
    * Updates the vehicle's position and crane angles while moving the car from R to D
    */

    move() {
        let angleToRotate = this.DhorizontalAngle - this.arm1HorizontalAngle;
        let abs = Math.abs(angleToRotate);
        let nCars = this.scene.oldVehiclesIndex;
        let height = nCars * this.vehicle.height;
       
        this.vehicle.carSpeed = 0;

        let verticalAngle = this.arm2angle - Math.atan((Math.cos((this.arm2angle + this.arm1VerticalAngle) * this.arm2length)) / height);

        if (abs > 0 && (abs > this.angleDec)) {
            let oldX = Math.sin(this.arm1HorizontalAngle);
            let oldY = Math.cos(this.arm1HorizontalAngle);

            if (angleToRotate > 0) {
                this.arm1HorizontalAngle += this.angleDec;
                if (this.arm1HorizontalAngle > this.defaultArm1HorizontalAngle)
                    this.vehicle.carHeading += this.angleDec;
            }

            else {
                this.arm1HorizontalAngle -= this.angleDec;
                if (this.arm1HorizontalAngle < this.defaultArm1HorizontalAngle)
                    this.vehicle.carHeading -= this.angleDec;
            }

            let newX = Math.sin(this.arm1HorizontalAngle);
            let newY = Math.cos(this.arm1HorizontalAngle);

            this.vehicle.carLocation[0] += (newX - oldX) * Math.abs(this.craneZ);
            this.vehicle.carLocation[1] += (oldY - newY) * Math.abs(this.craneZ);
        }
        else {
            this.isMovingCar = false;
            this.isAtR = true;
        }
    }

    /**
    * Verifies if the vehicle is within R bounds
    * @param {MyVehicle} vehicle - Vehicle whose location is being tested
    * @returns {Boolean} - If vehicle is withing R bounds true, false otherwise
    */

    vehicleWithinBounds(vehicle) {
        return ((vehicle.carLocation[0] >= this.RX - (this.RLength / 2)) && (vehicle.carLocation[0] <= (this.RX + (this.RLength / 2))) && (vehicle.carLocation[1] >= (this.RY / 2)) && (vehicle.carLocation[1] <= (this.RY + (this.RWidth / 2))));
    }

    /**
    * Calls the right function of crane movement according to its state variables
    * @param {MyVehicle} vehicle - Vehicle to be updated
    * @param {Number} currTime - The current time in milliseconds
    */
    update(currTime, vehicle) {
        this.vehicle = vehicle;
        if (this.isMovingCar)
            this.move();
        else {
            if (this.isAtR) {
                this.dropCar();
                this.isAtR = false;
            }

            else if (this.vehicleWithinBounds(vehicle) && this.scene.oldVehiclesIndex < 3) {
                if (!this.isCatchingCarH) {
                    this.isCatchingCarH = true;
                    this.inProcess = true;
                    this.vehicle = vehicle;
                    this.getCarAngle();
                }

                if (!this.vehicle.isAttached)
                    this.catchCar(this.vehicle);
                else if (this.isMovingCar)
                    this.move();
                else if (this.isCatchingCarV)
                    this.rotatingCraneVerticallyToDefaultAtD();
                else if (this.isCatchingCarH)
                    this.rotatingCraneHorizontallyToDefaultAtD();
            }
            else {
                if (!this.vehicle.isAttached)
                    this.catchCar(this.vehicle);
                if (this.isMovingCar)
                    this.move();
                else if (this.isCatchingCarV)
                    this.rotatingCraneVerticallyToDefaultAtD();
                else if (this.isCatchingCarH) {
                    this.rotatingCraneHorizontallyToDefaultAtD();
                    this.inProcess = false;
                }
            }

        }
    }

    /**
    * Calls the function of horizontal catching car movement according to the catching fase
    * @param {MyVehicle} vehicle - Vehicle to be caught
    */


    catchCarH(vehicle) {
        if (this.catchingCarHFase == 1) {
            this.inProcess = true;
            this.rotatingCraneHorizontallyToCatchAtR();
        }
        else if (this.catchingCarHFase == 2) {
            this.rotatingCraneHorizontallyToDefaultAtD();
        }
    }

    /**
    * Calls the function of vertical catching car movement according to the catching fase
    * @param {MyVehicle} vehicle - Vehicle to be caught
    */

    catchCarV(vehicle) {
        if (this.catchingCarVFase == 1) {
            this.rotatingCraneVerticallyToCatchAtR();
        }
        else if (this.catchingCarVFase == 2) {
            this.rotatingCraneVerticallyToDefaultAtD();
        }
    }

    /***** ROTATING VERTICALLY ******/

    /**
    * Updates the crane state and vehicle position while the second is being attached to the first is a vertical way
    */

    rotatingCraneVerticallyToCatchAtR() {

        if (this.catchingCarV1Fase == 1){
        let articulationAngle = this.arm1VerticalAngle + this.arm2angle;
        let X = (Math.cos(this.arm1VerticalAngle) * this.arm1length) - this.vehicle.height - this.magnet.height;
        let Y = (Math.cos(this.arm1VerticalAngle + this.arm2angle) * this.arm2length);
        let newAngle = Math.atan(X / Y);
        let angleToRotate = newAngle - articulationAngle;
        
        let abs = Math.abs(angleToRotate);
        if (abs > 0 && (abs > this.angleDec)) {
            if (angleToRotate > 0) {
                this.arm2angle += 0.5*this.angleDec;
                this.arm1VerticalAngle += (this.arm2length/this.arm1length) * this.angleDec;
            }
            else {
                this.arm2angle -= 0.5*this.angleDec;
                this.arm1VerticalAngle -= (this.arm2length/this.arm1length) * this.angleDec;
            }
        }
        else {
            //Crane will start to move car
            this.catchingCarV1Fase++;
        }
    }
    else {
        let angle1 = this.arm1VerticalAngle - this.defaultArm1VerticalAngle;
        let angle2 = this.arm2angle - this.defaultArm2Angle;

        if (angle1 > 0  || angle2 > 0){
            let oldZ = Math.cos(this.arm1VerticalAngle) * this.arm1length - Math.sin(this.arm2angle + this.arm1VerticalAngle) * this.arm2length;
            let oldY =  Math.sin(this.arm1VerticalAngle) * this.arm1length + Math.cos(this.arm2angle + this.arm1VerticalAngle) * this.arm2length;

        if (angle2 > 0){
            this.arm2angle -= this.angleDec;
        }
        else if (angle1 > 0) {
            this.arm1VerticalAngle -= this.angleDec; 
        }
        let newZ = Math.cos(this.arm1VerticalAngle) * this.arm1length - Math.sin(this.arm2angle + this.arm1VerticalAngle) * this.arm2length;
            let newY =  Math.sin(this.arm1VerticalAngle) * this.arm1length + Math.cos(this.arm2angle + this.arm1VerticalAngle) * this.arm2length;
            this.vehicle.displayYCorrection += newY - oldY;
            this.vehicle.z += newZ - oldZ;
        }
        else {
            this.catchingCarV1Fase = 1;
            this.isMovingCar = true;
            this.vehicle.isAttached = true;
        }

    }

    }

    /**
    * Makes the crane return to its default vertical position
    */

    rotatingCraneVerticallyToDefaultAtD() {
        let angleToRotate = this.arm2angle - this.defaultArm2Angle;
        let abs = Math.abs(angleToRotate);

        if (abs > 0 && (abs > this.angleDec) || (this.arm1VerticalAngle > this.defaultArm1VerticalAngle)) {
            if (angleToRotate > 0) {
                this.arm2angle -= this.angleDec;
            }
            else {
                this.arm2angle += this.angleDec;
            }

            if (this.arm1VerticalAngle > this.defaultArm1VerticalAngle) {
                this.arm1VerticalAngle -= this.angleDec;
            }
        }
        else {
            this.catchingCarVFase = 1;
            this.isCatchingCarV = false;
        }
    }

    /***** ROTATING HORIZONTALLY ******/

    /**
    * Updates the crane's state and vehicle's position while the second is being attached to the first in a horizontal way
    */

    rotatingCraneHorizontallyToCatchAtR() {
        let deltaX = this.vehicle.carLocation[0] - this.craneX;
        let deltaY = this.vehicle.carLocation[1] - this.craneZ;
        let angle = Math.atan(deltaX / deltaY);
        let finalAngle = angle - this.arm1HorizontalAngle;

        let angleToRotate = this.arm1HorizontalAngle - finalAngle;
        let abs = Math.abs(angleToRotate);

        if (abs > 0 && (abs > this.angleDec)) {
            if (angleToRotate > 0)
                this.arm1HorizontalAngle -= this.angleDec;
            else
                this.arm1HorizontalAngle += this.angleDec;
        }
        else {
            this.isCatchingCarV = true;
            this.catchingCarFase++;
        }
    }

     /**
    /* Makes the crane return to its default horizontal position
    */

    rotatingCraneHorizontallyToDefaultAtD() {
        let angleToRotate = this.arm1HorizontalAngle - this.defaultArm1HorizontalAngle;
        let abs = Math.abs(angleToRotate);
        if (abs > 0 && (abs > this.angleDec)) {
            if (angleToRotate > 0)
                this.arm1HorizontalAngle -= this.angleDec;
            else
                this.arm1HorizontalAngle += this.angleDec;
        }
        else {
            this.catchingCarHFase = 1;
            this.isCatchingCarH = false;
        }
    }

    /**
    * Calls the crane's adequate function to catch the vehicle acording the catching state
    * @param {MyVehicle} vehicle - Vehicle to be caught
    */

    catchCar(vehicle) {
        if (this.isCatchingCarH)
            this.catchCarH(vehicle);
        if (this.isCatchingCarV)
            this.catchCarV(vehicle);
    }

    /**
    * Gets the car angle in relation to the arm1 horizontal angle
    */

    getCarAngle() {
        let deltaX = this.vehicle.carLocation[0] - this.craneX;
        let deltaY = this.vehicle.carLocation[1] - this.craneZ;
        let angle = Math.atan(deltaX / deltaY);
        let finalAngle = angle - this.arm1HorizontalAngle;

        this.carInitialAngle = this.arm1HorizontalAngle - finalAngle;
    }


    /**
    * Drops the vehicle
    */
    dropCar() {

        this.vehicle.isAttached = false;
        this.vehicle.dropped = true;
    }
};
