class MyTerrain extends Plane {

    constructor(scene, nrDivs,altimetry) {
        super(scene, 0, 1, 0, 1, nrDivs,altimetry);

        this.appearance = new CGFappearance(scene);
        this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.appearance.setShininess(0.1);
        this.appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.appearance.loadTexture("../resources/images/mountain2.png");
        this.appearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
    };

    display() {
        let deg2rad = Math.PI / 180.0;

        this.scene.pushMatrix();
        this.scene.rotate(-90*deg2rad,1,0,0);
        this.scene.scale(100, 100, 1);
        this.appearance.apply();
        this.drawElements(this.primitiveType);
        this.scene.popMatrix();
    }
};