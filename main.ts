let זווית_רדאר = 0
let זמן_השהיה = 0
let רדאר_פועל = 0
let מרחק = 0
let מרחק_גילוי_מקסימאלי = 0
let זווית_סריקה_מקסימאלית = 0
input.onButtonPressed(Button.A, function () {
    זווית_רדאר = 0
    זמן_השהיה = 100
    SuperBit.Servo2(SuperBit.enServo.S3, זווית_רדאר)
    basic.pause(1000)
    רדאר_פועל = 1
})
input.onButtonPressed(Button.B, function () {
    רדאר_פועל = 0
})
basic.forever(function () {
    if (מרחק < מרחק_גילוי_מקסימאלי) {
        music.play(music.createSoundExpression(WaveShape.Sine, 5000, 1, 255, 255, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    }
})
basic.forever(function () {
    מרחק = 1000
    זווית_סריקה_מקסימאלית = 90
    מרחק_גילוי_מקסימאלי = 100
    while (רדאר_פועל == 1) {
        while (זווית_רדאר < זווית_סריקה_מקסימאלית) {
            זווית_רדאר = זווית_רדאר + 10
            SuperBit.Servo2(SuperBit.enServo.S3, זווית_רדאר)
            מרחק = sonar.ping(
            DigitalPin.P1,
            DigitalPin.P2,
            PingUnit.Centimeters
            )
            music.play(music.tonePlayable(1000 - 6 * מרחק, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
            basic.pause(זמן_השהיה)
        }
        while (זווית_רדאר > 0) {
            זווית_רדאר = זווית_רדאר - 10
            SuperBit.Servo2(SuperBit.enServo.S3, זווית_רדאר)
            מרחק = sonar.ping(
            DigitalPin.P1,
            DigitalPin.P2,
            PingUnit.Centimeters
            )
            music.play(music.tonePlayable(1000 - 6 * מרחק, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
            basic.pause(זמן_השהיה)
        }
    }
})
