var backgroundGame;
var ship;
var controls;
var bullet;
var range = 0;
var trigger;
var enemies;

var game = new Phaser.Game(370, 550, Phaser.CANVAS, 'container-game');

var theGame = {
    preload: function(){
        game.load.image('background', 'imgs/space.png');
        game.load.image('ship', 'imgs/nave.png');
        game.load.image('laser', 'imgs/laser.png');
        game.load.image('enemy', 'imgs/enemy.png');
    },
    create: function(){
        backgroundGame = game.add.tileSprite(0, 0, 370, 550, 'background');
        ship = game.add.sprite( game.width/2, 500, 'ship');
        ship.anchor.setTo(0.5);
        controls = game.input.keyboard.createCursorKeys();
        trigger = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        bullet = game.add.group();
        bullet.enableBody = true;
        bullet.physicsBodyType = Phaser.Physics.ARCADE;
        bullet.createMultiple(20, 'laser');
        bullet.setAll('anchor.x', 0.5);
        bullet.setAll('anchor.y', 1);
        bullet.setAll('outOfBoundsKill', true);
        bullet.setAll('checkWorldBounds', true);
        
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        
        for(var y = 0; y < 6; y++){
             for(var x = 0; x < 7; x++){
                var enemy = enemies.create(x*40, y*30, 'enemy');
                enemy.anchor.setTo(0.5);
             }
        }
         enemies.y = 50;
         enemies.x = 40;
         
         var animation = game.add.tween(enemies).to({x:100}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
         animation.onRepeat.add(downEnemies, this);
    },
    
    update: function(){
        if (controls.right.isDown){
            ship.position.x += 3.5;
        } else if (controls.left.isDown){
            ship.position.x -= 3.5;
        }
        
        if (trigger.isDown){
            if (game.time.now > range){
                var shot = bullet.getFirstExists(false);
            }
            
            if (shot){
                shot.reset(ship.x, ship.y);
                shot.body.velocity.y = -300;
                range = game.time.now + 400;
            }
        }
    }
};

function downEnemies(){
    enemies.y += 10;
}

game.state.add('theGame', theGame);
game.state.start('theGame');