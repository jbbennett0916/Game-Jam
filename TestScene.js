
class TestScene extends Phaser.Scene {
    constructor() {
        super("TestScene");
        this.money = 0;
        this.path = null;
        this.spawnedThisWave = 0;
        this.spawnInterval = null;
        this.shootInterval = null;
        this.endOfPath = null;
        this.findBaddie = 0;
        this.placedHeroes = [];
        this.spawnedBaddies = [];
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
        this.load.image('ancient', 'ancient.png');
        this.load.image('spider_forest', 'spider_forest.png');
        this.load.image('roboost', 'roboost007.png');

        //good guys
        this.load.image('purple_guy', 'enemy1idle1.png');
        this.load.image('dual_wield', 'enemy2idle1.png');
        this.load.image('green_guy', 'enemy3idle1.png');

        //bullets
        this.load.image('green_bullet', 'bullets1_0023_Circle------------------.png')

    }
    create() {
        // this graphics element is only for visualization, 
        // its not related to our path
        var pathGraphics = this.add.graphics();
        var gridGraphics = this.add.graphics();
        //this.path = this.add.path
        this.createPath();
        //draws the path
        this.drawPath(pathGraphics);
        //draws a grid
        this.drawGrid(gridGraphics);



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

        //shoot interval allows all heroes to shoot. 
        this.shootInterval = setInterval(() => {
            for (let i = 0; i < this.placedHeroes.length; i++) {
                let hero = this.placedHeroes[i];
                let bullet = this.physics.add.image(hero.x, hero.y, 'green_bullet');

                //this allows our heroes to shoot the baddies
                let min = 500;
                let target = null;
                for (let j = 0; j < this.spawnedBaddies.length; j++) {
                    let bad = this.spawnedBaddies[j];
                    let d = Phaser.Math.Distance.BetweenPoints(bullet, bad);
                    if (d < min) {
                        min = d;
                        target = bad;
                    }
                    this.physics.add.collider(bullet, bad, () => {
                        bullet.destroy();
                        bad.destroy();
                        let z = this.spawnedBaddies.indexOf(bad);
                        this.spawnedBaddies.splice(z, 1);
                    });
                }
                if (target) {
                    this.physics.moveToObject(bullet, target, 1200);
                    let ng = Phaser.Math.Angle.BetweenPoints(hero, target);
                    ng = Phaser.Math.RadToDeg(ng);
                    console.log(ng);
                    // -90 on angle because idk Phaser is drunk
                    // Why is setAngle in degrees but the angle calculation
                    // function is in radians? No clue. Good luck. Game hates you.
                    hero.setAngle(ng - 90);
                    bullet.setAngle(ng - 90);
                } else {
                    bullet.destroy();
                }
                // console.log(min, target);

                setTimeout(() => {
                    bullet.destroy()
                }, 3000)

            }
        }, 500);



        //places the hero
        this.input.on('pointerdown', (pointer) => {
            this.addHero(pointer.x, pointer.y, this.goodieList[2].key, this.goodieList[2].damage);
        });
    }


    //stops after 30 monsters are created
    update() {
        if (this.spawnedThisWave >= 20) {
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
        this.endOfPath = this.physics.add.image(1400, 900, 'ancient');
        this.endOfPath.setScale(0.15);
        this.endOfPath.setAlpha(0.7);

    }

    //adds an enemy
    addEnemy(key, duration, health) {
        let follower = this.add.follower(this.path, 96, -32, key);
        this.physics.add.existing(follower);
        this.physics.world.enable(follower);
        follower.setData('health', health);
        follower.setScale(0.15);
        follower.startFollow(duration);
        this.spawnedBaddies.push(follower);
        this.physics.add.collider(follower, this.endOfPath, ()=>{
            this.scene.restart();
        });
    }

    //adds a hero
    addHero(x, y, key, damage) {
        let hero = this.add.image(x, y, key);
        hero.setData('damage', damage);
        hero.setScale(2);
        this.placedHeroes.push(hero);
    }
    random(min, max) {

    }

    //draws the grid
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

    //draws the path
    drawPath(graphics) {
        graphics.lineStyle(10, 0x12ff0a, 1);
        this.path.draw(graphics);
    }

    //places a hero on the map
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
}
