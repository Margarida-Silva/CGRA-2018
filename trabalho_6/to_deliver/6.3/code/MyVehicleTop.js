class MyVehicleTop extends CGFobject {
    constructor(scene) {
        super(scene);
        this.trapeze = new MyTrapeze(scene);
        this.quad = new Plane(scene, 0, 1, 0, 1,5,null);
    }

    display() {
        let deg2rad = Math.PI / 180.0;
        let trapezeB = 7;
        let trapezeb = 5;
        let trapezeXDivisons = 11;
        let trapezeSide = Math.sqrt(925 / 121); //hypotenuse on the trapeze
        let width = 2.4;
        let angle = Math.atan(22 / 21) -0.049;

        //first trapeze
        this.scene.pushMatrix();
        this.scene.rotate(180*deg2rad,0,1,0);
        this.scene.translate(-trapezeB/2, 0, 0);
        this.trapeze.display();
        this.scene.popMatrix();

        //second trapeze
        this.scene.pushMatrix();
        this.scene.translate(-trapezeB/2,0, width);
        this.trapeze.display();
        this.scene.popMatrix();

        //top
        this.scene.pushMatrix();
        this.scene.rotate(-90 * deg2rad, 1, 0, 0);
        this.scene.scale((trapezeB / trapezeXDivisons) * trapezeb, width, 1);
        this.scene.translate(0, -1.2 / width, 2);
        this.quad.display();
        this.scene.popMatrix();

        //sideview 1 
        this.scene.pushMatrix();
        this.scene.rotate(90 * deg2rad, 0, 1, 0);
        this.scene.translate(-width / 2, 2 - (trapezeSide / 2) + trapezeSide / 2, trapezeB/2 - (3 * (trapezeB / trapezeXDivisons)));
        this.scene.rotate(-angle, 1, 0, 0); //corrigir angulo de rotacao
        this.scene.translate(0, -trapezeSide / 2, 0);
        this.scene.scale(width, trapezeSide, 1);
        this.quad.display();
        this.scene.popMatrix();

        //sideview2
        this.scene.pushMatrix();
        this.scene.rotate(-90 * deg2rad, 0, 1, 0);
        this.scene.translate(width / 2, 2 - (trapezeSide / 2) + trapezeSide / 2, trapezeB/2 - (3 * (trapezeB / trapezeXDivisons)));
        this.scene.rotate(-angle, 1, 0, 0); //corrigir angulo de rotacao
        this.scene.translate(0, -trapezeSide / 2, 0);
        this.scene.scale(width, trapezeSide, 1);
        this.quad.display();
        this.scene.popMatrix();

        //bottom
        this.scene.pushMatrix();
        this.scene.scale(trapezeB,1,width);
        this.scene.rotate(90*deg2rad,1,0,0);
        this.scene.translate(0,(trapezeb/2)/trapezeb,0);
        this.quad.display();
        this.scene.popMatrix();

    }
}