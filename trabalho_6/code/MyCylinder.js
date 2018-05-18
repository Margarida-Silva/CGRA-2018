/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks, withTop) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.top = new MyCylinderTop(scene, slices);
		this.withTop = withTop;
		this.initBuffers();
	};

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let deg2rad = Math.PI / 180.0;
		let sliceAngle = (360.0 / this.slices) * deg2rad;
		let dt = 1/this.slices
		let ds = 1/this.stacks;

		var t = 1;


		for (let i = 0; i <= this.slices; i++) {
			let angle = i * sliceAngle;
			let x = Math.cos(angle);
			let y = Math.sin(angle);

			let normalX = Math.cos(angle);
			let normalY = Math.sin(angle);

			var s = 1;

			this.vertices.push(x, y, 0);
			this.normals.push(normalX, normalY, 0);
			this.texCoords.push(s,t);
			
			s-= ds;

			for (let j = 0; j < this.stacks; j++) {
				this.vertices.push(x, y, (j + 1) * (1.0 / this.stacks));
				this.normals.push(normalX, normalY, 0);
				this.texCoords.push(s,t);

				if (i > 0) {
					let base1 = (this.stacks + 1) * (i - 1) + j;
					let base2 = (this.stacks + 1) * i + j;
					this.indices.push(base1 + 1, base1, base2 + 1);
					this.indices.push(base2, base2 + 1, base1);
				}

				if (i == this.slices - 1) {
					let base1 = (this.stacks + 1) * i + j;
					let base2 = j //equivalent to i==0;
					this.indices.push(base1 + 1, base1, base2 + 1);
					this.indices.push(base2, base2 + 1, base1);
				}
				s-= ds;
			}
			t-=dt;
		}/*
		this.vertices.push(1,0,0);
		this.normals.push(1, 0, 0);
		this.texCoords.push(1,0);
		this.vertices.push(1,0,1);
		this.texCoords.push(0,0);*/
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	display() {
		this.drawElements(this.primitiveType);
/*
		if (this.withTop) {
			////// cylinder's bottom and top //////

			let deg2rad = Math.PI / 180.0;

			//bottom
			this.scene.pushMatrix();
			this.scene.rotate(-180 * deg2rad, 1, 0, 0);
			this.top.display();
			this.scene.popMatrix();

			//top
			this.scene.pushMatrix();
			this.scene.translate(0, 0, 1);
			this.top.display();
			this.scene.popMatrix();
		}*/
	}
};
