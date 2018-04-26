/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClock extends MyCylinder {
    constructor(scene) {
        super(scene, 12, 1, false);
        this.top = new MyCylinderTop(scene, 12);
        this.h = new MyClockHand(scene, 0.4);
        this.m = new MyClockHand(scene, 0.6);
        this.s = new MyClockHand(scene, 0.85);

        this.clockAppearance = new CGFappearance(scene);
        this.clockAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.clockAppearance.setShininess(0.1);
        this.clockAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.clockAppearance.loadTexture("../resources/images/clock.png");
        this.clockAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 0.3);
        super.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.clockAppearance.apply();
        this.scene.translate(0, 0, 0.3);
        this.top.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.3);
        this.h.display();
        this.m.display();
        this.s.display();
        this.scene.popMatrix();
    }

    update(timeStamp) {
        let seconds = Math.floor(timeStamp / 1000) % 60;
        //para mostrar segundo a segundo:  usar Math.floor(timeStamp/1000)%60
        let minutes = ((timeStamp / 1000)/60)%60;
        let hours = (((timeStamp / 1000)/60)/60)%12;

        this.s.setAngle(seconds * (360 / 60));
        this.m.setAngle(minutes * (360 / 60));
        this.h.setAngle(hours * (360/12));
    }
}