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

        //ALTIMETRY
        //example for nrDivs = 8 -> grid of 9x9 vertices
        this.altimetry = [
            [-5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0,-5.0, -5.0, -5.0, -2.0, -1.0, -1.0, -1.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -3.0, -3.0, -3.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0,-4.0, -4.0, -3.0, -1.0, -1.0, 3.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -5.0, -5.0, -4.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, -4.0, -5.0, -5.0, -5.0, -3.0,0.0, 0.0, 0.0, 0.0, 3.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -5.0, -4.0, -4.0, -1.0, 11.0, 12.0, 13.0, 0.0, 0.0, 0.0, -2.0, -2.0, -2.0, -1.0,0.0, 0.0, 0.0, 4.0, 4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -5.0, -4.0, 0.0, 10.0, 14.0, 14.0, 12.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 5.0,5.0, 5.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -4.0, -4.0, -3.0, -1.0, 11.0, 12.0, 8.0, 13.0, 12.0, 0.0, 0.0, 0.0, 0.0, 6.0, 5.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -4.0, -4.0, -2.0, 10.0, 11.0, 8.0, 13.0, 10.0, 7.0, 7.0, 6.0, 6.0, 6.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -4.0, -3.0, -2.0, -1.0, 11.0, 12.0, 8.0, 13.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -4.0, -3.0, -3.0, -2.0, 8.0, 13.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -4.0, -3.0, -3.0, -1.0, 0.0, 9.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -4.0, -4.0, 0.0, 9.0, 8.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -5.0, -5.0, 0.0, 6.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -4.0, -3.0, -2.0, -1.0, 5.0, 7.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, 0.0, 0.0, 0.0, 0.0, 5.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [6.0, 4.0, 4.0, 3.0, 5.0, 4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -3.0, -2.0, -1.0, -1.0, 5.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -2.0, -1.0, -1.0, -1.0, 4.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -4.0, -2.0, -2.0, -1.0, 6.0, 4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -4.0, -3.0, -3.0, -1.0, 5.0, 4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-6.0, -5.0, -3.0, -3.0, -1.0, 4.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-6.0, -5.0, -4.0, -4.0, -1.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -4.0, -3.0, -2.0, -1.0, 6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-2.0, -3.0, -2.0, -2.0, -1.0, 7.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [7.0, 6.0, 6.0, 5.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        ];


        this.speed = 0.5;

        this.axis = new CGFaxis(this);
        this.axisState = 0; //off
        this.terrain = new MyTerrain(this, 30, this.altimetry);
        this.vehicle = new MyVehicle(this);
        this.crane = new MyCrane(this);

        //TEXTURAS

        this.vehicleAppearances = [];
        this.vehicleAppearanceList = [];

        let metalAppearance = new CGFappearance(this);
        metalAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        metalAppearance.setShininess(0.1);
        metalAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        metalAppearance.loadTexture("../resources/images/metal.jpg");
        this.vehicleAppearances[0] = metalAppearance;
        this.vehicleAppearanceList[0] = 'Metal';

        let flamesAppearance = new CGFappearance(this);
        flamesAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        flamesAppearance.setShininess(0.1);
        flamesAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        flamesAppearance.loadTexture("../resources/images/flames.jpg");
        flamesAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
        this.vehicleAppearances[1] = flamesAppearance;
        this.vehicleAppearanceList[1] = 'Flames';

        this.currVehicleAppearance = '0';
        this.vehicleAppearance = 'Metal';

        //LUZES
        this.lightsState = {};
        this['light1'] = true;
        this['light2'] = true;
        this['light3'] = true;
        this['light4'] = true;
        this['light5'] = true;
        this['wheels angle'] = 0;

    };

    updateLights() {
        for (var i = 0; i < this.lights.length; i++) {
            if (this['light' + (i + 1)])
                this.lights[i].enable();
            else
                this.lights[i].disable();
            this.lights[i].update();
        }
    }


    initLights() {

        this.setGlobalAmbientLight(0, 0, 0, 0);

        // Positions for four lights
        this.lights[0].setPosition(20.0, 2, 20.0, 1.0);
        this.lights[0].setVisible(true); // show marker on light position (different from enabled)
        this.lights[0].setAmbient(0, 0, 0, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 0, 1.0);
        /*this.lights[0].setConstantAttenuation(0);
		this.lights[0].setLinearAttenuation(1);
		this.lights[0].setQuadraticAttenuation(0);  */
        this.lights[0].enable();

        this.lights[1].setPosition(20.0, 2.0, -20.0, 1.0);
        this.lights[1].setVisible(true);
        this.lights[1].setAmbient(0, 0, 0, 1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].enable();

        this.lights[2].setPosition(-20.0, 2.0, -20.0, 1.0);
        this.lights[2].setVisible(true);
        this.lights[2].setAmbient(0, 0, 0, 1);
        this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
		/*this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1);
		this.lights[2].setQuadraticAttenuation(0);*/
        this.lights[2].enable();

        this.lights[3].setPosition(-20.0, 2.0, 20.0, 1.0);
        this.lights[3].setVisible(true);
        this.lights[3].setAmbient(0, 0, 0, 1);
        this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);
		/*this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(1);*/
        this.lights[3].enable();

        this.lights[4].setPosition(0.0, 40, 10.0, 1.0);
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

    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;
        if (this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            keysPressed = true;
            this.vehicle.update('W', this.speed);
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            this.vehicle.update('S', this.speed);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyA")) {
            text += " A ";
            this.vehicle.update('A', this.speed);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyD")) {
            text += " D ";
            this.vehicle.update('D', this.speed);
            keysPressed = true;
        }
        if (keysPressed)
            console.log(text);
    }

    update(currTime) {
        this.checkKeys();
        this.currVehicleAppearance = this.vehicleAppearanceList.indexOf(this.vehicleAppearance);
    }

    display() {
        this.update();
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
        
        if (this.vehicleAppearances[this.currVehicleAppearance] instanceof CGFappearance)
            this.vehicle.setAppearance(this.vehicleAppearances[this.currVehicleAppearance]);
        this.vehicle.display();
        


        //display crane
        /*
        this.pushMatrix();
        this.translate(10, 1, -10);
        this.crane.display();
        this.popMatrix();
*/
    };

};
