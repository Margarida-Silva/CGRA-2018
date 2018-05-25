/**
 * MyCrane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCraneArm extends CGFobject {
	constructor(scene) {
        super(scene);
<<<<<<< HEAD
        this.arm = new MyPrism(scene, 4, 20, true);
        this.thickness = 0.3;
=======
        this.arm = new MyCylinder(scene, 4, 20, true);
>>>>>>> 8794d0c1ad33fc06655d0f150d568dbcd09009a5
	};

	

<<<<<<< HEAD
display(length) {

=======
display() {
>>>>>>> 8794d0c1ad33fc06655d0f150d568dbcd09009a5
        //Arm
        this.scene.pushMatrix();
        this.scene.scale(this.thickness, this.thickness, length);
        this.arm.display();
        this.scene.popMatrix();
    }

};
