class MyVehicle extends CGFobject
{
    /* DIMENSOES:
    
    -comprimento: 5
    -largura:2.4
    -altura:2
    -comprimento da base maior do trapezio: 3
    -altura do trapezio: 0.6

    */
    constructor(scene)
    {
        super(scene);
        this.top = new MyVehicleTop(scene);
        this.bottom = new MyVehicleBottom(scene);
        this.quad = new MyQuad(scene,0,1,0,1);
        this.wheel = new MyCylinder(scene, 20, 5, true);
        this.lamp = new MyLamp(scene, 20, 20);
    }

    display()
    {
        let deg2rad = Math.PI / 180.0;

        //top
        this.scene.pushMatrix();
        this.scene.translate(-0.25, 1.4, -1.2);
        this.scene.scale(3 / 7, 0.6, 1);
        this.top.display();
        this.scene.popMatrix();

        //front
        this.scene.pushMatrix();
        this.scene.rotate(-90 * deg2rad, 1, 0, 0);
        this.scene.scale(1.20, 2.4, 1);
        this.scene.translate(((1.2 / 2) / 1.2) + (1.25 / 1.2), 0, 1.4);
        this.quad.display();
        this.scene.rotate(90 * deg2rad, 0, 1, 0);
        this.scene.scale(0.2 / 1.2, 0.2 / 2.4, 0.2);
        this.scene.translate(3, 4.8, 2);
        this.lamp.display();
        this.scene.translate(0, -9.6, 0);
        this.lamp.display();
        this.scene.popMatrix();

        //back
        this.scene.pushMatrix();
        this.scene.rotate(-90 * deg2rad, 1, 0, 0);
        this.scene.scale(0.75, 2.4, 1);
        this.scene.translate(-((0.75 / 2) / 0.75) - (1.75 / 0.75), 0, 1.4);
        this.quad.display();
        this.scene.popMatrix();

        //side front
        this.scene.pushMatrix();
        this.scene.rotate(90 * deg2rad, 0, 1, 0);
        this.scene.scale(2.4, 1, 1);
        this.scene.translate(0, 1.4 - 0.5, 2.45);
        this.quad.display();
        this.scene.popMatrix();


        //side back
        this.scene.pushMatrix();
        this.scene.rotate(-90 * deg2rad, 0, 1, 0);
        this.scene.scale(2.4, 1, 1);
        this.scene.translate(0, 1.4 - 0.5, 2.5);
        this.quad.display();
        this.scene.popMatrix();


        //bottom
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1.2);
        this.bottom.display();
        this.scene.popMatrix();


        //left front wheel
        this.scene.pushMatrix();
        this.scene.translate(1.35, 0.53, -1.2);
        this.scene.rotate(this.steerAngle, 0, 1, 0);
        this.scene.rotate(-this.steerAngleRotation, 0, 0, 1);
        this.scene.rotate(this.wheelsAngleMovement, 0, 0, 1);
        this.scene.scale(0.53, 0.53, 0.3);
        this.wheel.display();
        this.wheel.displayTop();
        this.scene.popMatrix();


        //right front wheel
        this.scene.pushMatrix();
        this.scene.translate(1.35, 0.53, 1.2 - 0.3);
        this.scene.rotate(this.steerAngle, 0, 1, 0);
        this.scene.rotate(-this.steerAngleRotation, 0, 0, 1);
        this.scene.rotate(this.wheelsAngleMovement, 0, 0, 1);
        this.scene.scale(0.53, 0.53, 0.3);
        this.wheel.display();
        this.wheel.displayTop();
        this.scene.popMatrix();

        //right back wheel
        this.scene.pushMatrix();
        this.scene.scale(0.53, 0.53, 0.3);
        this.scene.translate(-1.35 * 2, 1, (1.2 - 0.3) / 0.3);
        this.scene.rotate(-this.steerAngleRotation, 0, 0, 1);
        this.scene.rotate(this.wheelsAngleMovement, 0, 0, 1);
        this.wheel.display();
        this.wheel.displayTop();
        this.scene.popMatrix();

        //left back wheel
        this.scene.pushMatrix();
        this.scene.scale(0.53, 0.53, 0.3);
        this.scene.translate(-1.35 * 2, 1, -1.2 / 0.3);
        this.scene.rotate(-this.steerAngleRotation, 0, 0, 1);
        this.scene.rotate(this.wheelsAngleMovement, 0, 0, 1);
        this.wheel.display();
        this.wheel.displayTop();
        this.scene.popMatrix();
    }
}
