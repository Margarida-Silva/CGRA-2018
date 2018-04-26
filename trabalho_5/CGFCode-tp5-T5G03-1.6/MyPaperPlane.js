/**
 * MyPaperPlane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPaperPlane extends CGFobject {
    constructor(scene, x, y, z) {
        super(scene);
        this.initBuffers();
        this.x = x;
        this.y = y;
        this.z = z;
    };

    initBuffers() {
        this.vertices = [
            0.0, 0.0, 0.0,
            1.5,0.0,0.2,
            1.5,0.0,0.6,
            1.5,0.0,-0.2,
            1.5,0.0,-0.6,
            1.5,-0.5,0.0
        ];

        this.indices = [
            0, 2, 1,
            0, 3, 4,
            0, 5, 3,
            0, 1, 5,

            0, 1, 2,
            0, 4, 3,
            0, 3, 5,
            0, 5, 1
        ];

        this.normals = [
            0, 0, -1,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, -1, 0
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    update(timeStamp) 
    {
        
    }

};
