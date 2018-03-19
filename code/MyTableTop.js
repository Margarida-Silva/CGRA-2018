class MyTableTop extends CGFobject
{
    constructor(scene) 
	{
		super(scene);
		this.cube = new MyUnitCubeQuad(this.scene);
		this.cube.initBuffers();
		
		this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.3,0.3,0.3,1);
		this.material.setDiffuse(0.55,0.27,0.07,1);
		this.material.setSpecular(0.2,0.2,0.2,1);	
		this.material.setShininess(120);
	};
	
	display()
	{    
		
		this.material.apply();
		
	   	this.scene.pushMatrix();
	  	this.scene.scale(5,0.3,3);
       	this.cube.display();
       	this.scene.popMatrix();
	};

};