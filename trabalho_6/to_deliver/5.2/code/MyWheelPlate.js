class MyWheelPlate extends CGFobject {

    /**
 	* MyWheelPlate
	* @param gl {WebGLRenderingContext}
 	* @constructor
 	*/
    constructor(scene) {
    super(scene);
    this.height = 1;
    this.slices = 20;
    this.width = 1.75;
    this.initBuffers();
    }

    /**
     * Method in which the geometry of the wheel's plate is defined
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let deg2rad = Math.PI / 180.0;
        let sliceAngle = (140.0 / this.slices) * deg2rad;
        let offsetAngle = 20 * deg2rad;
        let delta_x = this.width / this.slices;
        
        this.vertices.push(0, this.height, 0);
        this.vertices.push(0, (this.height)*1.1*Math.sin(offsetAngle) - 0.4, 0);

        this.normals.push(0, 0, 1);
        this.normals.push(0, 0, 1);
    
        this.texCoords.push(0, 0);
        this.texCoords.push(0, 1);

        for(let i = 1; i <= this.slices; i++){
        
            this.vertices.push(delta_x * i, this.height, 0);
            this.vertices.push(delta_x * i, (this.height)*1.1*Math.sin((sliceAngle*i + offsetAngle)) - 0.4, 0);
            this.texCoords.push((1/this.slices)*i, 0);
            this.texCoords.push((1/this.slices)*i, 1);

            this.indices.push((i-1) *2, (i-1)*2 +1, i*2);
           this.indices.push(i*2 +1, i*2, (i-1) *2 +1);
            this.normals.push(0, 0, 1);
            this.normals.push(0, 0, 1);
        }
   
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    };
}