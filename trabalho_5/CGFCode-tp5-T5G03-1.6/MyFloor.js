class MyFloor extends CGFobject {

    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene,0,10,0,12);
        
        this.floorAppearance = new CGFappearance(scene);
        this.floorAppearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.floorAppearance.setShininess(0.1);
		this.floorAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.floorAppearance.loadTexture("../resources/images/floor.png");
        this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT');

    };

    display() {
        this.floorAppearance.apply();
        var degToRad = Math.PI / 180.0;

        this.scene.pushMatrix();
        this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.scene.scale(15, 15, 0.2);
        this.quad.display();
        this.scene.popMatrix();
    }
}