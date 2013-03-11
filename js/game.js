Game = function() { }

Game.prototype._removeEventListeners = function(event) {
    document.removeEventListener( 'mousemove', this._onDocumentMouseMove, false);
    document.removeEventListener( 'mouseup', this._removeEventListeners, false );
    document.removeEventListener( 'mousout', this._removeEventListeners, false );
}

Game.prototype._onWindowResize = function() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.left = this.width / - 2;
    this.camera.right = this.width / 2;
    this.camera.top = this.height / 2;
    this.camera.bottom = this.height / - 2;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize( this.width, this.height );
}

Game.prototype._onDocumentMouseDown = function(event) {
    event.preventDefault();

    document.addEventListener( 'mousemove', this._onDocumentMouseMove.bind(this), false );
    document.addEventListener( 'mouseup', this._removeEventListeners.bind(this), false );
    document.addEventListener( 'mouseout', this._removeEventListeners.bind(this), false );

    this.mouseXOnMouseDown = event.clientX - this.width / 2;
    this.targetRotationOnMouseDown = this.targetRotation;
}

Game.prototype._onDocumentMouseMove = function(event) {
    var mouseX = event.clientX - this.width / 2;

    this.targetRotation = this.targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
}

Game.prototype._onKeyDown = function(event) {
    if (event.which === 38) {
        this.currentWorld.movePlayer(0);
    }
    if (event.which === 39) {
        this.currentWorld.movePlayer(1);
    }
    if (event.which === 40) {
        this.currentWorld.movePlayer(2);
    }
    if (event.which === 37) {
        this.currentWorld.movePlayer(3);
    }
    
}


Game.prototype.init = function() {
    this.currentWorld = null;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.container = document.createElement( 'div' );
    document.body.appendChild( this.container );

    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera( this.width / - 2, this.width / 2, this.height / 2, this.height / - 2, - 500, 1000 );
    this.camera.position.x = 200;
    this.camera.position.y = 200;
    this.camera.position.z = 200;

    // this.controls = new THREE.TrackballControls( this.camera );

    // this.controls.rotateSpeed = 1.0;
    // this.controls.zoomSpeed = 1.2;
    // this.controls.panSpeed = 0.8;

    // this.controls.staticMoving = false;
    // this.controls.dynamicDampingFactor = 0.3;

    // this.controls.keys = [65, 83, 68];  

    // this.controls.addEventListener( 'change', this.render.bind(this) );

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize( this.width, this.height );
    this.container.appendChild( this.renderer.domElement );

    this.targetRotation = 0;
    this.targetRotationOnMouseDown = 0;
    this.mouseX = 0;
    this.mouseXOnMouseDown = 0;

    // document.addEventListener( 'mousedown', this._onDocumentMouseDown.bind(this), false );

    this.worldMenu = document.createElement( 'div' );
    this.worldMenu.className = 'worldMenu';

    this.pop

    window.addEventListener( 'resize', this._onWindowResize.bind(this) , false );
    window.addEventListener( 'keydown', this._onKeyDown.bind(this));
}

Game.prototype.run = function() {
    this.animate(new Date().getTime());
}

Game.prototype.animate = function() {
    requestAnimationFrame( this.animate.bind(this) );

    this.render();
    
}

Game.prototype.render = function() {
    var timer = Date.now() * 0.0001;

    this.camera.lookAt( this.scene.position );

    this.renderer.render( this.scene, this.camera );
}

Game.prototype.loadWorld = function(url) {
    this.currentWorld = new World(url, this.scene);
}