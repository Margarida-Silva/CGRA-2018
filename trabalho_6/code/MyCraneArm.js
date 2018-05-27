class MyCraneArm extends CGFobject {

        /**
        * MyCraneArm
        * @param gl {WebGLRenderingContext}
        * @constructor
        */
        constructor(scene) {
                super(scene);
                this.arm = new MyCylinder(scene, 4, 20, true);
                this.thickness = 0.3;
        };

        /**
        * Displays the crane's arm
        * @param length {number} length The length of the crane's arm
        */
        display(length) {

                //Arm
                this.scene.pushMatrix();
                this.scene.scale(this.thickness, this.thickness, length);
                this.arm.display();
                this.scene.popMatrix();
        }

};
