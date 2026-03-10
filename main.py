זווית_רדאר = 0
זמן_השהיה = 0
רדאר_פועל = 0
מרחק = 0
מרחק_גילוי_מקסימאלי = 0
זווית_סריקה_מקסימאלית = 0

def on_button_pressed_a():
    global זווית_רדאר, זמן_השהיה, רדאר_פועל
    זווית_רדאר = 0
    זמן_השהיה = 100
    SuperBit.servo2(SuperBit.enServo.S3, זווית_רדאר)
    basic.pause(1000)
    רדאר_פועל = 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global רדאר_פועל
    רדאר_פועל = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_forever():
    if מרחק < מרחק_גילוי_מקסימאלי:
        music.play(music.create_sound_expression(WaveShape.SINE,
                5000,
                1,
                255,
                255,
                500,
                SoundExpressionEffect.VIBRATO,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.UNTIL_DONE)
basic.forever(on_forever)

def on_forever2():
    global מרחק, זווית_סריקה_מקסימאלית, מרחק_גילוי_מקסימאלי, זווית_רדאר
    מרחק = 1000
    זווית_סריקה_מקסימאלית = 90
    מרחק_גילוי_מקסימאלי = 100
    while רדאר_פועל == 1:
        while זווית_רדאר < זווית_סריקה_מקסימאלית:
            זווית_רדאר = זווית_רדאר + 10
            SuperBit.servo2(SuperBit.enServo.S3, זווית_רדאר)
            מרחק = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.CENTIMETERS)
            music.play(music.tone_playable(1000 - 6 * מרחק, music.beat(BeatFraction.SIXTEENTH)),
                music.PlaybackMode.UNTIL_DONE)
            basic.pause(זמן_השהיה)
        while זווית_רדאר > 0:
            זווית_רדאר = זווית_רדאר - 10
            SuperBit.servo2(SuperBit.enServo.S3, זווית_רדאר)
            מרחק = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.CENTIMETERS)
            music.play(music.tone_playable(1000 - 6 * מרחק, music.beat(BeatFraction.SIXTEENTH)),
                music.PlaybackMode.UNTIL_DONE)
            basic.pause(זמן_השהיה)
basic.forever(on_forever2)
