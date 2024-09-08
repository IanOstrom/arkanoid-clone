namespace SpriteKind {
    export const Ball = SpriteKind.create()
    export const MissDetector = SpriteKind.create()
    export const RedBlock = SpriteKind.create()
    export const yellowBlock = SpriteKind.create()
    export const greenBlock = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ball, function (sprite, otherSprite) {
    bounceBall(otherSprite)
    otherSprite.y = sprite.top + 1
})
function spawnBall () {
    ball = sprites.create(img`
        1 1 
        1 1 
        `, SpriteKind.Ball)
    ball.setPosition(80, 50)
    ballVx = randint(ballSpeed / 3, ballSpeed)
    if (randint(0, 1) == 0) {
        ballVx = ballVx * -1
    }
    ballVy = ballSpeed
    ball.setVelocity(ballVx, ballVy)
    ball.setBounceOnWall(true)
}
sprites.onOverlap(SpriteKind.Ball, SpriteKind.greenBlock, function (sprite, otherSprite) {
    mySprite = sprites.create(img`
        b 5 5 5 5 5 5 b 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        b 5 5 5 5 5 5 b 
        `, SpriteKind.yellowBlock)
    mySprite.setPosition(otherSprite.x, otherSprite.y)
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    bounceBall(sprite)
})
function bounceBall (ball: Sprite) {
    ballVx = ball.vx * 1
    ballVy = ball.vy * -1
    ball.setVelocity(ballVx, ballVy)
}
function spawnBlocks (levelArray: Sprite[]) {
    blockX = 8
    blockY = 20
    gap = 1
    for (let sprites2 of levelArray) {
        spawnRowOfBlocks(17, gap, sprites2)
        blockY += sprites2.height + gap
        blockX = 8
    }
}
sprites.onOverlap(SpriteKind.Ball, SpriteKind.yellowBlock, function (sprite, otherSprite) {
    mySprite = sprites.create(img`
        b 2 2 2 2 2 2 b 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        b 2 2 2 2 2 2 b 
        `, SpriteKind.RedBlock)
    mySprite.setPosition(otherSprite.x, otherSprite.y)
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    bounceBall(sprite)
})
function spawnMissDetector () {
    missDetector = sprites.create(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `, SpriteKind.MissDetector)
    missDetector.setPosition(80, 119)
}
sprites.onOverlap(SpriteKind.Ball, SpriteKind.RedBlock, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    spriteCount += -1
    bounceBall(sprite)
})
function spawnRowOfBlocks (numBlocks: number, gap: number, spriteColor: Sprite) {
    for (let index = 0; index < numBlocks; index++) {
        mySprite = sprites.create(spriteColor.image, spriteColor.kind())
        mySprite.setPosition(blockX, blockY)
        blockX += mySprite.width + gap
        spriteCount += 1
    }
}
function setNewLevel () {
    if (level < levels.length) {
        spawnBlocks(levels[level])
        game.splash("Level " + (level + 1))
    } else {
        game.gameOver(true)
    }
}
sprites.onOverlap(SpriteKind.Ball, SpriteKind.MissDetector, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
    spawnBall()
})
function spawnPlayer () {
    paddle = sprites.create(img`
        2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        `, SpriteKind.Player)
    controller.moveSprite(paddle, 100, 0)
    paddle.setPosition(80, 110)
    paddle.setStayInScreen(true)
}
function setLevelArrays () {
    levels = [
    [
    sprites.create(img`
        b 2 2 2 2 2 2 b 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        b 2 2 2 2 2 2 b 
        `, SpriteKind.RedBlock),
    sprites.create(img`
        b 2 2 2 2 2 2 b 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        b 2 2 2 2 2 2 b 
        `, SpriteKind.RedBlock),
    sprites.create(img`
        b 2 2 2 2 2 2 b 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        b 2 2 2 2 2 2 b 
        `, SpriteKind.RedBlock),
    sprites.create(img`
        b 2 2 2 2 2 2 b 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        b 2 2 2 2 2 2 b 
        `, SpriteKind.RedBlock),
    sprites.create(img`
        b 2 2 2 2 2 2 b 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        b 2 2 2 2 2 2 b 
        `, SpriteKind.RedBlock)
    ],
    [
    sprites.create(img`
        b 5 5 5 5 5 5 b 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        b 5 5 5 5 5 5 b 
        `, SpriteKind.yellowBlock),
    sprites.create(img`
        b 2 2 2 2 2 2 b 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        b 2 2 2 2 2 2 b 
        `, SpriteKind.RedBlock),
    sprites.create(img`
        b 5 5 5 5 5 5 b 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        b 5 5 5 5 5 5 b 
        `, SpriteKind.yellowBlock),
    sprites.create(img`
        b 2 2 2 2 2 2 b 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        b 2 2 2 2 2 2 b 
        `, SpriteKind.RedBlock),
    sprites.create(img`
        b 5 5 5 5 5 5 b 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        b 5 5 5 5 5 5 b 
        `, SpriteKind.yellowBlock)
    ],
    [
    sprites.create(img`
        b 2 2 2 2 2 2 b 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        b 2 2 2 2 2 2 b 
        `, SpriteKind.RedBlock),
    sprites.create(img`
        b 5 5 5 5 5 5 b 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        b 5 5 5 5 5 5 b 
        `, SpriteKind.yellowBlock),
    sprites.create(img`
        b 7 7 7 7 7 7 b 
        7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 
        b 7 7 7 7 7 7 b 
        `, SpriteKind.greenBlock),
    sprites.create(img`
        b 5 5 5 5 5 5 b 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        b 5 5 5 5 5 5 b 
        `, SpriteKind.yellowBlock),
    sprites.create(img`
        b 2 2 2 2 2 2 b 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        b 2 2 2 2 2 2 b 
        `, SpriteKind.RedBlock)
    ],
    [
    sprites.create(img`
        b 7 7 7 7 7 7 b 
        7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 
        b 7 7 7 7 7 7 b 
        `, SpriteKind.greenBlock),
    sprites.create(img`
        b 5 5 5 5 5 5 b 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        b 5 5 5 5 5 5 b 
        `, SpriteKind.yellowBlock),
    sprites.create(img`
        b 2 2 2 2 2 2 b 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        b 2 2 2 2 2 2 b 
        `, SpriteKind.RedBlock),
    sprites.create(img`
        b 5 5 5 5 5 5 b 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        b 5 5 5 5 5 5 b 
        `, SpriteKind.yellowBlock),
    sprites.create(img`
        b 7 7 7 7 7 7 b 
        7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 
        b 7 7 7 7 7 7 b 
        `, SpriteKind.greenBlock)
    ]
    ]
    // Creating the arrays puts each sprite on screen. This destroys them.
    for (let sprites2 of levels) {
        for (let value of sprites2) {
            sprites.destroy(value)
        }
    }
}
let paddle: Sprite = null
let levels: Sprite[][] = []
let missDetector: Sprite = null
let gap = 0
let blockY = 0
let blockX = 0
let mySprite: Sprite = null
let ballVy = 0
let ballVx = 0
let ball: Sprite = null
let ballSpeed = 0
let level = 0
level = 0
let spriteCount = 0
ballSpeed = 800
info.setScore(0)
info.setLife(50)
game.setGameOverScoringType(game.ScoringType.HighScore)
setLevelArrays()
spawnMissDetector()
setNewLevel()
spawnPlayer()
spawnBall()
game.onUpdate(function () {
    if (spriteCount == 0) {
        level += 1
        setNewLevel()
    }
})
