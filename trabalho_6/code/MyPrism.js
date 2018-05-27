class MyPrism extends CGFobject {

	/**
 	* MyPrism
	* @param gl {WebGLRenderingContext}
	* @param {Number}	slices	Number of sides in the prism
	* @param {Number}	stacks	Number of stories in the prism
	* @param {Boolean}	withTop True if the prism shall have a top and false otherwise
 	* @constructor
 	*/
	constructor(scene, slices, stacks, withTop) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.top = new MyCylinderTop(scene, slices);
		this.withTop = withTop;
		this.initBuffers();
	};

	/**
	 * Method in which the geometry of the prism is defined
	 */
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];	

		let deg2rad = Math.PI / 180.0;
		let sliceAngle = (360.0 / this.slices) * deg2rad;

		for (let i = 0; i < this.slices; i++) {
			let angle1 = i * sliceAngle;
			let x1 = Math.cos(angle1);
			let y1 = Math.sin(angle1);


			let angle2 = (i + 1) * sliceAngle;
			let x2 = Math.cos(angle2);
			let y2 = Math.sin(angle2);


			let midAngle = (angle1 + angle2) / 2.0;
			let normalX = Math.cos(midAngle);
			let normalY = Math.sin(midAngle);
			let unitCoef = 1.0 / Math.sqrt(Math.pow(normalX, 2) + Math.pow(normalY, 2));
			normalX /= unitCoef;
			normalY /= unitCoef;


			for (let j = 0; j < this.stacks; j++) {

				this.vertices.push(x1, y1, (j + 1) * (1.0 / this.stacks));
				this.vertices.push(x1, y1, j * (1.0 / this.stacks));
				this.vertices.push(x2, y2, (j + 1) * (1.0 / this.stacks));
				this.vertices.push(x2, y2, j * (1.0 / this.stacks));

				this.indices.push(4 * j + 4 * this.stacks * i, 4 * j + 4 * this.stacks * i + 1, 4 * j + 4 * this.stacks * i + 2);
				this.indices.push(4 * j + 4 * this.stacks * i + 3, 4 * j + 4 * this.stacks * i + 2, 4 * j + 4 * this.stacks * i + 1);


				this.normals.push(normalX, normalY, 0);
				this.normals.push(normalX, normalY, 0);
				this.normals.push(normalX, normalY, 0);
				this.normals.push(normalX, normalY, 0);
			}

		}
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	/**
	 * Displays the prism's top (if the value withTop is equal to true)
	 */
	displayTop() {
		if (this.withTop) {
			//	prism's bottom and top 

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
		}
	}

	/**
	 * Displays the prism and its top 
	 */
	display() {
		this.drawElements(this.primitiveType);
		this.displayTop();
	}
};
