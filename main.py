@namespace
class SpriteKind:
    Ball = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    if sprite.x > otherSprite.x:
        if otherSprite.vx < 0:
            otherSprite.vx = otherSprite.vx * -1
    otherSprite.vy = otherSprite.vy * -1
sprites.on_overlap(SpriteKind.player, SpriteKind.Ball, on_on_overlap)

def spawnBall():
    global ball
    ball = sprites.create(img("""
        1 1 
                1 1
    """), SpriteKind.Ball)
    ball.set_position(80, 36)
    ball.set_velocity(randint(-50, 50), randint(30, 50))
    ball.set_bounce_on_wall(True)
def spawnPlayer():
    global paddle
    paddle = sprites.create(img("""
            5 8 8 2 2 5 5 2 2 8 8 5 
                    5 8 8 2 2 5 5 2 2 8 8 5
        """),
        SpriteKind.player)
    controller.move_sprite(paddle, 100, 0)
    paddle.set_position(80, 110)
    paddle.set_stay_in_screen(True)
paddle: Sprite = None
ball: Sprite = None
info.set_score(0)
info.set_life(3)
game.set_game_over_scoring_type(game.ScoringType.HIGH_SCORE)
spawnPlayer()
spawnBall()