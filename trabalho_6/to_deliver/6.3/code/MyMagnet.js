class MyMagnet extends CGFobject {

    /**
    * MyMagnet
    * @param gl {WebGLRenderingContext}
    * @constructor
    */
    constructor(scene) {
        super(scene);
        this.magnetBlock = new MyCylinder(scene, 20, 20, true);

         //Texture
         this.magnetAppearance = new CGFappearance(scene);
         this.magnetAppearance.setSpecular(0.1, 0.1, 0.1, 1);
         this.magnetAppearance.setShininess(0.1);
         this.magnetAppearance.setDiffuse(0.3, 0.3, 0.3, 1);
         this.magnetAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
         this.magnetAppearance.loadTexture("../resources/images/magnet.jpg");

         this.height = 3.5;

    };

    /**
     * Displays the magnet
     */
    display() {
        let deg2rad = Math.PI / 180.0;

        this.scene.pushMatrix();
        this.scene.translate(0, -2, 0);

        this.scene.pushMatrix();
        this.scene.translate(0, 2, 0);
        this.scene.rotate(90 * deg2rad, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 2);
        this.magnetBlock.display();
        this.scene.popMatrix();
        
        this.magnetAppearance.apply();

        this.scene.pushMatrix();
        this.scene.rotate(90 * deg2rad, 1, 0, 0);
        this.magnetBlock.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
};