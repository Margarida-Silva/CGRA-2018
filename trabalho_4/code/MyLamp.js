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
		let sliceAngle2 = (90.0 / this.stacks) * deg2rad;

		this.vertices.push(0, 0, 1);
		this.normals.push(0, 0, 1);

		for (let i = 0; i < this.slices; i++) {
			let angle = i * sliceAngle;
			let x = Math.cos(angle);
			let y = Math.sin(angle);

			let normalX = x;
			let normalY = y;

			this.vertices.push(x, y, 0);
			this.normals.push(normalX, normalY, 1);

			for (let j = 0; j < this.stacks; j++) {

				let angle2 = j * sliceAngle2;

				let x2 = x * Math.cos(angle2);
				let y2 = y * Math.cos(angle2);

				let z = Math.sin(angle2);

				normalX = x2;
				normalY = y2;

				this.vertices.push(x2, y2, z);
				this.normals.push(normalX, normalY, z);

				/*
				if (j == this.stacks-1){
					let base1 = (this.stacks + 1) * (i - 1) + j + 1;
					let base2 = (this.stacks + 1) * i + j + 1;

					this.vertices.push(base1+1, 0, base2+1);
				}
*/
				
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
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
