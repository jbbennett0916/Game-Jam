
class TestScene extends Phaser.Scene {
    constructor() {
        super("TestScene");
        this.money = 0;
        this.path = null;
        this.spawnedThisWave = 0;
        this.spawnInterval = null;
        this.findBaddie = 0;
        this.baddieList = [
            {
                "key": "ancient",
                "duration": 30000
            },
            {
                "key": "spider_forest",
                "duration": 15000
            },
            {
                "key": "roboost",
                "duration": 20000
            }
        ];
    }
    preload() {
        //bad guys
        this.load.image('ancient', 'ancient.png');
        this.load.image('spider_forest', 'spider_forest.png');
        this.load.image('roboost', 'roboost007.png');

        //good guys
        this.load.image('purple_guy', 'enemy1idle1.png');
        this.load.image('dual_wield', 'enemy2idle1.png');
        this.load.image('green_guy', 'enemy3idle1.png');

    }
    create() {
        // this graphics element is only for visualization, 
        // its not related to our path
        var pathGraphics = this.add.graphics();
        var gridGraphics = this.add.graphics();
        //this.path = this.add.path
        this.createPath();
        this.drawPath(pathGraphics);

        this.drawGrid(gridGraphics);




        // the path for our enemies
        // parameters are the start x and y of our path
        // this.path = this.add.path(96, -32);
        // this.path.lineTo(96, 164);
        // this.path.lineTo(480, 164);
        // this.path.lineTo(480, 544);
        // this.path.lineTo(800, 544);
        // this.path.lineTo(800, 350);
        // this.path.lineTo(1200, 350);
        // this.path.lineTo(1200, 650);
        // this.path.lineTo(1400, 650);
        // this.path.lineTo(1400, 900);

        // visualize the path

        // graphics.lineStyle(10, 0x12ff0a, 1);
        //path.draw(graphics);       





        //adds enemies

        this.addEnemy('spider_forest', 15000);
        this.addEnemy('roboost', 20000);
        this.addEnemy('ancient', 30000);


        //spawns multiple enemies
        this.spawnInterval = setInterval(() => {
            // this.addEnemy('ancient', 100000 / (this.spawnedThisWave + 1))
            const min = 0;
            const max = 2;
            let bindex = Math.floor(Math.random() * (max - min + 1)) + min;
            let bobject = this.baddieList[bindex];
            this.addEnemy(bobject["key"], bobject["duration"]);
            this.spawnedThisWave++;
        }, 1000);

        // this.findBaddie(min, max) {
        // max = Math.floor(max);

    }

    //stops after 30 monsters are created
    update() {
        if (this.spawnedThisWave >= 30) {
            clearInterval(this.spawnInterval);
        }
    }

    createPath() {
        this.path = this.add.path(96, -32);
        this.path.lineTo(96, 164);
        this.path.lineTo(480, 164);
        this.path.lineTo(480, 544);
        this.path.lineTo(800, 544);
        this.path.lineTo(800, 350);
        this.path.lineTo(1200, 350);
        this.path.lineTo(1200, 650);
        this.path.lineTo(1400, 650);
        this.path.lineTo(1400, 900);
    }

    addEnemy(key, duration) {
        let follower = this.add.follower(this.path, 96, -32, key);
        follower.setScale(0.2);
        follower.startFollow(duration);
    }

    random(min, max) {

    }

    drawGrid(graphics) {
        graphics.lineStyle(1, 0x00ff, 1.0);
        for (var i = 0; i < 21; i++) {
            graphics.moveTo(0, i * 64);
            graphics.lineTo(1650, i * 64);
        }

        for (var i = 0; i < 30; i++) {
            graphics.moveTo(i * 64, 0);
            graphics.lineTo(i * 64, 900)
        }
        graphics.strokePath();
    }

    drawPath(graphics) {
        graphics.lineStyle(10, 0x12ff0a, 1);
        this.path.draw(graphics);
    }

    
}
