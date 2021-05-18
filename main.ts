namespace SpriteKind {
    export const Value_Shower = SpriteKind.create()
    export const TS = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Title_Screen_Open) {
        mySprite3.destroy()
        Title_Screen_Open = false
        game.splash("This game is about hunting", "bats")
        game.splash("Press A to shoot the", "bats")
        game.splash("Try to hit the most bats", "you can")
        Shower = sprites.create(img`
            . 
            `, SpriteKind.Value_Shower)
        Shower.say(Score)
        Shower.setPosition(23, 106)
        mySprite = sprites.create(img`
            . . 2 . . 
            . . 2 . . 
            2 2 2 2 2 
            . . 2 . . 
            . . 2 . . 
            `, SpriteKind.Player)
        controller.moveSprite(mySprite, 150, 150)
        tiles.setSmallTilemap(tilemap`level2`)
        scene.setBackgroundColor(11)
        mySprite.z = 100
        Bat_Swarm()
        info.startCountdown(15)
    } else {
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            if (mySprite.overlapsWith(value)) {
                Score += 1
                value.destroy()
                Shower.say(Score)
                music.baDing.play()
                if (sprites.allOfKind(SpriteKind.Enemy).length == 0) {
                    info.stopCountdown()
                    game.splash("Another Swarm is coming!!!")
                    info.startCountdown(15)
                    Bat_Swarm()
                }
            }
        }
    }
})
info.onCountdownEnd(function () {
    if (!(sprites.allOfKind(SpriteKind.Enemy).length == 0)) {
        music.setVolume(0)
        game.over(false, effects.melt)
    }
})
function Bat_Swarm () {
    for (let index = 0; index < 10; index++) {
        Spawn_Bat()
    }
}
function Spawn_Bat () {
    mySprite2 = sprites.create(img`
        . . f f f . . . . . . . . f f f 
        . f f c c . . . . . . f c b b c 
        f f c c . . . . . . f c b b c . 
        f c f c . . . . . . f b c c c . 
        f f f c c . c c . f c b b c c . 
        f f c 3 c c 3 c c f b c b b c . 
        f f b 3 b c 3 b c f b c c b c . 
        . c b b b b b b c b b c c c . . 
        . c 1 b b b 1 b b c c c c . . . 
        c b b b b b b b b b c c . . . . 
        c b c b b b c b b b b f . . . . 
        f b 1 f f f 1 b b b b f c . . . 
        f b b b b b b b b b b f c c . . 
        . f b b b b b b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        `, SpriteKind.Enemy)
    mySprite2.setStayInScreen(true)
    tiles.placeOnRandomTile(mySprite2, assets.tile`myTile2`)
    animation.runImageAnimation(
    mySprite2,
    [[img`
        . . f f f . . . . . . . . f f f 
        . f f c c . . . . . . f c b b c 
        f f c c . . . . . . f c b b c . 
        f c f c . . . . . . f b c c c . 
        f f f c c . c c . f c b b c c . 
        f f c 3 c c 3 c c f b c b b c . 
        f f b 3 b c 3 b c f b c c b c . 
        . c b b b b b b c b b c c c . . 
        . c 1 b b b 1 b b c c c c . . . 
        c b b b b b b b b b c c . . . . 
        c b c b b b c b b b b f . . . . 
        f b 1 f f f 1 b b b b f c . . . 
        f b b b b b b b b b b f c c . . 
        . f b b b b b b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        `,img`
        . . f f f . . . . . . . . . . . 
        f f f c c . . . . . . . . f f f 
        f f c c . . c c . . . f c b b c 
        f f c 3 c c 3 c c f f b b b c . 
        f f b 3 b c 3 b c f b b c c c . 
        . c b b b b b b c f b c b c c . 
        . c b b b b b b c b b c b b c . 
        c b 1 b b b 1 b b b c c c b c . 
        c b b b b b b b b c c c c c . . 
        f b c b b b c b b b b f c . . . 
        f b 1 f f f 1 b b b b f c c . . 
        . f b b b b b b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . c c . . c c . . . . . . . . 
        . . c 3 c c 3 c c c . . . . . . 
        . c b 3 b c 3 b c c c . . . . . 
        . c b b b b b b b b f f . . . . 
        c c b b b b b b b b f f . . . . 
        c b 1 b b b 1 b b c f f f . . . 
        c b b b b b b b b f f f f . . . 
        f b c b b b c b c c b b b . . . 
        f b 1 f f f 1 b f c c c c . . . 
        . f b b b b b b f b b c c . . . 
        c c f b b b b b c c b b c . . . 
        c c c f f f f f f c c b b c . . 
        . c c c . . . . . . c c c c c . 
        . . c c c . . . . . . . c c c c 
        . . . . . . . . . . . . . . . . 
        `,img`
        . f f f . . . . . . . . f f f . 
        f f c . . . . . . . f c b b c . 
        f c c . . . . . . f c b b c . . 
        c f . . . . . . . f b c c c . . 
        c f f . . . . . f f b b c c . . 
        f f f c c . c c f b c b b c . . 
        f f f c c c c c f b c c b c . . 
        . f c 3 c c 3 b c b c c c . . . 
        . c b 3 b c 3 b b c c c c . . . 
        c c b b b b b b b b c c . . . . 
        c b 1 b b b 1 b b b b f c . . . 
        f b b b b b b b b b b f c c . . 
        f b c b b b c b b b b f . . . . 
        . f 1 f f f 1 b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        `], [img`
        . . f f f . . . . . . . . f f f 
        . f f c c . . . . . . f c b b c 
        f f c c . . . . . . f c b b c . 
        f c f c . . . . . . f b c c c . 
        f f f c c . c c . f c b b c c . 
        f f c 3 c c 3 c c f b c b b c . 
        f f b 3 b c 3 b c f b c c b c . 
        . c 1 b b b 1 b c b b c c c . . 
        . c 1 b b b 1 b b c c c c . . . 
        c b b b b b b b b b c c . . . . 
        c b 1 f f 1 c b b b b f . . . . 
        f f 1 f f 1 f b b b b f c . . . 
        f f 2 2 2 2 f b b b b f c c . . 
        . f 2 2 2 2 b b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        `,img`
        . . f f f . . . . . . . . . . . 
        f f f c c . . . . . . . . f f f 
        f f c c c . c c . . . f c b b c 
        f f c 3 c c 3 c c f f b b b c . 
        f f c 3 b c 3 b c f b b c c c . 
        f c b b b b b b c f b c b c c . 
        c c 1 b b b 1 b c b b c b b c . 
        c b b b b b b b b b c c c b c . 
        c b 1 f f 1 c b b c c c c c . . 
        c f 1 f f 1 f b b b b f c . . . 
        f f f f f f f b b b b f c . . . 
        f f 2 2 2 2 f b b b b f c c . . 
        . f 2 2 2 2 2 b b b c f . . . . 
        . . f 2 2 2 b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . c c . c c . . . . . . . . 
        . . f 3 c c 3 c c c . . . . . . 
        . f c 3 b c 3 b c c c . . . . . 
        f c b b b b b b b b f f . . . . 
        c c 1 b b b 1 b b b f f . . . . 
        c b b b b b b b b c f f f . . . 
        c b 1 f f 1 c b b f f f f . . . 
        f f 1 f f 1 f b c c b b b . . . 
        f f f f f f f b f c c c c . . . 
        f f 2 2 2 2 f b f b b c c c . . 
        . f 2 2 2 2 2 b c c b b c . . . 
        . . f 2 2 2 b f f c c b b c . . 
        . . . f f f f f f f c c c c c . 
        . . . . . . . . . . . . c c c c 
        `,img`
        . f f f . . . . . . . . f f f . 
        f f c . . . . . . . f c b b c . 
        f c c . . . . . . f c b b c . . 
        c f . . . . . . . f b c c c . . 
        c f f . . . . . f f b b c c . . 
        f f f c c . c c f b c b b c . . 
        f f f c c c c c f b c c b c . . 
        . f c 3 c c 3 b c b c c c . . . 
        . c b 3 b c 3 b b c c c c . . . 
        c c b b b b b b b b c c . . . . 
        c 1 1 b b b 1 1 b b b f c . . . 
        f b b b b b b b b b b f c c . . 
        f b c b b b c b b b b f . . . . 
        . f 1 f f f 1 b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        `], [img`
        f f f . . . . . . . . f f f . . 
        c b b c f . . . . . . c c f f . 
        . c b b c f . . . . . . c c f f 
        . c c c b f . . . . . . c f c f 
        . c c b b c f . c c . c c f f f 
        . c b b c b f c c 3 c c 3 c f f 
        . c b c c b f c b 3 c b 3 b f f 
        . . c c c b b c b 1 b b b 1 c . 
        . . . c c c c b b 1 b b b 1 c . 
        . . . . c c b b b b b b b b b c 
        . . . . f b b b b c 1 f f 1 b c 
        . . . c f b b b b f 1 f f 1 f f 
        . . c c f b b b b f 2 2 2 2 f f 
        . . . . f c b b b b 2 2 2 2 f . 
        . . . . . f c b b b b b b f . . 
        . . . . . . f f f f f f f . . . 
        `,img`
        . . . . . . . . . . . f f f . . 
        f f f . . . . . . . . c c f f f 
        c b b c f . . . c c . c c c f f 
        . c b b b f f c c 3 c c 3 c f f 
        . c c c b b f c b 3 c b 3 c f f 
        . c c b c b f c b b b b b b c f 
        . c b b c b b c b 1 b b b 1 c c 
        . c b c c c b b b b b b b b b c 
        . . c c c c c b b c 1 f f 1 b c 
        . . . c f b b b b f 1 f f 1 f c 
        . . . c f b b b b f f f f f f f 
        . . c c f b b b b f 2 2 2 2 f f 
        . . . . f c b b b 2 2 2 2 2 f . 
        . . . . . f c b b b 2 2 2 f . . 
        . . . . . . f f f f f f f . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . c c . c c . . . 
        . . . . . . c c c 3 c c 3 f . . 
        . . . . . c c c b 3 c b 3 c f . 
        . . . . f f b b b b b b b b c f 
        . . . . f f b b b 1 b b b 1 c c 
        . . . f f f c b b b b b b b b c 
        . . . f f f f b b c 1 f f 1 b c 
        . . . b b b c c b f 1 f f 1 f f 
        . . . c c c c f b f f f f f f f 
        . . c c c b b f b f 2 2 2 2 f f 
        . . . c b b c c b 2 2 2 2 2 f . 
        . . c b b c c f f b 2 2 2 f . . 
        . c c c c c f f f f f f f . . . 
        c c c c . . . . . . . . . . . . 
        `,img`
        . f f f . . . . . . . . f f f . 
        . c b b c f . . . . . . . c f f 
        . . c b b c f . . . . . . c c f 
        . . c c c b f . . . . . . . f c 
        . . c c b b f f . . . . . f f c 
        . . c b b c b f c c . c c f f f 
        . . c b c c b f c c c c c f f f 
        . . . c c c b c b 3 c c 3 c f . 
        . . . c c c c b b 3 c b 3 b c . 
        . . . . c c b b b b b b b b c c 
        . . . c f b b b 1 1 b b b 1 1 c 
        . . c c f b b b b b b b b b b f 
        . . . . f b b b b c b b b c b f 
        . . . . f c b b b 1 f f f 1 f . 
        . . . . . f c b b b b b b f . . 
        . . . . . . f f f f f f f . . . 
        `], [img`
        f f f . . . . . . . . f f f . . 
        c b b c f . . . . . . c c f f . 
        . c b b c f . . . . . . c c f f 
        . c c c b f . . . . . . c f c f 
        . c c b b c f . c c . c c f f f 
        . c b b c b f c c 3 c c 3 c f f 
        . c b c c b f c b 3 c b 3 b f f 
        . . c c c b b c b b b b b b c . 
        . . . c c c c b b 1 b b b 1 c . 
        . . . . c c b b b b b b b b b c 
        . . . . f b b b b c b b b c b c 
        . . . c f b b b b 1 f f f 1 b f 
        . . c c f b b b b b b b b b b f 
        . . . . f c b b b b b b b b f . 
        . . . . . f c b b b b b b f . . 
        . . . . . . f f f f f f f . . . 
        `,img`
        . . . . . . . . . . . f f f . . 
        f f f . . . . . . . . c c f f f 
        c b b c f . . . c c . . c c f f 
        . c b b b f f c c 3 c c 3 c f f 
        . c c c b b f c b 3 c b 3 b f f 
        . c c b c b f c b b b b b b c . 
        . c b b c b b c b b b b b b c . 
        . c b c c c b b b 1 b b b 1 b c 
        . . c c c c c b b b b b b b b c 
        . . . c f b b b b c b b b c b f 
        . . c c f b b b b 1 f f f 1 b f 
        . . . . f c b b b b b b b b f . 
        . . . . . f c b b b b b b f . . 
        . . . . . . f f f f f f f . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . c c . . c c . . 
        . . . . . . c c c 3 c c 3 c . . 
        . . . . . c c c b 3 c b 3 b c . 
        . . . . f f b b b b b b b b c . 
        . . . . f f b b b b b b b b c c 
        . . . f f f c b b 1 b b b 1 b c 
        . . . f f f f b b b b b b b b c 
        . . . b b b c c b c b b b c b f 
        . . . c c c c f b 1 f f f 1 b f 
        . . . c c b b f b b b b b b f . 
        . . . c b b c c b b b b b f c c 
        . . c b b c c f f f f f f c c c 
        . c c c c c . . . . . . c c c . 
        c c c c . . . . . . . c c c . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . f f f . . . . . . . . f f f . 
        . c b b c f . . . . . . . c f f 
        . . c b b c f . . . . . . c c f 
        . . c c c b f . . . . . . . f c 
        . . c c b b f f . . . . . f f c 
        . . c b b c b f c c . c c f f f 
        . . c b c c b f c c c c c f f f 
        . . . c c c b c b 3 c c 3 c f . 
        . . . c c c c b b 3 c b 3 b c . 
        . . . . c c b b b b b b b b c c 
        . . . c f b b b b 1 b b b 1 b c 
        . . c c f b b b b b b b b b b f 
        . . . . f b b b b c b b b c b f 
        . . . . f c b b b 1 f f f 1 f . 
        . . . . . f c b b b b b b f . . 
        . . . . . . f f f f f f f . . . 
        `]]._pickRandom(),
    100,
    true
    )
    animation.runMovementAnimation(
    mySprite2,
    "v -15 h 15 v 15 h -15",
    2000,
    true
    )
}
let mySprite2: Sprite = null
let mySprite: Sprite = null
let Score = 0
let Shower: Sprite = null
let mySprite3: Sprite = null
let Title_Screen_Open = false
Title_Screen_Open = true
mySprite3 = sprites.create(img`
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbccccccccccccccccbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbbcccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbbbcccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbcccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbcccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbcccccccbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbcccccccbbbbbbbbbcccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbcccccccbbbcccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbb
    bbbbbbbbbcccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbcbbbbbbbbbbb
    bbbbbbbbbccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccbbbbbbbbcccccbbbbbbbbcbbbbbbbbbcbbbbbbbbbb
    bbbbbbbbbcccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccbbbbcccccccccccbbbbbcbbbbbbbbbbbcbbbbbbbbb
    bbbbbbbbcccccccccccccccccccccccccccbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccbcccccccccccccccbbbbcbbcbbcbbbbbcbbbbbbbbb
    bbbbbbbbccccccccccccccccccccccccbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccbbbbbcbcccbcccccbcbbbbbbbbb
    bbbbbbbbccccccccccccccccccccbbbbbbbbbbbcccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccbbbbbbcbbcbbcbcbcbcbbbbbbbbb
    bbbbbbbbcccccccccccccccbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccbbbbbbbcbbcbbcbcbcbcbbbbbbbbb
    bbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbcbbcbbcbcbcbcbbbbbbbbb
    bbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccbbbbbbbbbbbbbbbbcccccccccccccccccbbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbcbbbbbbbbbbbcbbbbbbbbb
    bbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbcccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccbbbbbbbbbbbbbbbcbbbbbbbbbcbbbbbbbbbb
    bbbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbccccccccccccccccccccbbbbbbbbbbbccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbcbbbbbbbcbbbbbbbbbbb
    bbbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbccccccccccccccccccccccbbbbbbbbbccccccccccccbccccccbbbbbbbbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbb
    bbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbccccccccccccccccccccccbbbbbbbbccccccccccbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbccccccccccccccccccccccccbbbbbbbccccccccbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbcccccccccccccccccccccccccbbbbbbbbcccbbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccbbbbbbbbbbccccccccbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbcccccccbbbbbbbcccccbccccccccbbbbbbbbbbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbcccccccbbbbbbbbccccccbccccccccbbbbbbbbbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccbbbbbbbbbbbcccccccbbbbbbbbbcccccbccccccccbbbbbbbbbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbcccccccbbbbbbbbbbcccccbbccccccccbbbbbbbbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbccccccccbbbbbbbbbbbcccccccbbbbbbbbbbccccccbbcccccccccbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbccccccccbbbbbbbbbbbccccccccbbbbbbbbbbccccccbbccccccccccbbbbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbccccccccbbbbbbbbbbbcccccccccbbbbbbbbbccccccbbbcccccccccbbbbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbccccccccbbbbbbbbbbbbcccccccccbbbbbbbbbcccccbbbbbcccccccccbbbbbbbbbbccccccbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbccccccccbbbbbbbbbbbbbbcccccccccbbbbbbbccccccbbbbbcccccccccbbbbbbbbbbccccccbbbbbbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbccccccccbbbbbbbbbbbbbbbcccccccccbbbbbcccccccbbbbbccccccccccbbbbbbbbbcccccbbbbbbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbcccccccccbbbbbccccccbbbbbbccccccccccbbbbbbbbcccccccbbbbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbcccccccccccccccccccbbbbbbbcccccccccbbbbbbbbbccccccccbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbcccccccccccccccccbbbbbbbbccccccccccbbbbbbbbbccccccccbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbcccccccccccccccccbbbbbbbbccccccccccbbbbbbbbbbccccccccbbcccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccbbbbbbbbccccccccccbbbbbbbbbbbcccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccbbbbbbbbbbcccccbbbbbbbbbbbbbbbbccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbcccccccccccccccbbbccccccccccccccccccbbbbbbbbbbbb
    bbccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbccccccccccccccccbbbbbbbbbcccccccccccccccbbbccccccccccccccccccbbbbbbbbbbbb
    bbccccccccccccccccccccccccccccccccbbbcccccbbbbbbbbccccccccccccbbbbbccccccccccccccccccbbccccccccccccccccbbbbbbbbbcccccccccccccccbbbccccccccccccccccccbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbcccccbbbbbbbbccccccccccccbbbbbccccccccccccccccccbbccccccccccccccccbbbbbbbbbcccccccccccccccbbbccccccccccccccccccbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbcccccbbbbbbbbcccccbbcccccbbbbbccccccccccccccccccbbccccccccccccccccbbbbbbbbbccccbbbbbbbccccbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbcccccbbbbbbbbcccccbbcccccbbbbbccccccccccccccccccbbccccccccccccccccbbbbbbbbbcccccccccccccccbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbcccccbbbbbbbbcccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbccccbbbbbbbbbbbbbbbcccccccccccccccbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbcccccbbbbbbbbcccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbccccbbbbbbbbbbbbbbbcccccccccccccccbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbcccccbbbbbbbbcccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbccccbbbbbbbbbbbbbbbcccccccccccccccbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbcccccbbbbbbbbcccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbccccbbbbbbbbbbbbbbbccccbbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbcccccbbbbbbbbcccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbccccbbbbbbbbbbbbbbbccccbbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbcccccbbbbbbbbcccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbccccbbbbbbbbcccbbbbccccbbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbcccccbbbbbbbbcccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbccccbbbbbbbbcccbbbbccccbbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbcccccbbbbbbbbcccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbccccbbbbbbbbcccbbbbcccccccccccccccbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbcccccbbbbbbbbcccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbccccbbbbbbbbcccbbbbcccccccccccccccbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbcccccbbbbbbbbcccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbccccbbbbbbbbcccbbbbcccccccccccccccbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbcccccbbbbbbbbcccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbccccbbbbbbbbcccbbbbcccccccccccccccbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbcccccbbbbbbbbcccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbccccbbbbbbbbcccbbbbbbbbbbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbccccccccccccccccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbcccccccccccccccbbbbbbbbbbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbccccccccccccccccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbcccccccccccccccbbbbbbbbbbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbccccccccccccccccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbcccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbccccccccccccccccccbbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbcccccccccbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    `, SpriteKind.TS)
