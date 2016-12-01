var backgroundGame;
var ship;
var controls;
var game = new Phaser.Game(370, 550, Phaser.CANVAS, 'container-game');

var theGame = {
    preload: function(){
        game.load.image('background', 'imgs/space.png');
        game.load.image('ship', 'imgs/nave.png');
    },
    create: function(){
        backgroundGame = game.add.tileSprite(0, 0, 370, 550, 'background');
        ship = game.add.sprite( game.width/2, 500, 'ship');
        ship.anchor.setTo(0.5);
        controls = game.input.keyboard.createCursorKeys();
    },
    
    update: function(){
        if (controls.right.isDown){
            ship.position.x += 3.5;
        } else if (controls.left.isDown){
            ship.position.x -= 3.5;
        }
    }
};

game.state.add('theGame', theGame);
game.state.start('theGame');