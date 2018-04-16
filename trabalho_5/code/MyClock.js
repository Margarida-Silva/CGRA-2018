/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClock extends MyCylinder
{
    constructor(scene)
    {
        super(scene,6,1,false);
        this.top = new MyCylinderTop(scene,6);
        this.clockAppearance = new CGFappearance(scene);
        this.clockAppearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.clockAppearance.setShininess(0.1);
		this.clockAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.clockAppearance.loadTexture("../resources/images/clock.png");
        this.clockAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    display()
    {
        this.scene.pushMatrix();
        this.scene.scale(1,1,0.3);
        super.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.clockAppearance.apply();
        this.scene.translate(0,0,0.3);
        this.top.display();
        this.scene.popMatrix();
    }
}