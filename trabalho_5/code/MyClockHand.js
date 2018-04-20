/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClockHand extends CGFobject
{
	constructor(scene,length) 
	{
		super(scene);
        this.cube = new MyUnitCubeQuad(scene);

        this.length = length;
        this.angle = 0;

        this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0,0,0,1);
		this.material.setDiffuse(0.5,0.5,0.5,1);
		this.material.setSpecular(0.2,0.2,0.2,1);	
		this.material.setShininess(120);
	};

	display()
	{
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.rotate(this.angle,0,0,1);
        this.scene.scale(0.03,this.length,0.03);
        this.scene.translate(0,1/2,0);
        this.cube.display();	
        this.scene.popMatrix();
    };
    
    setAngle(angle)
    {
        this.deg2rad=Math.PI/180.0;
        this.angle = -angle * this.deg2rad;
    }
};
