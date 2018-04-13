/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
{
	constructor(scene, slices, stacks) 
	{
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [];
		this.indices = [];
		this.normals = [];

		let deg2rad = Math.PI/180.0;
		let sliceAngle = (360.0 / this.slices) * deg2rad;

		for( let i = 0; i < this.slices; i++)
		{
			let angle1 = i * sliceAngle;
			let x1 = Math.cos(angle1);
			let y1 = Math.sin(angle1);
			
			

			let angle2 = (i + 1 ) * sliceAngle;
			let x2 = Math.cos(angle2);
			let y2 = Math.sin(angle2);


			let midAngle = (angle1 + angle2)/2.0;
			let normalX = Math.cos(midAngle);
			let normalY = Math.sin(midAngle);
			let unitCoef = 1.0/ Math.sqrt( Math.pow(normalX, 2) + Math.pow(normalY, 2));
			normalX /= unitCoef;
			normalY /= unitCoef;

			
			for (let j = 0; j < this.stacks; j++){
				
				this.vertices.push(x1, y1, (j+1) * (1.0/this.stacks));
				this.vertices.push(x1, y1, j * (1.0/this.stacks));
				this.vertices.push(x2, y2, (j+1) * (1.0/this.stacks));
				this.vertices.push(x2, y2, j * (1.0/this.stacks));
			

			// O PROBLEMA ESTÁ NOS ÍNDICES

			this.indices.push(4*j + 4*this.stacks*i,4*j + 4*this.stacks*i+ 1,4*j + 4*this.stacks*i+2);
			this.indices.push(4*j + 4*this.stacks*i + 3, 4*j + 4*this.stacks*i + 2, 4*j + 4*this.stacks*i+ 1 );


			this.normals.push(normalX, normalY, 0);
			this.normals.push(normalX, normalY, 0);
			this.normals.push(normalX, normalY, 0);
			this.normals.push(normalX, normalY, 0);
			}
		
		}
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
