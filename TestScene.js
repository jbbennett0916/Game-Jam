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
                "duration": 30000,
                "health": 150
            },
            {
                "key": "spider_forest",
                "duration": 15000,
                "health": 80
            },
            {
                "key": "roboost",
                "duration": 20000,
                "health": 100
            }
        ];
        this.goodieList = [
            {
                "key": "purple_guy",
                "damage": 10
            },
            {
                "key": "dual_wield",
                "damage": 30
            },
            {
                "key": "green_guy",
                "damage": 20
            }
        ];
    }
    preload() {
        //bad guys
        this.load.image('ancient', 'Images/ancient.png');
        this.load.image('spider_forest', 'Images/spider_forest.png');
        this.load.image('roboost', 'Images/roboost007.png');

        //good guys
        this.load.image('purple_guy', 'Images/enemy1idle1.png');
        this.load.image('dual_wield', 'Images/enemy2idle1.png');
        this.load.image('green_guy', 'Images/enemy3idle1.png');


    }
    create() {
        //this graphics element is only for visualization,
        //its not related to our path
        var pathGraphics = this.add.graphics();
        var gridGraphics = this.add.graphics();

        this.createPath();
        this.drawPath(pathGraphics);

        this.drawGrid(gridGraphics);

        // the path for our enemies
        // parameters are the start x and y of our path
        //this.path = this.add.path(96, -32);
        //this.path.lineTo(96, 164);
        //this.path.lineTo(480, 164);
        //this.path.lineTo(480, 544);
        //this.path.lineTo(800, 544);
        //this.path.lineTo(800, 350);
        //this.path.lineTo(1200, 350);
        //this.path.lineTo(1200, 650);
        //this.path.lineTo(1400, 650);
        //this.path.lineTo(1400, 900);

        //graphics.lineStyle(10, 0x12ff0a, 0.5);
        // visualize the path
        //this.path.draw(graphics);


        //adds enemies

        this.addEnemy('spider_forest', 15000, 80);
        this.addEnemy('roboost', 20000, 100);
        this.addEnemy('ancient', 30000, 150);

        //spawns multiple enemies
        this.spawnInterval = setInterval(() => {
            const min = 0;
            const max = 2;
            let bindex = Math.floor(Math.random() * (max - min + 1)) + min;
            let bobject = this.baddieList[bindex];
            this.addEnemy(bobject["key"], bobject["duration"], bobject["health"]);
            this.spawnedThisWave++;
        }, 1000);

        //this places the hero
        this.input.on('pointerdown', (pointer)=>{
            // console.log(pointer);
            this.addHero(pointer.x, pointer.y, this.goodieList[1].key, this.goodieList[1].damage);
        });

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

    addEnemy(key, duration, health) {
        let follower = this.add.follower(this.path, 96, -32, key);
        follower.setData('health', health);
        follower.setScale(0.15);
        follower.startFollow(duration);
    }

    addHero(x, y, key, damage) {
        let hero = this.add.image(x, y, key);
        hero.setData('damage', damage);
        hero.setScale(2);
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

    placeHero(pointer) {
        var i = Math.floor(pointer.y / 64);
        var j = Math.floor(pointer.x / 64);
        if (canPlaceHero(i, j)) {
            var Hero = Hero.get();
            if (Hero) {
                Hero.setActive(true);
                Hero.setVisible(true);
                Hero.place(i, j);
            }
        }
    }

    canPlaceTurret(i, j) {
        return map[i][j] === 0;
    }
}