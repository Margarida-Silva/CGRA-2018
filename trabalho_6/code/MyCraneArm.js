/**
 * MyCrane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCraneArm extends CGFobject {
	constructor(scene) {
        super(scene);
        this.arm = new MyCylinder(scene, 4, 20, true);
	};

	

display() {
        //Arm
        this.scene.pushMatrix();
        this.scene.scale(0.3, 0.3, 5);
        this.arm.display();
        this.scene.popMatrix();
    }

};
