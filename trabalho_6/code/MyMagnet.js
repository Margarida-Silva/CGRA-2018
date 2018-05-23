class MyMagnet extends CGFobject {

    constructor(scene) {
        super(scene);
        this.magnetBlock = new MyCylinder(scene, 20, 20, true);

    };

    display() {
        let deg2rad = Math.PI / 180.0;

        this.scene.pushMatrix();
        this.scene.translate(0, 2, 0);
        this.scene.rotate(90 * deg2rad, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 2);
        this.magnetBlock.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(90 * deg2rad, 1, 0, 0);
        this.magnetBlock.display();
        this.scene.popMatrix();
    }
};