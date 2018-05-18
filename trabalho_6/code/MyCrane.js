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
        this.arm1angle = 90;
        this.angle1 = 0;
        this.arm2angle = 30;
        this.angle2 = 0;
	};

	

	display() {

        let deg2rad = Math.PI / 180.0;

        //Base
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(90*deg2rad, 1, 0, 0);
        this.base.display();
        this.scene.popMatrix();


        //Arm1
        this.scene.pushMatrix();
        this.scene.rotate(this.arm1angle * deg2rad, 1, 0, 0);
        this.scene.rotate(this.angle1, 1, 0, 0);
        this.scene.translate(0, 0, -5);
        this.arm.display();
        this.scene.popMatrix();

        //Articulation
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(90*deg2rad, 0, 1, 0);
        this.scene.translate(0, 10, -0.5);
        this.base.display();
        this.scene.popMatrix();
    }
    
    setArm1Angle(angle){
        let deg2rad = Math.PI / 180.0;
        this.angle1 = -angle * deg2rad;
    }
};
