/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
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

		for( let i = 0; i < this.slices  ; i++)
		{
			let angle = i * sliceAngle;
			let x = Math.cos(angle);
			let y = Math.sin(angle);
			
			let normalX = Math.cos(angle);
			let normalY = Math.sin(angle);
			
			this.vertices.push(x, y, 0);
			this.normals.push(normalX, normalY, 0);

			for (let j = 0; j < this.stacks; j++){
			this.vertices.push(x, y, (j+1) * (1.0/this.stacks));
			this.normals.push(normalX, normalY, 0);

			if (i > 0){
			let base1 = (this.stacks+1)*(i-1) + j;
			let base2 = (this.stacks+1)*i + j;
			this.indices.push(base1+1, base1, base2+1);
			this.indices.push(base2, base2 +1, base1);
			}
			
			if (i == this.slices - 1){
			let base1 = (this.stacks+1)*i + j;
			let base2 = j //equivalent to i==0;
			this.indices.push(base1 +1, base1, base2 + 1);
			this.indices.push(base2, base2+1, base1);
			
			}
			
			}
		}
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
