namespace SpriteKind {
    export const spring = SpriteKind.create()
    export const ring = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    jump()
})
function gravity () {
    PixelIstoMeters += 30
    gravityy = 0
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`spike`, function (sprite, location) {
    scene.cameraShake(4, 500)
    info.setScore(0)
    tiles.placeOnTile(playerr, spawn)
})
function spawn_enemies (EnemiesList: Image[]) {
    for (let value of tiles.getTilesByType(assets.tile`mi`)) {
        mySprite = sprites.create(EnemiesList._pickRandom(), SpriteKind.Enemy)
        tiles.placeOnTile(mySprite, value)
        if (mySprite.image.equals(assets.image`enemy11`)) {
            mySprite.setVelocity(-80, 0)
        }
        if (mySprite.image.equals(assets.image`enemy 22`)) {
            mySprite.setVelocity(50, 0)
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`flag`, function (sprite, location) {
    game.gameOver(true)
})
function setrings () {
    for (let value2 of tiles.getTilesByType(assets.tile`mis`)) {
        ring2 = sprites.create(assets.image`ring`, SpriteKind.ring)
        tiles.placeOnTile(ring2, value2)
    }
}
function jump () {
    if (playerr.isHittingTile(CollisionDirection.Bottom)) {
        playerr.vy = -8 * PixelIstoMeters
    }
}
function BackgroundMovement () {
    scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal)
    scroller.scrollBackgroundWithSpeed(-50, 0)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ring, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(2)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`spring`, function (sprite, location) {
    sprite.vy = -20 * PixelIstoMeters
    sprite.y += 10
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`barrier`, function (sprite, location) {
    scene.cameraShake(4, 500)
    info.setScore(0)
    tiles.placeOnTile(playerr, spawn)
    setrings()
})
function animations () {
    characterAnimations.runFrames(
    playerr,
    assets.animation`left`,
    100,
    characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingLeft)
    )
    characterAnimations.runFrames(
    playerr,
    assets.animation`right`,
    100,
    characterAnimations.rule(Predicate.MovingRight, Predicate.FacingRight)
    )
    characterAnimations.runFrames(
    playerr,
    assets.animation`jump right`,
    100,
    characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
    )
    characterAnimations.runFrames(
    playerr,
    assets.animation`jump left`,
    100,
    characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
    )
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    info.setScore(0)
})
let ring2: Sprite = null
let mySprite: Sprite = null
let gravityy = 0
let PixelIstoMeters = 0
let spawn: tiles.Location = null
let playerr: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
game.setDialogFrame(assets.image`ring frame`)
game.showLongText("Collect rings to increase your score!", DialogLayout.Center)
game.showLongText("Reach the flag to win!", DialogLayout.Bottom)
scene.setBackgroundImage(assets.image`background`)
playerr = sprites.create(assets.image`player`, SpriteKind.Player)
info.setScore(0)
controller.moveSprite(playerr, 200, 0)
scene.cameraFollowSprite(playerr)
playerr.ay = 400
gravity()
spawn = tiles.getTileLocation(5, 127)
tiles.placeOnTile(playerr, spawn)
BackgroundMovement()
animations()
setrings()
let list = [assets.image`enemy 1`, assets.image`enemy 2`]
spawn_enemies(list)
BackgroundMovement()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.vx < 0 && (value.tileKindAt(TileDirection.Bottom, assets.tile`transparency16`) || value.isHittingTile(CollisionDirection.Left))) {
            value.vx = value.vx * -1
        } else if (value.vx > 0 && (value.tileKindAt(TileDirection.Bottom, assets.tile`transparency16`) || value.isHittingTile(CollisionDirection.Right))) {
            value.vx = value.vx * -1
        }
    }
})
