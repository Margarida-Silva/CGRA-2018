/**
 * MyCrane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCraneArm extends CGFobject {
	constructor(scene) {
        super(scene);
        this.arm = new MyPrism(scene, 4, 20, true);
        this.thickness = 0.3;
        this.arm = new MyCylinder(scene, 4, 20, true);
	};

	

display(length) {

display() {
        //Arm
        this.scene.pushMatrix();
        this.scene.scale(this.thickness, this.thickness, length);
        this.arm.display();
        this.scene.popMatrix();
    }

};
