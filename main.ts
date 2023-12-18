namespace SpriteKind {
    export const home = SpriteKind.create()
    export const rest = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.rest, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.bubbles, 100)
    scene.cameraShake(2, 200)
    info.changeLifeBy(1)
    info.setLife(Math.constrain(info.life(), 0, 20))
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . 
        . . 8 8 8 8 8 . . 
        . 8 8 9 9 1 8 8 . 
        . 8 9 9 9 1 1 8 . 
        . 8 6 9 9 9 9 8 . 
        . 8 6 6 6 6 9 8 . 
        . 8 8 6 6 6 8 8 . 
        . . 8 8 8 8 8 . . 
        . . . . . . . . . 
        `, mySprite, 0, -50)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(sprite, effects.disintegrate, 500)
    info.changeScoreBy(1)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    clear_earth = sprites.createProjectileFromSide(img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ......333...333.....
        .....31113.31123....
        ....3111113113223...
        ....3111111133223...
        ....3111111332223...
        .....31111332223....
        ......331332223.....
        .......3222223......
        ........32223.......
        .........323........
        ..........3.........
        ....................
        ....................
        ....................
        ....................
        `, 0, 50)
    clear_earth.x = randint(0, scene.screenWidth())
    clear_earth.setKind(SpriteKind.rest)
    music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.ashes, 500)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
let Asteroid: Sprite = null
let clear_earth: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundColor(8)
effects.none.startScreenEffect()
mySprite = sprites.create(img`
    ....................
    ...............3.3..
    .ffff....ff...33333.
    .f..f...f89f...333..
    fff.ffffffffff..3...
    f5fff96996996ff.....
    ffff9996999998f.....
    ...f9f99ff9996f.ff..
    ...f9f996f9996fff9f.
    ...39999ff99666698f.
    ...f9999999866ffff..
    ....ff9689686ff.....
    .....fffffffff......
    ....................
    ....................
    ....................
    `, SpriteKind.Player)
mySprite.setPosition(77, 111)
controller.moveSprite(mySprite, 100, 0)
mySprite.setStayInScreen(true)
game.onUpdateInterval(500, function () {
    Asteroid = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . f b b b b 1 f . . . . . 
        . . . . f f b c b f f . . . . . 
        . . . . . . f c f . . . . . . . 
        . . . . f f c c c f f f . . . . 
        . . . f f b c b c c b f f f . . 
        . . f b b c c b b c c b 1 f f . 
        . f f b b b b b b c b b b 1 f . 
        . f c b b b b b b b b b b 1 f . 
        f f c c b b b b b b b b b 1 f . 
        f c c c c b b b b b b b b 1 f . 
        f f c c c c c b b b b b 1 f f . 
        . f f f c c c c c c b f f f . . 
        . . . f f f f f f f f f . . . . 
        `, 0, 50)
    Asteroid.x = randint(0, scene.screenWidth())
    Asteroid.setKind(SpriteKind.Enemy)
})
