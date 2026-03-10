רדאר_פועל = 0

def on_button_pressed_a():
    global רדאר_פועל
    רדאר_פועל = 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global רדאר_פועל
    רדאר_פועל = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_forever():
    while רדאר_פועל == 1:
        music.play(music.tone_playable(1000 - 6 * sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.CENTIMETERS),
                music.beat(BeatFraction.SIXTEENTH)),
            music.PlaybackMode.UNTIL_DONE)
basic.forever(on_forever)
