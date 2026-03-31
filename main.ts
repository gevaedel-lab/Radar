input.onButtonPressed(Button.A, function () {
    basic.showNumber(sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
    ))
})
function גילוי (טווחגילוי: number) {
    if (sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
    ) < טווחגילוי) {
        music.play(music.createSoundExpression(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    }
}
input.onButtonPressed(Button.B, function () {
    זוויתמכמ = 0
    SuperBit.Servo2(SuperBit.enServo.S3, זוויתמכמ)
    while (true) {
        for (let index = 0; index < 9; index++) {
            זוויתמכמ += 10
            SuperBit.Servo2(SuperBit.enServo.S3, זוויתמכמ)
            גילוי(מרחק_גילוי_מקסימאלי)
            basic.pause(250)
        }
        for (let index = 0; index < 9; index++) {
            זוויתמכמ += -10
            SuperBit.Servo2(SuperBit.enServo.S3, זוויתמכמ)
            גילוי(מרחק_גילוי_מקסימאלי)
            basic.pause(250)
        }
    }
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (מרחק_גילוי_מקסימאלי < 400) {
        מרחק_גילוי_מקסימאלי += 50
        basic.showNumber(מרחק_גילוי_מקסימאלי)
    } else {
        מרחק_גילוי_מקסימאלי = 100
        basic.showNumber(מרחק_גילוי_מקסימאלי)
    }
})
let זוויתמכמ = 0
let מרחק_גילוי_מקסימאלי = 0
מרחק_גילוי_מקסימאלי = 100
basic.showNumber(מרחק_גילוי_מקסימאלי)
