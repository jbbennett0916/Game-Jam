var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 1650,
    height: 900,   
    scene: [
        TestScene
    ]
};
var game = new Phaser.Game(config);

var graphics;
var path;
