
class TestScene extends Phaser.Scene{
    preload(){

    }
    create(){
         // this graphics element is only for visualization, 
    // its not related to our path
    var graphics = this.add.graphics();    
    
    // the path for our enemies
    // parameters are the start x and y of our path
    path = this.add.path(96, -32);
    path.lineTo(96, 164);
    path.lineTo(480, 164);
    path.lineTo(480, 544);
    path.lineTo(800, 544);
    path.lineTo(800, 350);
    path.lineTo(1200, 350);
    path.lineTo(1200, 650);
    path.lineTo(1400, 650);
    path.lineTo(1400, 900);
    
    graphics.lineStyle(10, 0x12ff0a, 1);
    // visualize the path
    path.draw(graphics);
    this.add.pa
    }
    update(){

    }
}