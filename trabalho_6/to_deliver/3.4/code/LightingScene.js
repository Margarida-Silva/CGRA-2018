class LightingScene extends CGFscene {
    constructor() {
        super();
    }


    init(application) {
        super.init(application);

        this.initCameras();

        this.initLights();

        this.enableTextures(true);

        this.gl.clearColor(0.0, 0.5, 1.0, 1.0); //background color
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.axisState = 0; //off
        this.terrain = new MyTerrain(this, 50);
        this.vehicle = new MyVehicle(this);

        //TEXTURA PARA EFEITOS DE TESTE
        this.slidesAppearance = new CGFappearance(this);
        this.slidesAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.slidesAppearance.setShininess(0.1);
        this.slidesAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.slidesAppearance.loadTexture("../re    urces/images/grass.png");

        this.lightsState = {};
        this['light1'] = true;
        this['light2'] =true;
        this['light3'] = true;
        this['light4'] = true;
        this['light5'] = true;

        this.speed = 3;

    };

    updateLights() {
        for (var i = 0; i < this.lights.length; i++) {
             if (this['light' + (i+1)])
                 this.lights[i].enable();
             else
                 this.lights[i].disable();
            this.lights[i].update();
        }
    }


    initLights() {

        this.setGlobalAmbientLight(0, 0, 0, 0);

        // Positions for four lights
        this.lights[0].setPosition(10.0, 2, 10.0, 1.0);
        this.lights[0].setVisible(true); // show marker on light position (different from enabled)
        this.lights[0].setAmbient(0, 0, 0, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 0, 1.0);
        /*this.lights[0].setConstantAttenuation(0);
		this.lights[0].setLinearAttenuation(1);
		this.lights[0].setQuadraticAttenuation(0);  */
        this.lights[0].enable();

        this.lights[1].setPosition(10.0, 2.0, -10.0, 1.0);
        this.lights[1].setVisible(true);
        this.lights[1].setAmbient(0, 0, 0, 1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].enable();

        this.lights[2].setPosition(-10.0, 2.0, -10.0, 1.0);
        this.lights[2].setVisible(true);
        this.lights[2].setAmbient(0, 0, 0, 1);
        this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
		/*this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1);
		this.lights[2].setQuadraticAttenuation(0);*/
        this.lights[2].enable();

        this.lights[3].setPosition(-10.0, 2.0, 10.0, 1.0);
        this.lights[3].setVisible(true);
        this.lights[3].setAmbient(0, 0, 0, 1);
        this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);
		/*this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(1);*/
        this.lights[3].enable();

        this.lights[4].setPosition(0.0, 5, 0.0, 1.0);
        this.lights[4].setVisible(true);
        this.lights[4].setAmbient(0, 0, 0, 1);
        this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[4].setSpecular(1.0, 1.0, 0, 1.0);
		/*this.lights[4].setConstantAttenuation(0);
		this.lights[4].setLinearAttenuation(0);
		this.lights[4].setQuadraticAttenuation(1);*/
        this.lights[4].enable();

    };

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    };

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    };

    axisControl() {
        this.axisState = !this.axisState;
    };

    display() {
        let deg2rad = Math.PI / 180.0;

        // ---- BEGIN Background, camera and axis setup

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Update all lights used
        this.updateLights();

        //Draw axis
        if (this.axisState) this.axis.display();

        // ---- END Background, camera and axis setup

        //display terrain
        this.terrain.display();

        //display vehicle
        this.setDefaultAppearance();    
        this.vehicle.display();

    };

};