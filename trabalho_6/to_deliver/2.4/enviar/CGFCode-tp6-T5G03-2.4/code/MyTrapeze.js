class MyTrapeze extends CGFobject {
    constructor(scene) {
        super(scene);
        this.x_divisions = 11;
        this.y_divisions = 3;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        /* Generate vertices, indices, normals and textCoors */
        let dx = 7 / this.x_divisions;
        let dy = 2 / this.y_divisions;
        let vertice = 0;

        for (let i = 0; i <= this.y_divisions; i++) {
            for (let j = i * dx; j <= (this.x_divisions * dx - i * dx + 0.2); j += dx) {
                let x = j;
                let y = i * dy;
                let aux = (this.x_divisions + 1) - (2 * i);
                this.vertices.push(x, y, 0);
                this.texCoords.push((1 / 7) * x, (-0.5 * y) + 1);
                let firstXVerticeStep = i * dx;
                let lastXVerticeStep = this.x_divisions * dx - i * dx;
                let penultimateXVerticeStep = lastXVerticeStep - dx;

                if ((j < lastXVerticeStep) && (i != this.y_divisions)) {   //do not insert any indices when rendering the last vertice in a step
                    if (j < penultimateXVerticeStep)  //not the penultimate vertice in a step
                        this.indices.push(vertice, vertice + 1, vertice + aux);
                    else
                        this.indices.push(vertice, vertice + 1, vertice + aux - 1);

                    if (j != firstXVerticeStep && (j < penultimateXVerticeStep))    //not the first nor the penultimate vertice in a step
                        this.indices.push(vertice, vertice + aux, vertice + aux - 1);
                }
                this.normals.push(0, 0, 1);
                vertice++;
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    };
}