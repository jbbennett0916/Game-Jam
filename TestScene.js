
class TestScene extends Phaser.Scene {
    constructor() {
        super("TestScene");
        this.money = 0;
        this.path = null;
        this.spawnedThisWave = 0;
        this.spawnInterval = null;
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
        this.load.image('ancient', 'ancient.png');
        this.load.image('spider_forest', 'spider_forest.png');
        this.load.image('roboost', 'roboost007.png');
    }
    create() {
        // this graphics element is only for visualization, 
        // its not related to our path
        var graphics = this.add.graphics();

        // the path for our enemies
        // parameters are the start x and y of our path
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

        graphics.lineStyle(10, 0x12ff0a, 1);
        // visualize the path
        //path.draw(graphics);

        /*
        if(this.baddieList[i]==0)
        {
            this.addEnemy('ancient');
        }
        else if(this.baddieList[i]==1)
        {
            this.addEnemy('spider_forest');
        }

        else {
            this.addEnemy('roboost');
        }
        */

        //adds enemies
        
        this.addEnemy('spider_forest', 15000);
        this.addEnemy('roboost', 20000);
        this.addEnemy('ancient', 30000);
        

        //spawns multiple enemies
        this.spawnInterval = setInterval(()=>{
            this.addEnemy('ancient', 100000/(this.spawnedThisWave+1))
            this.spawnedThisWave++;
        }, 1000);

    }

    //stops after 30 monsters are created
    update() {
        if(this.spawnedThisWave >= 30){
            clearInterval(this.spawnInterval);
        }
    }

    addEnemy(key, duration) {
        let follower = this.add.follower(this.path, 96, -32, key);
        follower.setScale(0.2);
        follower.startFollow(duration);
    }
}

    /*
   function findBaddie(min, max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
    let b = baddieList[bindex];
    this.addEnemy(b["key"], b["duration"]);
    }
    */