class MyTableLeg extends CGFobject
{
    constructor(scene) 
	{
		super(scene);
		this.cube = new MyUnitCubeQuad(this.scene);
		this.cube.initBuffers();
		
		this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.3,0.3,0.3,1);
		this.material.setDiffuse(0.75,0.75,0.75,1);
		this.material.setSpecular(0.8,0.8,0.8,1);	
		this.material.setShininess(120);
	};
	
	display()
	{    
		this.material.apply();
		
	   	this.scene.pushMatrix();
	   	this.scene.scale(0.3,3.5,0.3);
       	this.cube.display();
       	this.scene.popMatrix();
	};

};