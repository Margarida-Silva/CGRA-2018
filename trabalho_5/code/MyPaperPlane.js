/**
 * MyPaperPlane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPaperPlane extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    };

    initBuffers() {
        this.vertices = [
            0.0, 0.0, 0.0,
            0.2, 0.0, 1.5,
            0.6, 0.0, 1.5,
            -0.2, 0.0, 1.5,
            -0.6, 0.0, 1.5,
            0.0, -0.5, 1.5
        ];

        this.indices = [
            0, 2, 1,
            0, 3, 4,
            0, 5, 3,
            0, 1, 5,

            0,1,2,
            0,4,3,
            0,3,5,
            0,5,1
        ];

        this.normals =[
            0,0,-1,
            0,1,0,
            0,1,0,
            0,1,0,
            0,1,0,
            0,-1,0
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();

    }

};
