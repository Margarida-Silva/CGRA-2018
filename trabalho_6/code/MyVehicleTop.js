class MyVehicleTop extends CGFobject {

    /**
 	* MyVehicleTop
	* @param gl {WebGLRenderingContext}
 	* @constructor
 	*/
    constructor(scene) {
        super(scene);
        this.trapeze = new MyTrapeze(scene);
        this.quad = new Plane(scene, 0, 1, 0, 1, 5, null);

        //Side windows' texture
        this.sideWindowAppearance = new CGFappearance(scene);
        this.sideWindowAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.sideWindowAppearance.setShininess(0.1);
        this.sideWindowAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sideWindowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.sideWindowAppearance.loadTexture("../resources/images/side_window.png");

        //Back and front windows' texture
        this.backFrontWindowAppearance = new CGFappearance(scene);
        this.backFrontWindowAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.backFrontWindowAppearance.setShininess(0.1);
        this.backFrontWindowAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.backFrontWindowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.backFrontWindowAppearance.loadTexture("../resources/images/front_back_window.png");

        //Vehicle's top and bottom's texture
        this.topBottomAppearance = new CGFappearance(scene);
        this.topBottomAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.topBottomAppearance.setShininess(0.1);
        this.topBottomAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.topBottomAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.topBottomAppearance.loadTexture("../resources/images/topBottom.png");


    }

    /**
     * Displays the vehicle's top
     */
    display() {
        let deg2rad = Math.PI / 180.0;
        let trapezeB = 7;
        let trapezeb = 5;
        let trapezeXDivisons = 11;
        let trapezeSide = Math.sqrt(925 / 121); //hypotenuse on the trapeze
        let width = 2.4;
        let angle = Math.atan(22 / 21) - 0.049;

        this.sideWindowAppearance.apply();
        
        //first trapeze
        this.scene.pushMatrix();
        this.scene.rotate(180 * deg2rad, 0, 1, 0);
        this.scene.translate(-trapezeB / 2, 0, 0);
        this.trapeze.display();
        this.scene.popMatrix();

        //second trapeze
        this.scene.pushMatrix();
        this.scene.translate(-trapezeB / 2, 0, width);
        this.trapeze.display();
        this.scene.popMatrix();

        this.topBottomAppearance.apply();

        //top
        this.scene.pushMatrix();
        this.scene.rotate(-90 * deg2rad, 1, 0, 0);
        this.scene.scale((trapezeB / trapezeXDivisons) * trapezeb, width, 1);
        this.scene.translate(0, -1.2 / width, 2);
        this.quad.display();
        this.scene.popMatrix();

        //bottom
        this.scene.pushMatrix();
        this.scene.scale(trapezeB, 1, width);
        this.scene.rotate(90 * deg2rad, 1, 0, 0);
        this.scene.translate(0, (trapezeb / 2) / trapezeb, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.backFrontWindowAppearance.apply();

        //sideview 1 
        this.scene.pushMatrix();
        this.scene.rotate(90 * deg2rad, 0, 1, 0);
        this.scene.translate(-width / 2, 2 - (trapezeSide / 2) + trapezeSide / 2, trapezeB / 2 - (3 * (trapezeB / trapezeXDivisons)));
        this.scene.rotate(-angle, 1, 0, 0); 
        this.scene.translate(0, -trapezeSide / 2, 0);
        this.scene.scale(width, trapezeSide, 1);
        this.quad.display();
        this.scene.popMatrix();

        //sideview2
        this.scene.pushMatrix();
        this.scene.rotate(-90 * deg2rad, 0, 1, 0);
        this.scene.translate(width / 2, 2 - (trapezeSide / 2) + trapezeSide / 2, trapezeB / 2 - (3 * (trapezeB / trapezeXDivisons)));
        this.scene.rotate(-angle, 1, 0, 0); 
        this.scene.translate(0, -trapezeSide / 2, 0);
        this.scene.scale(width, trapezeSide, 1);
        this.quad.display();
        this.scene.popMatrix();
    }
}