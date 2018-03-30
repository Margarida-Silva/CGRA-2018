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


		this.tableAppearance = new CGFappearance(scene);
		this.tableAppearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.tableAppearance.setShininess(0.1);
		this.tableAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
		this.tableAppearance.loadTexture("../resources/images/table.png");

	};
	
	display()
	{   

		this.tableAppearance.apply();
	   	this.scene.pushMatrix();
	  	this.scene.scale(5,0.3,3);
       	this.cube.display();
       	this.scene.popMatrix();
	};

};