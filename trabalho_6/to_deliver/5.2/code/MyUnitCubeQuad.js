class MyUnitCubeQuad extends CGFobject {
    /**
 	* MyUnitCubeQuad
	* @param gl {WebGLRenderingContext}
 	* @constructor
 	*/
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene, 0, 1, 0, 1);
    };

    /**
     * Displays the cube
     */
    display() {
        this.deg2rad = Math.PI / 180.0;
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(180 * this.deg2rad, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.rotate(-90 * this.deg2rad, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(90 * this.deg2rad, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-90 * this.deg2rad, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(90 * this.deg2rad, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();
    };

};
