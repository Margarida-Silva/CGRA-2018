class MyMirror extends CGFobject {

    /**
    * MyMirror
    * @param gl {WebGLRenderingContext}
    * @constructor
    */
    constructor(scene) {
        super(scene);

         //Texture
         this.mirrorAppearance = new CGFappearance(scene);
         this.mirrorAppearance.setSpecular(0.1, 0.1, 0.1, 1);
         this.mirrorAppearance.setShininess(0.1);
         this.mirrorAppearance.setDiffuse(0.3, 0.3, 0.3, 1);
         this.mirrorAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
         this.mirrorAppearance.loadTexture("../resources/images/mirror.png");

         this.metalAppearance = new CGFappearance(scene);
         this.metalAppearance.setSpecular(0.9, 0.9, 0.9, 1);
         this.metalAppearance.setShininess(0.1);
         this.metalAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
         this.metalAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
         this.metalAppearance.loadTexture("../resources/images/magnet.jpg");

         this.arm = new MyCylinder(scene, 20, 20, true);
         this.mirror = new MyCylinder(scene,20,20,true, this.mirrorAppearance);

         this.height = 3;

    };

    /**
     * Displays the mirror
     */
    display() {
        let deg2rad = Math.PI / 180.0;

        this.metalAppearance.apply();

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