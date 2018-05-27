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
        this.defaultArm1VerticalAngle = 0 * this.deg2rad;
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

        /*
        for (let i = 0; i < this.piledCars; i++) {
            this.cars[i].display();
        }

        */

        this.craneAppearance.apply();

        //RCarpet
        this.scene.pushMatrix();
        this.scene.rotate(-90 * this.deg2rad, 1, 0, 0);
        this.scene.scale(this.RLength, this.RWidth, 1);
        this.scene.translate(this.RX / this.RLength, this.RY / this.RWidth, 0);
        this.carpet.display();
        this.scene.popMatrix();

        //DCarpet
        this.scene.pushMatrix();
        this.scene.rotate(-90 * this.deg2rad, 1, 0, 0);
        this.scene.scale(this.DLength, this.DWidth, 1);
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
    
    setArm1Angle(angle) {
        this.angle1 = angle * this.deg2rad;
    }

    setArm2Angle(angle) {
        this.angle2 = angle * this.deg2rad;
    }

    move() {
        let angleToRotate = this.DhorizontalAngle - this.arm1HorizontalAngle;
        let abs = Math.abs(angleToRotate);
        let nCars = this.scene.oldVehiclesIndex;
        let height = nCars * this.vehicle.height;
       
        this.vehicle.carSpeed = 0;

        let verticalAngle = this.arm2angle - Math.atan((Math.cos((this.arm2angle + this.arm1VerticalAngle) * this.arm2length)) / height);

        if (verticalAngle > 0) {
            let oldx = Math.sin(this.arm2angle + this.arm1VerticalAngle) * this.arm2length;
            this.arm2angle -= this.angleDec;
            let newx = Math.sin(this.arm2angle + this.arm1VerticalAngle) * this.arm2length;
            console.log("add: " + (newx - oldx));
            this.vehicle.z -= (newx - oldx);
        }

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
            //this.isAttached= false;
        }
    }

    vehicleWithinBounds(vehicle) {
        return ((vehicle.carLocation[0] >= this.RX - (this.RLength / 2)) && (vehicle.carLocation[0] <= (this.RX + (this.RLength / 2))) && (vehicle.carLocation[1] >= (this.RY / 2)) && (vehicle.carLocation[1] <= (this.RY + (this.RWidth / 2))));
    }

    update(currTime, vehicle) {
        this.vehicle = vehicle;
        if (this.isMovingCar)
            this.move();
        else {
            if (this.isAtR) {
                this.dropCar();
                this.isAtR = false;
            }

            else if (this.vehicleWithinBounds(vehicle)) {
                if (!this.isCatchingCarH) {
                    this.isCatchingCarH = true;
                    this.inProcess = true;
                    this.vehicle = vehicle;
                    this.getCarAngle();
                    console.log("v =0 ");
                    this.vehicle.carSpeed = 0;
                }

                if (!this.vehicle.isAttached)
                    this.catchCar(this.vehicle);
                else if (this.isMovingCar)
                    this.move();
                else if (this.isCatchingCarV)
                    this.rotatingCraneVToDefault();
                else if (this.isCatchingCarH)
                    this.rotatingCraneHToReturnToDefault();
            }
            else {
                if (this.isCatchingCarV)
                    this.rotatingCraneVToDefault();
                else if (this.isCatchingCarH) {
                    this.rotatingCraneHToReturnToDefault();
                    this.inProcess = false;
                }
            }

        }
    }


    catchCarH(vehicle) {
        if (this.catchingCarHFase == 1) {
            this.inProcess = true;
            this.rotatingCraneHToCatch();
        }
        else if (this.catchingCarHFase == 2) {
            this.rotatingCraneHToReturnToDefault();
        }
    }

    catchCarV(vehicle) {
        if (this.catchingCarVFase == 1) {
            this.rotatingCraneVToCatch();
        }
        else if (this.catchingCarVFase == 2) {
            this.rotatingCraneVToDefault();
        }
    }

    /***** ROTATING VERTICALLY ******/

    rotatingCraneVToCatch() {
        let articulationAngle = this.arm1VerticalAngle + this.arm2angle;
        let X = (Math.cos(this.arm1VerticalAngle) * this.arm1length) - this.vehicle.height + 7 * this.magnet.height;
        let Y = (Math.sin(this.arm1VerticalAngle + this.arm2angle) * this.arm2length);
        let newAngle = Math.atan(X / Y);
        let angleToRotate = newAngle - articulationAngle;
        console.log("angletorotate: " + (angleToRotate / this.deg2rad));
        //console.log("angletorotateV" + angleToRotate);
        let abs = Math.abs(angleToRotate);

        if (abs > 0 && (abs > this.angleDec)) {
            if (angleToRotate > 0) {
                this.arm2angle += this.angleDec;
                this.arm1VerticalAngle += 0.5 * this.angleDec;
            }
            else {
                this.arm2angle -= this.angleDec;
                this.arm1VerticalAngle -= 0.5 * this.angleDec;
            }
        }
        else {
            this.vehicle.isAttached = true;
            //Crane will start to move car
            this.isMovingCar = true;
            this.catchingCarFase++;
        }



    }

    rotatingCraneVToDefault() {
        let angleToRotate = this.arm2angle - this.defaultArm2Angle;
        let abs = Math.abs(angleToRotate);

        //console.log(this.arm1VerticalAngle);
        //console.log(this.defaultArm1VerticalAngle);


        if (abs > 0 && (abs > this.angleDec) || (this.arm1VerticalAngle > this.defaultArm1VerticalAngle)) {
            if (angleToRotate > 0) {
                this.arm2angle -= this.angleDec;
            }
            else {
                this.arm2angle += this.angleDec;
            }

            if (this.arm1VerticalAngle > this.defaultArm1VerticalAngle) {
                console.log("here");
                this.arm1VerticalAngle -= this.angleDec;
            }
        }
        else {
            this.catchingCarVFase = 1;
            this.isCatchingCarV = false;
        }
    }

    /***** ROTATING HORIZONTALLY ******/

    rotatingCraneHToCatch() {
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

    rotatingCraneHToReturnToDefault() {
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


    catchCar(vehicle) {
        if (this.isCatchingCarH)
            this.catchCarH(vehicle);
        if (this.isCatchingCarV)
            this.catchCarV(vehicle);
    }


    /**OTHERS **/
    getCarAngle() {
        let deltaX = this.vehicle.carLocation[0] - this.craneX;
        let deltaY = this.vehicle.carLocation[1] - this.craneZ;
        let angle = Math.atan(deltaX / deltaY);
        let finalAngle = angle - this.arm1HorizontalAngle;

        this.carInitialAngle = this.arm1HorizontalAngle - finalAngle;
    }


    dropCar() {
        console.log("drop");
        this.vehicle.isAttached = false;
        this.vehicle.dropped = true;

        //this.vehicle = null;
    }
};
