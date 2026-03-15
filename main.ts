let זווית_רדאר = 0
let זמן_השהיה = 0
let רדאר_פועל = 0
let זווית_תותח = 0
let מרחק = 0
let זווית_סריקה_מקסימאלית = 0
let מרחק_גילוי_מקסימאלי = 0
input.onButtonPressed(Button.A, function () {
    זווית_רדאר = 45
    זמן_השהיה = 200
    SuperBit.Servo2(SuperBit.enServo.S3, זווית_רדאר)
    basic.pause(1000)
    רדאר_פועל = 1
})
function חשב_זווית_תותח (זווית_רדאר: number) {
    זווית_תותח = 270 - זווית_רדאר * 2
    זווית_תותח = זווית_תותח - 90
}
input.onButtonPressed(Button.AB, function () {
	
})
input.onButtonPressed(Button.B, function () {
    if (רדאר_פועל == 0) {
        SuperBit.MotorRun(SuperBit.enMotors.M1, -255)
        basic.pause(1000)
        SuperBit.MotorRun(SuperBit.enMotors.M1, 0)
    } else if (רדאר_פועל == 1) {
        רדאר_פועל = 0
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
basic.forever(function () {
    if (מרחק < מרחק_גילוי_מקסימאלי) {
        music.play(music.createSoundExpression(WaveShape.Sine, 5000, 1, 255, 255, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        חשב_זווית_תותח(זווית_רדאר)
        SuperBit.Servo2(SuperBit.enServo.S5, זווית_תותח)
        SuperBit.MotorRun(SuperBit.enMotors.M1, 255)
        basic.pause(1000)
        SuperBit.MotorRun(SuperBit.enMotors.M1, 0)
    }
})
