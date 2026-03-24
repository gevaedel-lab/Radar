input.onGesture(Gesture.ScreenUp, function () {
    radio.sendValue("מהירות", -255)
    basic.pause(1000)
    radio.sendValue("כיוון", 0)
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
})
input.onGesture(Gesture.TiltRight, function () {
    radio.sendValue("כיוון", 1)
    basic.showLeds(`
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        `)
    music.play(music.stringPlayable("F - - - F - - - ", 200), music.PlaybackMode.UntilDone)
})
function חישוב_גילוי () {
    if (מרחק_גילוי_RADAR < מרחק_גילוי_מקסימאלי) {
        if (קול >= 1) {
            music.play(music.createSoundExpression(WaveShape.Sine, 5000, 1, 255, 255, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        }
        חשב_זווית_תותח(זווית_רדאר)
        SuperBit.Servo2(SuperBit.enServo.S5, זווית_תותח)
        basic.pause(250)
        בצע_יריה()
    }
}
input.onButtonPressed(Button.A, function () {
    radio.sendValue("כפתור", 1)
})
function חשב_זווית_תותח (זווית_רדאר: number) {
    זווית_תותח = 270 - זווית_רדאר * 2
    זווית_תותח = זווית_תותח - 90
}
input.onGesture(Gesture.TiltLeft, function () {
    radio.sendValue("כיוון", -1)
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
    music.play(music.stringPlayable("C5 - - - C5 - - - ", 200), music.PlaybackMode.UntilDone)
})
input.onButtonPressed(Button.AB, function () {
    if (הפעלת_נסיעה == 0) {
        הפעלת_נסיעה = 1
        radio.sendValue("תזוזה", 1)
    } else if (הפעלת_נסיעה == 1) {
        הפעלת_נסיעה = 0
        מהירות = 0
        basic.showLeds(`
            # # # # #
            # . . . #
            # # # # #
            # . . . #
            # # # # #
            `)
        radio.sendValue("מהירות", 0)
        radio.sendValue("תזוזה", 0)
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue("כפתור", 2)
})
function בצע_יריה () {
    SuperBit.MotorRun(SuperBit.enMotors.M1, 255)
    basic.pause(1000)
    SuperBit.MotorRun(SuperBit.enMotors.M1, 0)
}
radio.onReceivedValue(function (name, value) {
    if (1 == value && "כפתור" == name) {
        זווית_רדאר = 55
        זמן_השהיה = 200
        SuperBit.Servo2(SuperBit.enServo.S3, זווית_רדאר)
        basic.pause(1000)
        רדאר_פועל = 1
        basic.showLeds(`
            . . # . .
            . # # . .
            . . # . .
            . . # . .
            . # # # .
            `)
    } else if (2 == value && "כפתור" == name) {
        if (רדאר_פועל == 0) {
            SuperBit.MotorRun(SuperBit.enMotors.M1, -255)
            basic.pause(1000)
            SuperBit.MotorRun(SuperBit.enMotors.M1, 0)
        } else if (רדאר_פועל == 1) {
            רדאר_פועל = 0
        }
        basic.showLeds(`
            . # # . .
            # . . # .
            . . # . .
            . # . . .
            # # # # .
            `)
    } else if ("מהירות" == name) {
        מהירות = value
        basic.showLeds(`
            # . . . #
            # # . . #
            # . # . #
            # . . # #
            # . . . #
            `)
    } else if ("כיוון" == name) {
        כיוון = value
        basic.showLeds(`
            . # # # .
            . . . . #
            . . . . #
            . . . . #
            . # # # .
            `)
    } else if ("תזוזה" == name) {
        הפעלת_נסיעה = value
        basic.showLeds(`
            . # # # .
            . . . . #
            . . . . #
            . # . . #
            . # . . #
            `)
    }
})
let זווית_סריקה_מקסימאלית = 0
let כיוון = 0
let רדאר_פועל = 0
let זמן_השהיה = 0
let מהירות = 0
let זווית_תותח = 0
let זווית_רדאר = 0
let קול = 0
let מרחק_גילוי_מקסימאלי = 0
let מרחק_גילוי_RADAR = 0
let הפעלת_נסיעה = 0
radio.setGroup(108)
הפעלת_נסיעה = 0
basic.forever(function () {
    קול = 0
    מרחק_גילוי_RADAR = 1000
    זווית_סריקה_מקסימאלית = 110
    מרחק_גילוי_מקסימאלי = 100
    while (רדאר_פועל == 1) {
        while (זווית_רדאר < זווית_סריקה_מקסימאלית) {
            זווית_רדאר = זווית_רדאר + 10
            SuperBit.Servo2(SuperBit.enServo.S3, זווית_רדאר)
            מרחק_גילוי_RADAR = sonar.ping(
            DigitalPin.P1,
            DigitalPin.P2,
            PingUnit.Centimeters
            )
            if (קול == 1) {
                music.play(music.tonePlayable(1000 - 6 * מרחק_גילוי_RADAR, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
            }
            חישוב_גילוי()
            basic.pause(זמן_השהיה)
        }
        while (זווית_רדאר > 0) {
            זווית_רדאר = זווית_רדאר - 10
            SuperBit.Servo2(SuperBit.enServo.S3, זווית_רדאר)
            מרחק_גילוי_RADAR = sonar.ping(
            DigitalPin.P1,
            DigitalPin.P2,
            PingUnit.Centimeters
            )
            if (קול == 1) {
                music.play(music.tonePlayable(1000 - 6 * מרחק_גילוי_RADAR, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
            }
            חישוב_גילוי()
            basic.pause(זמן_השהיה)
        }
    }
})
basic.forever(function () {
    if (הפעלת_נסיעה == 1) {
        if (מהירות != 0) {
            if (כיוון == 1) {
                basic.showLeds(`
                    . . # . .
                    . . . # .
                    # # # # #
                    . . . # .
                    . . # . .
                    `)
                SuperBit.MotorRun(SuperBit.enMotors.M2, מהירות + 150)
                SuperBit.MotorRun(SuperBit.enMotors.M3, מהירות)
            } else if (כיוון == -1) {
                basic.showLeds(`
                    . . # . .
                    . # . . .
                    # # # # #
                    . # . . .
                    . . # . .
                    `)
                SuperBit.MotorRun(SuperBit.enMotors.M2, מהירות)
                SuperBit.MotorRun(SuperBit.enMotors.M3, מהירות + 150)
            } else if (כיוון == 0) {
                basic.showLeds(`
                    . . # . .
                    . # # # .
                    # . # . #
                    . . # . .
                    . . # . .
                    `)
                SuperBit.MotorRun(SuperBit.enMotors.M2, מהירות)
                SuperBit.MotorRun(SuperBit.enMotors.M3, מהירות)
            } else {
                basic.showLeds(`
                    . . # . .
                    . # # # .
                    # . # . #
                    . . # . .
                    . . # . .
                    `)
                SuperBit.MotorRun(SuperBit.enMotors.M2, מהירות)
                SuperBit.MotorRun(SuperBit.enMotors.M3, מהירות)
            }
        } else if (מהירות == 0) {
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `)
            SuperBit.MotorRun(SuperBit.enMotors.M2, 0)
            SuperBit.MotorRun(SuperBit.enMotors.M3, 0)
        }
    }
})
