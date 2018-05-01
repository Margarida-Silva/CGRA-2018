/**
 * MyPaperPlane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPaperPlane extends CGFobject {
    constructor(scene, x, y, z) {
        super(scene);
        this.x = x;
        this.y = y;
        this.z = z;
        this.initBuffers();
    };

    initBuffers() {
        let x = this.x;
        let y = this.y;
        let z = this.z;

        this.vertices = [
            x, y, z,
            x+1.5,y,z+0.2,
            x+1.5,y,z+0.6,
            x+1.5,y,z-0.2,
            x+1.5,y,z-0.6,
            x+1.5,y-0.5,z
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
       let seconds = Math.floor(timeStamp / 1000);
       // if((seconds % 5) == 0)
            this.x = this.x-1;
    }

};
