class LightingScene extends CGFscene {

    /**
    * LightingScene
    * @constructor
    */
    constructor() {
        super();
    }
    //comment
    //comment2
    /**
     * Initialization of the scene to be used
     * @param {CGFapplication} application 
     */
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

        //  altimetry
        this.altimetry = [
            [-5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -2.0, -1.0, -1.0, -1.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -3.0, -3.0, -3.0, -5.0, -5.0, -5.0, -5.0, -5.0, -5.0, -4.0, -4.0, -3.0, -1.0, -1.0, 3.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -5.0, -5.0, -4.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, -4.0, -5.0, -5.0, -5.0, -3.0, 0.0, 0.0, 0.0, 0.0, 3.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -5.0, -4.0, -4.0, -1.0, 11.0, 12.0, 13.0, 0.0, 0.0, 0.0, -2.0, -2.0, -2.0, -1.0, 0.0, 0.0, 0.0, 4.0, 4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -5.0, -4.0, 0.0, 10.0, 14.0, 14.0, 12.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 5.0, 5.0, 5.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -4.0, -4.0, -3.0, -1.0, 11.0, 12.0, 8.0, 13.0, 12.0, 0.0, 0.0, 0.0, 0.0, 6.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -4.0, -4.0, -2.0, 10.0, 11.0, 8.0, 13.0, 10.0, 7.0, 7.0, 6.0, 6.0, 6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -4.0, -3.0, -2.0, -1.0, 11.0, 12.0, 8.0, 13.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -4.0, -3.0, -3.0, -2.0, 8.0, 13.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -4.0, -3.0, -3.0, -1.0, 0.0, 9.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -4.0, -4.0, 0.0, 9.0, 8.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -5.0, -5.0, -5.0, 0.0, 6.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -4.0, -3.0, -2.0, -1.0, 5.0, 7.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, 0.0, 0.0, 0.0, 0.0, 5.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [6.0, 4.0, 4.0, 3.0, 5.0, 4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -3.0, -2.0, -1.0, -1.0, 5.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -2.0, -1.0, -1.0, -1.0, 4.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -4.0, -2.0, -2.0, -1.0, 6.0, 4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -4.0, -3.0, -3.0, -1.0, 5.0, 4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-6.0, -5.0, -3.0, -3.0, -1.0, 4.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-6.0, -5.0, -4.0, -4.0, -1.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-5.0, -4.0, -3.0, -2.0, -1.0, 6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [-2.0, -3.0, -2.0, -2.0, -1.0, 7.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [7.0, 6.0, 6.0, 5.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        ];


        this.speed = 0.5;

        this.axis = new CGFaxis(this);
        this.axisState = 0; //off
        this.terrain = new MyTerrain(this, 30, this.altimetry);
        this.vehicle = new MyVehicle(this);
        this.crane = new MyCrane(this);
        
        this.oldVehicles = [];
        this.oldVehiclesIndex = 0;

        //  textures

        this.vehicleAppearances = [];
        this.vehicleAppearanceList = [];

        let blueAppearance = new CGFappearance(this);
        blueAppearance.setSpecular(0.5, 0.5, 0.5, 1);
        blueAppearance.setShininess(0.1);
        blueAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        blueAppearance.loadTexture("../resources/images/blue.jpg");
        blueAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.vehicleAppearances[0] = blueAppearance;
        this.vehicleAppearanceList[0] = 'Blue';

        let purpleAppearance = new CGFappearance(this);
        purpleAppearance.setSpecular(0.5, 0.5, 0.5, 1);
        purpleAppearance.setShininess(0.1);
        purpleAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        purpleAppearance.loadTexture("../resources/images/purple.jpg");
        purpleAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.vehicleAppearances[1] = purpleAppearance;
        this.vehicleAppearanceList[1] = 'Purple';

        let camouflageAppearance = new CGFappearance(this);
        camouflageAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        camouflageAppearance.setShininess(0.1);
        camouflageAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        camouflageAppearance.loadTexture("../resources/images/camouflage.jpg");
        camouflageAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.vehicleAppearances[2] = camouflageAppearance;
        this.vehicleAppearanceList[2] = 'Camouflage';

        this.currVehicleAppearance = '2';
        this.vehicleAppearance = 'Camouflage';

        //  lights

        this.lightsState = {};
        this['light1'] = true;
        this['light2'] = true;
        this['light3'] = true;
        this['light4'] = true;
        this['light5'] = true;
        this['wheels angle'] = 0;

        //  update scene
        this.setUpdatePeriod(5);

    };

    /**
     * Initialization of the scene's lights' properties
     */
    initLights() {

        this.setGlobalAmbientLight(0, 0, 0, 0);

        this.lights[0].setPosition(20.0, 2, 20.0, 1.0);
        this.lights[0].setVisible(true); // show marker on light position (different from enabled)
        this.lights[0].setAmbient(0, 0, 0, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 0.5, 0, 1.0);
        this.lights[0].setConstantAttenuation(0.5);
        this.lights[0].setLinearAttenuation(0);
        this.lights[0].setQuadraticAttenuation(0);
        this.lights[0].enable();

        this.lights[1].setPosition(20.0, 2.0, -20.0, 1.0);
        this.lights[1].setVisible(true);
        this.lights[1].setAmbient(0, 0, 0, 1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setConstantAttenuation(0.2);
        this.lights[1].setLinearAttenuation(0);
        this.lights[1].setQuadraticAttenuation(0);
        this.lights[1].enable();

        this.lights[2].setPosition(-30.0, 20.0, -30.0, 1.0);
        this.lights[2].setVisible(true);
        this.lights[2].setAmbient(0, 0, 0, 1);
        this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setSpecular(1.0, 1.0, 0.5, 1.0);
        this.lights[2].setConstantAttenuation(0.9);
        this.lights[2].setLinearAttenuation(0);
        this.lights[2].setQuadraticAttenuation(0);
        this.lights[2].enable();

        this.lights[3].setPosition(-20.0, 2.0, 20.0, 1.0);
        this.lights[3].setVisible(true);
        this.lights[3].setAmbient(0, 0, 0, 1);
        this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);
        this.lights[3].setConstantAttenuation(0);
        this.lights[3].setLinearAttenuation(0.1);
        this.lights[3].setQuadraticAttenuation(0);
        this.lights[3].enable();

        this.lights[4].setPosition(0.0, 10, 0.0, 1.0);
        this.lights[4].setVisible(true);
        this.lights[4].setAmbient(0, 0, 0, 1);
        this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[4].setSpecular(1.0, 1.0, 0, 1.0);
        this.lights[4].setConstantAttenuation(0);
        this.lights[4].setLinearAttenuation(0.2);
        this.lights[4].setQuadraticAttenuation(0);
        this.lights[4].enable();

    };

    /**
     * Initialization of the scene's camera
     */
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    };

    /**
     * Configuration of the scene's default appearance
     */
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    };

    /**
     * Change the axis display state: on/off
     */
    axisControl() {
        this.axisState = !this.axisState;
    };

    /**
     * Update the vehicle's state or/and the crane's state based on user input
     */
    checkKeys() {
        var keysPressed = false;
        if (!this.crane.isMovingCar) {
            if (this.gui.isKeyPressed("KeyW")) {
                keysPressed = true;
                this.vehicle.update('W', this.speed);
            }
            if (this.gui.isKeyPressed("KeyS")) {
                this.vehicle.update('S', this.speed);
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyA")) {
                this.vehicle.update('A', this.speed);
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyD")) {
                this.vehicle.update('D', this.speed);
                keysPressed = true;
            }
        }
    }

    /**
     * Update the vehicle's appearance based on the interface's current selection
     */
    inputHandle() {
        this.checkKeys();
        this.currVehicleAppearance = this.vehicleAppearanceList.indexOf(this.vehicleAppearance);
    }

    /**
     * Display of the scene's elements: axis (when on), terrain, crane, vehicle, lights
     */
    display() {
        this.inputHandle();
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
        let textString = '';
        switch (this.currVehicleAppearance) {
            case 0:
                textString = 'BLUE';
                break;
            case 1:
                textString = 'PURPLE';
                break;
            case 2:
                textString = 'CAMOUFLAGE';
                break;
            default:
                break;
        }

        //  Update the vehicle's appearance
        if (this.vehicleAppearances[this.currVehicleAppearance] instanceof CGFappearance)
            this.vehicle.setAppearance(this.vehicleAppearances[this.currVehicleAppearance], textString);

        this.vehicle.display();

        for (let i = 0; i < this.oldVehiclesIndex; i++) {
            this.oldVehicles[i].setAppearance(this.vehicleAppearances[this.currVehicleAppearance], textString);
            this.oldVehicles[i].display();
        }

        //display crane
        this.crane.display();
    };

    /**
     * Updates some of the scene's elements: vehicles, crane
     * @param {Number} currTime The current time in milliseconds
     */
    update(currTime) {
        if (this.vehicle.dropped) {

            let newVehicle = new MyVehicle(this);
            newVehicle.carLocation[0] = this.vehicle.carLocation[0];
            newVehicle.carLocation[1] = this.vehicle.carLocation[1];
            newVehicle.z = this.vehicle.z;
            newVehicle.steerAngle = this.vehicle.steerAngle;

            this.oldVehicles.push(newVehicle);
            this.oldVehiclesIndex++;

            this.vehicle = new MyVehicle(this);
        }

        for(let i = 0; i < this.oldVehiclesIndex; i++){
            if ((this.oldVehicles[i].z) >= i*(this.vehicle.height + 0.5)){
                this.oldVehicles[i].z -= 0.1;
            }
        }

        this.updateVehicleLight();
        this.crane.update(currTime, this.vehicle);
    }

    /**
     * Updates the position of the light which is following the vehicle
     */
    updateVehicleLight() {
        let vehiclePos = this.vehicle.getPosition();
        if (vehiclePos instanceof Array)
            this.lights[4].setPosition(vehiclePos[0], 5, -vehiclePos[1], 1.0);
    }

    /**
     * Updates the state of the lights in the scene (enabled/disabled) based on the interface's current properties
     */
    updateLights() {
        for (var i = 0; i < this.lights.length; i++) {
            if (this['light' + (i + 1)])
                this.lights[i].enable();
            else
                this.lights[i].disable();
            this.lights[i].update();
        }
    }

};
