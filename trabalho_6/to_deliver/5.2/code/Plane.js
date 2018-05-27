/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class Plane extends CGFobject {

	/**
 	* Plane
	* @param gl {WebGLRenderingContext}
	* @param {Number} minS Min value for the s coordinate of the texture
	* @param {Number} maxS Max value for the s coordinate of the texture
	* @param {Number} minT Min value for the t coordinate of the texture
	* @param {Number} maxT Max value for the t coordinate of the texture
	* @param {Number} nrDivs Number of divisions along the x and y axis
	* @param {Array} altimetry A multidimensonal array representing the z values of each vertice in the plane. If no altimetry is provided then the z values will all be equal to 0.
 	* @constructor
 	*/
	constructor(scene, minS, maxS, minT, maxT, nrDivs, altimetry) {
		super(scene);

		this.altimetry = altimetry;

		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;

		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;

		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;

		this.initBuffers();
	};

	/**
	 * Method in which the geometry of the plane is defined
	 */
	initBuffers() {
		/* example for nrDivs = 3 :
		(numbers represent index of point in vertices array)

				y
				^
				|
		0    1  |  2    3
				|
		4	 5	|  6    7
		--------|--------------> x
		8    9  |  10  11
				|
		12  13  |  14  15    

		*/

		// Generate vertices and normals 
		this.vertices = [];
		this.normals = [];

		// Uncomment below to init texCoords
		this.texCoords = [];

		var yCoord = 0.5;

		let s = this.minS;
		let t = this.minT;
		let sLength = (this.maxS - this.minS) / this.nrDivs;
		let tLength = (this.maxT - this.minT) / this.nrDivs;

		for (var j = 0; j <= this.nrDivs; j++) {
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++) {

				if (this.altimetry instanceof Array)
					this.vertices.push(xCoord, yCoord, this.altimetry[i][j]);
				else
					this.vertices.push(xCoord, yCoord, 0);
		

				// As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
				// So all the vertices will have the same normal, (0, 0, 1).

				this.normals.push(0,0,1);

				// texCoords should be computed here; uncomment and fill the blanks
				this.texCoords.push(s, t);

				s += sLength;
				xCoord += this.patchLength;
			}
			t += tLength;
			s = this.minS;
			yCoord -= this.patchLength;

		}

		// Generating indices
		/* for nrDivs = 3 output will be 
			[
				 0,  4, 1,  5,  2,  6,  3,  7, 
					7,  4,
				 4,  8, 5,  9,  6, 10,  7, 11,
				   11,  8,
				 8, 12, 9, 13, 10, 14, 11, 15,
			]
		Interpreting this index list as a TRIANGLE_STRIP will draw rows of the plane (with degenerate triangles in between. */

		this.indices = [];
		var ind = 0;


		for (var j = 0; j < this.nrDivs; j++) {
			for (var i = 0; i <= this.nrDivs; i++) {
				this.indices.push(ind);
				this.indices.push(ind + this.nrDivs + 1);

				ind++;
			}
			if (j + 1 < this.nrDivs) {
				// Extra vertices to create degenerate triangles so that the strip can wrap on the next row
				// degenerate triangles will not generate fragments
				this.indices.push(ind + this.nrDivs);
				this.indices.push(ind);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;

		/* Alternative with TRIANGLES instead of TRIANGLE_STRIP. More indices, but no degenerate triangles */
		/*
			for (var j = 0; j < this.nrDivs; j++) 
			{
				for (var i = 0; i < this.nrDivs; i++) 
				{
					this.indices.push(ind, ind+this.nrDivs+1, ind+1);
					this.indices.push(ind+1, ind+this.nrDivs+1, ind+this.nrDivs+2 );
	
					ind++;
				}
				ind++;
			}
	
			this.primitiveType = this.scene.gl.TRIANGLES;
		*/

		this.initGLBuffers();
	};

};