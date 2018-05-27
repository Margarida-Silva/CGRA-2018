class MyMirror extends CGFobject {

    /**
    * MyMirror
    * @param gl {WebGLRenderingContext}
    * @constructor
    */
    constructor(scene) {
        super(scene);

         this.arm = new MyCylinder(scene, 20, 20, true);
         this.mirror = new MyCylinder(scene,20,20,true);

    };

    /**
     * Displays the mirror
     */
    display() {
        let deg2rad = Math.PI / 180.0;

        this.scene.pushMatrix();
        this.scene.scale(0.1,0.1,0.3);
        this.arm.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.05,0,0.8);
        this.scene.scale(0.1,0.4,0.6);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.mirror.display();
        this.scene.popMatrix();
    }
};
