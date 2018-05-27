class MyQuad extends CGFobject {

	/**
 	* MyQuad
	* @param gl {WebGLRenderingContext}
	* @param {Number} minS Min value for the s coordinate of the texture
	* @param {Number} maxS Max value for the s coordinate of the texture
	* @param {Number} minT Min value for the t coordinate of the texture
	* @param {Number} maxT Max value for the t coordinate of the texture
 	* @constructor
 	*/
	constructor(scene, minS, maxS, minT, maxT) {
		super(scene);
		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;
		this.initBuffers();
	};

	/**
	 * Method in which the geometry of the quad is defined
	 */
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0,
			0.5, -0.5, 0,
			-0.5, 0.5, 0,
			0.5, 0.5, 0
		];

		this.indices = [
			0, 1, 2,
			3, 2, 1
		];


		this.normals = [
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1
		];

		this.texCoords = [
			this.minS, this.maxT,
			this.maxS, this.maxT,
			this.minS, this.minT,
			this.maxS, this.minT
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
