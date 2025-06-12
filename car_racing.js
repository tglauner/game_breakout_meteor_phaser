// Simple Car Racing Game using Phaser
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.image('road', './starfield.png');
}

var car;
var obstacles;
var cursors;
var road;
var score = 0;
var scoreText;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    road = game.add.tileSprite(0, 0, 800, 600, 'road');

    var carBmd = game.add.bitmapData(40, 80);
    carBmd.ctx.fillStyle = '#ff0000';
    carBmd.ctx.fillRect(0, 0, 40, 80);
    car = game.add.sprite(game.world.centerX, 500, carBmd);
    car.anchor.set(0.5);
    game.physics.arcade.enable(car);

    obstacles = game.add.group();
    obstacles.enableBody = true;

    cursors = game.input.keyboard.createCursorKeys();

    game.time.events.loop(Phaser.Timer.SECOND * 1.5, spawnObstacle, this);

    scoreText = game.add.text(10, 10, 'score: 0', { font: '20px Arial', fill: '#ffffff' });
}

function spawnObstacle() {
    var obstacleBmd = game.add.bitmapData(40, 80);
    obstacleBmd.ctx.fillStyle = '#00ff00';
    obstacleBmd.ctx.fillRect(0, 0, 40, 80);
    var x = game.rnd.between(40, game.width - 40);
    var obstacle = obstacles.create(x, -80, obstacleBmd);
    obstacle.body.velocity.y = 200;
    obstacle.checkWorldBounds = true;
    obstacle.outOfBoundsKill = true;
}

function update() {
    road.tilePosition.y += 2;

    if (cursors.left.isDown) {
        car.body.velocity.x = -200;
    } else if (cursors.right.isDown) {
        car.body.velocity.x = 200;
    } else {
        car.body.velocity.x = 0;
    }

    game.physics.arcade.overlap(car, obstacles, hitObstacle, null, this);

    score += game.time.physicsElapsed;
    scoreText.text = 'score: ' + Math.floor(score);
}

function hitObstacle() {
    game.paused = true;
    scoreText.text = 'Game Over! Score: ' + Math.floor(score);
}

