class MyCylinder extends CGFobject {

	/**
	* MyCylinder
 	* @param gl {WebGLRenderingContext}
 	* @param {Number} slices	Number of sides in the cylinder
 	* @param {Number} stacks	Number of stories in the cylinder
	* @param {Boolean} withTop True if the cylinder shall have a top and false otherwise
	* @param {CGFappearance} topAppearance The appearance to be used in the cylinder's top
 	* @constructor
 	*/
	constructor(scene, slices, stacks, withTop, topAppearance) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.top = new MyCylinderTop(scene, slices);
		this.withTop = withTop;
		this.topAppearance = topAppearance;
		this.initBuffers();
	};

	/**
	 * Method in which the geometry of the cylinder is defined
	 */
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let deg2rad = Math.PI / 180.0;
		let sliceAngle = (360.0 / this.slices) * deg2rad;
		let dt = 1 / this.slices
		let ds = 1 / this.stacks;

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
			this.texCoords.push(s, t);

			s -= ds;

			for (let j = 0; j < this.stacks; j++) {
				this.vertices.push(x, y, (j + 1) * (1.0 / this.stacks));
				this.normals.push(normalX, normalY, 0);
				this.texCoords.push(s, t);

				if (i > 0) {
					let base1 = (this.stacks + 1) * (i - 1) + j;
					let base2 = (this.stacks + 1) * i + j;
					this.indices.push(base1 + 1, base1, base2 + 1);
					this.indices.push(base2, base2 + 1, base1);
				}

				if (i == this.slices - 1) {
					let base1 = (this.stacks + 1) * i + j;
					let base2 = j
					this.indices.push(base1 + 1, base1, base2 + 1);
					this.indices.push(base2, base2 + 1, base1);
				}
				s -= ds;
			}
			t -= dt;
		}
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	/**
	 * Displays the cylinder's top (if the value withTop is equal to true)
	 */
	displayTop() {
		if (this.withTop) {

			//cylinder's bottom and top 

			let deg2rad = Math.PI / 180.0;


			//top
			this.scene.pushMatrix();
			this.scene.translate(0, 0, 1);
			this.top.display();
			this.scene.popMatrix();

			//bottom
			if(this.topAppearance instanceof CGFappearance)
			this.topAppearance.apply();
			this.scene.pushMatrix();
			this.scene.rotate(-180 * deg2rad, 1, 0, 0);
			this.top.display();
			this.scene.popMatrix();
		}
	}

	/**
	 * Displays the cylinder and its top
	 */
	display() {
		this.drawElements(this.primitiveType);
		this.displayTop();
	}
};
