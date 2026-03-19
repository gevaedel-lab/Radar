def on_gesture_tilt_right():
    radio.send_value("כיוון", 1)
    basic.show_leds("""
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        """)
    music.play(music.string_playable("F - - - F - - - ", 200),
        music.PlaybackMode.UNTIL_DONE)
input.on_gesture(Gesture.TILT_RIGHT, on_gesture_tilt_right)

def on_button_pressed_a():
    radio.send_value("כפתור", 1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def חשב_זווית_תותח(זווית_רדאר: number):
    global זווית_תותח
    זווית_תותח = 270 - זווית_רדאר * 2
    זווית_תותח = זווית_תותח - 90

def on_gesture_tilt_left():
    radio.send_value("כיוון", -1)
    basic.show_leds("""
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        """)
    music.play(music.string_playable("C5 - - - C5 - - - ", 200),
        music.PlaybackMode.UNTIL_DONE)
input.on_gesture(Gesture.TILT_LEFT, on_gesture_tilt_left)

def on_button_pressed_ab():
    global הפעלת_נסיעה
    if הפעלת_נסיעה == 0:
        הפעלת_נסיעה = 1
        radio.send_value("מהירות", -255)
        basic.show_leds("""
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            """)
    elif הפעלת_נסיעה == 1:
        הפעלת_נסיעה = 0
        basic.show_leds("""
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            """)
        radio.send_value("מהירות", 0)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    radio.send_value("כפתור", 2)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_value(name, value):
    global זווית_רדאר2, זמן_השהיה, רדאר_פועל, מהירות, כיוון
    if 1 == value and "כפתור" == name:
        זווית_רדאר2 = 55
        זמן_השהיה = 200
        SuperBit.servo2(SuperBit.enServo.S3, זווית_רדאר2)
        basic.pause(1000)
        רדאר_פועל = 1
    elif 2 == value and "כפתור" == name:
        if רדאר_פועל == 0:
            SuperBit.motor_run(SuperBit.enMotors.M1, -255)
            basic.pause(1000)
            SuperBit.motor_run(SuperBit.enMotors.M1, 0)
        elif רדאר_פועל == 1:
            רדאר_פועל = 0
    elif "מהירות" == name:
        מהירות = value
        כיוון = 0
    elif "כיוון" == name:
        כיוון = value
radio.on_received_value(on_received_value)

מרחק_גילוי_מקסימאלי = 0
זווית_סריקה_מקסימאלית = 0
מרחק = 0
קול = 0
כיוון = 0
מהירות = 0
רדאר_פועל = 0
זמן_השהיה = 0
זווית_רדאר2 = 0
זווית_תותח = 0
הפעלת_נסיעה = 0
radio.set_group(108)
הפעלת_נסיעה = 0

def on_forever():
    global קול, מרחק, זווית_סריקה_מקסימאלית, מרחק_גילוי_מקסימאלי, זווית_רדאר2
    קול = 0
    מרחק = 1000
    זווית_סריקה_מקסימאלית = 110
    מרחק_גילוי_מקסימאלי = 100
    while רדאר_פועל == 1:
        while זווית_רדאר2 < זווית_סריקה_מקסימאלית:
            זווית_רדאר2 = זווית_רדאר2 + 10
            SuperBit.servo2(SuperBit.enServo.S3, זווית_רדאר2)
            מרחק = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.CENTIMETERS)
            if קול == 1:
                music.play(music.tone_playable(1000 - 6 * מרחק, music.beat(BeatFraction.SIXTEENTH)),
                    music.PlaybackMode.UNTIL_DONE)
            basic.pause(זמן_השהיה)
        while זווית_רדאר2 > 0:
            זווית_רדאר2 = זווית_רדאר2 - 10
            SuperBit.servo2(SuperBit.enServo.S3, זווית_רדאר2)
            מרחק = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.CENTIMETERS)
            if קול == 1:
                music.play(music.tone_playable(1000 - 6 * מרחק, music.beat(BeatFraction.SIXTEENTH)),
                    music.PlaybackMode.UNTIL_DONE)
            basic.pause(זמן_השהיה)
basic.forever(on_forever)

def on_forever2():
    if מהירות > 0:
        if כיוון == 1:
            basic.show_leds("""
                . . # . .
                . . . # .
                # # # # #
                . . . # .
                . . # . .
                """)
            SuperBit.motor_run(SuperBit.enMotors.M2, מהירות - 30)
            SuperBit.motor_run(SuperBit.enMotors.M3, מהירות)
        elif כיוון == -1:
            basic.show_leds("""
                . . # . .
                . # . . .
                # # # # #
                . # . . .
                . . # . .
                """)
            SuperBit.motor_run(SuperBit.enMotors.M2, מהירות)
            SuperBit.motor_run(SuperBit.enMotors.M3, מהירות - 30)
        elif כיוון == 0:
            basic.show_leds("""
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                """)
            SuperBit.motor_run(SuperBit.enMotors.M2, מהירות)
            SuperBit.motor_run(SuperBit.enMotors.M3, מהירות)
        else:
            basic.show_leds("""
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                """)
            SuperBit.motor_run(SuperBit.enMotors.M2, מהירות)
            SuperBit.motor_run(SuperBit.enMotors.M3, מהירות)
    elif מהירות == 0:
        basic.show_leds("""
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            """)
        SuperBit.motor_run(SuperBit.enMotors.M2, 0)
        SuperBit.motor_run(SuperBit.enMotors.M3, 0)
basic.forever(on_forever2)

def on_forever3():
    if מרחק < מרחק_גילוי_מקסימאלי:
        if קול >= 1:
            music.play(music.create_sound_expression(WaveShape.SINE,
                    5000,
                    1,
                    255,
                    255,
                    500,
                    SoundExpressionEffect.VIBRATO,
                    InterpolationCurve.LINEAR),
                music.PlaybackMode.UNTIL_DONE)
        חשב_זווית_תותח(זווית_רדאר2)
        SuperBit.servo2(SuperBit.enServo.S5, זווית_תותח)
        SuperBit.motor_run(SuperBit.enMotors.M1, 255)
        basic.pause(1000)
        SuperBit.motor_run(SuperBit.enMotors.M1, 0)
basic.forever(on_forever3)
