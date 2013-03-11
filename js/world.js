World = function(url, scene) {
    if (typeof url !== 'undefined') {
        this.loadFromURL(url, scene);
    }

    this.objects = [];
    this.playerX = 0;
    this.playerY = 0;
}

World.prototype.loadFromURL = function(url, scene) {
    _this = this;
    $.getJSON(url, function(data) {
        _this._buildWorldFromJSON(data);
    }).success(function() {
        _this.setupWorld(scene);
    });
}

World.prototype.setupWorld = function(scene) {

    this.scale = 50;

    // var geometry = new THREE.Geometry();

    // for (var i = 0; i <= this.size.x; i++) {
    //     geometry.vertices.push( new THREE.Vector3( 0, 0, i * this.scale ) );
    //     geometry.vertices.push( new THREE.Vector3( this.size.y * this.scale, 0, i * this.scale ) );
    // }

    // for (var j = 0; i <= this.size.y; j++) {
    //     geometry.vertices.push( new THREE.Vector3( i * this.scale, 0, 0 ) );
    //     geometry.vertices.push( new THREE.Vector3( i * this.scale, 0, this.size.x * this.scale ) );
    // }

    // var material = new THREE.LineBasicMaterial( {color: 0x000000, opacity: 0.2 } );

    // var line = new THREE.Line( geometry, material );
    // line.type = THREE.LinePieces;

    // scene.add( line );

    var grass = THREE.ImageUtils.loadTexture( 'textures/grass.png' );
    grass.wrapT = grass.wrapS = THREE.RepeatWrapping;

    var map = THREE.ImageUtils.loadTexture('textures/crate.gif'); 

    var material = new THREE.SpriteMaterial({
        map: map,
        useScreenCoordinates: false,
        color: 0xffffff,
        fog: true
    });

    this.player = new THREE.Sprite(material);

    var x = this.playerX + Math.floor(this.size.x / 2);
    var y = this.playerY + Math.floor(this.size.y / 2);

    this.player.position.set(-25+this.playerX*50, 50*this.tiles[y][x]+20, -25+this.playerY*50);
    this.player.scale.set(1/20, 1/20, 1/20);
    
    var geometry = new THREE.CubeGeometry( 50, 50, 50 );
    var material = new THREE.MeshBasicMaterial( { map: grass, wireframe: false } );

    for ( var i = 0; i < this.size.x; i ++ ) {
        for (var j = 0; j < this.size.y; j++) {
            var cube = new THREE.Mesh( geometry, material );
            cube.scale.y = this.tiles[i][j];

            cube.position.x = this.scale * i - this.size.x * this.scale / 2;
            cube.position.y = ( cube.scale.y * 50 ) / 2;
            cube.position.z = this.scale * j - this.size.x * this.scale / 2; 
            
            scene.add( cube );

        }
    }

    scene.add(this.player);
}

World.prototype._buildWorldFromJSON = function(world, scene) {
    if (typeof world === 'undefined' || 
        typeof world.title === 'undefined' ||
        typeof world.size === 'undefined' ||
        typeof world.tiles === 'undefined') {
        throw 'Error: malformed world definition';
    }

    this.title = world.title;
    this.size = world.size;
    this.tiles = world.tiles;
}

World.prototype.render = function(scene) {
    // this.renderSelf(scene);

    // for (var i = 0; i < this.objects.length; i++) {
    //     this.objects[i].render(scene);
    // }
}

World.prototype.renderSelf = function(scene) {


}

World.prototype.movePlayer = function(direction) {
    switch(direction) {
        // up y
        case 0:
            this.playerY++;
            break;
        // up x
        case 1:
            this.playerX++;
            break;
        // down y
        case 2:
            this.playerY--;
            break;
        // down x
        case 3:
            this.playerX--;
            break;
    }
    var x = this.playerX + Math.floor(this.size.x / 2);
    var y = this.playerY + Math.floor(this.size.y / 2);

    this.player.position.set(-25+this.playerX*50, 50*this.tiles[x][y]+20, -25+this.playerY*50);
}