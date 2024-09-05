namespace SpriteKind {
    export const Ball = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ball, function (sprite, otherSprite) {
    otherSprite.setVelocity(ball.vx * 1, ball.vy * -1)
})
function spawnBall () {
    ball = sprites.create(img`
        1 1 
        1 1 
        `, SpriteKind.Ball)
    ball.setPosition(80, 36)
    ball.setVelocity(randint(ballSpeed * -1, ballSpeed), randint(ballSpeed / 2, ballSpeed))
    ball.setBounceOnWall(true)
}
function spawnPlayer () {
    paddle = sprites.create(img`
        5 8 8 2 2 5 5 2 2 8 8 5 
        5 8 8 2 2 5 5 2 2 8 8 5 
        `, SpriteKind.Player)
    controller.moveSprite(paddle, 100, 0)
    paddle.setPosition(80, 110)
    paddle.setStayInScreen(true)
}
let paddle: Sprite = null
let ball: Sprite = null
let ballSpeed = 0
ballSpeed = 50
info.setScore(0)
info.setLife(3)
game.setGameOverScoringType(game.ScoringType.HighScore)
spawnPlayer()
spawnBall()
