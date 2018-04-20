class MyTable extends CGFobject
{
    constructor(scene) 
	{
		super(scene);
		this.tableLeg = new MyTableLeg(this.scene);
		this.tableTop = new MyTableTop(this.scene);
	};
	
	display()
	{
		this.deg2rad=Math.PI/180.0;
	   
		//table's top
		this.scene.pushMatrix();
		this.scene.translate(0,3.5+0.15,0);
		this.tableTop.display();
		this.scene.popMatrix();

		//first leg
		this.scene.pushMatrix();
		this.scene.translate(2.5 - 0.15,1.75,1.5 - 0.15)
		this.tableLeg.display();
		this.scene.popMatrix();
	   
		//second leg
		this.scene.pushMatrix();
		this.scene.translate(2.5 - 0.15,1.75,-1.5 + 0.15);
		this.tableLeg.display();
		this.scene.popMatrix();

		//third leg
		this.scene.pushMatrix();
		this.scene.translate(-2.5 + 0.15,1.75,-1.5 + 0.15);
		this.tableLeg.display();
		this.scene.popMatrix();

		//fourth leg
		this.scene.pushMatrix();
		this.scene.translate(-2.5 + 0.15,1.75,1.5 - 0.15);
		this.tableLeg.display();
		this.scene.popMatrix();


		   
	};

};
