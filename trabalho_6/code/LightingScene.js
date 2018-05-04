class LightingScene extends CGFscene {
    constructor() {
        super();
    }


    init(application) {
        super.init(application);

        this.initCameras();

        this.initLights();

        this.enableTextures(true);


        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.obj = new MyVehicle(this);
        this.quad = new MyQuad(this,0,1,0,1);

        //TEXTURA PARA EFEITOS DE TESTE
		this.slidesAppearance = new CGFappearance(this);
		this.slidesAppearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.slidesAppearance.setShininess(0.1);
		this.slidesAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.slidesAppearance.loadTexture("../resources/images/teste.jpg");
        
        this.light1 = true;
        this.light2 = true;
        this.light3 = true;
        this.light4 = true;
        this.speed=3;


    };

    initLights() {

        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

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

    doSomething(){
         console.log("Doing something..."); 
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

        // Draw axis
        this.axis.display();

        this.setDefaultAppearance();

        // ---- END Background, camera and axis setup
        this.obj.display();

    };

};