/**
 * MyCylinderTop
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinderTop extends CGFobject
{
	constructor(scene, slices) 
	{
		super(scene);
		this.slices = slices;
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let deg2rad = Math.PI / 180.0;
		let sliceAngle = (360.0 / this.slices) * deg2rad;

        this.vertices.push(0, 0, 0);
		this.normals.push(0,0,0);
		this.texCoords.push(0,0);

		for (let i = 0; i <= this.slices; i++) {
			let angle = i * sliceAngle;
			let x = Math.cos(angle);
			let y = Math.sin(angle);
			this.vertices.push(x, y, 0);
			this.normals.push(x, y, 0);
			this.texCoords.push((x+1)/2,((1-y)/2));
			this.indices.push(0, i+1, (i + 2));
        }
        this.vertices.push(0,0,0);
		this.normals.push(0,0,0);
		this.texCoords.push(0,0);
		

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
