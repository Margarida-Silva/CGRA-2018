/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyLamp extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	};

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];

		let deg2rad = Math.PI / 180.0;
		let sliceAngle = (360.0 / this.slices) * deg2rad;
		let stackAngle = (90.0 / this.stacks) * deg2rad;

		this.vertices.push(0, 0, 1);
		this.normals.push(0, 0, 1);

		for (let i = 0; i < this.slices; i++) {
			let angle = i * sliceAngle;
			let x = Math.cos(angle);
			let y = Math.sin(angle);

			this.vertices.push(x, y, 0);
			this.normals.push(x, y, 0);


			for (let j = 0; j < this.stacks; j++) {

				let angle2 = (j+1) * stackAngle;

				let x2 = x * Math.cos(angle2);
				let y2 = y * Math.cos(angle2);

				let z = Math.sin(angle2);

				this.vertices.push(x2, y2, z);
				this.normals.push(x2, y2, z);

				if (i > 0) {
					let base1 = (this.stacks + 1) * (i - 1) + j + 1;
					let base2 = (this.stacks + 1) * i + j + 1;
					this.indices.push(base1 + 1, base1, base2 + 1);
					this.indices.push(base2, base2 + 1, base1);
				}

				if (i == this.slices - 1) {
					let base1 = (this.stacks + 1) * i + j + 1;
					let base2 = j + 1 //equivalent to i==0;
					this.indices.push(base1 + 1, base1, base2 + 1);
					this.indices.push(base2, base2 + 1, base1);
				}

		}

		//top
		if (i != this.slices -1)
		this.indices.push((i+1)*this.stacks, (i+2) * this.stacks, 0);
		else 
		this.indices.push((i+1) * this.stacks, this.stacks, 0);
		
	}
		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};