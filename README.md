# Unpregnant

Unpregnant is a game developed in Javascript with [p5.js](https://p5js.org/) and [p5.play](https://molleindustria.github.io/p5.play/), in this game you are an ovule and need to avoid sperm, the longer you survive the better.

[Click to play!](https://antoniopedro9.github.io/unpregnant/)

## How it works:

In p5.js we have two main prebuilt functions, `setup()` and `draw()`.

### setUp()

The `setup()` function is executed at the beginning of the program, in this project I used it to:

- Create the canvas where objects will be rendered
- Instantiate game objects
- Restart the game

### draw()

The `draw()` function is executed at each frame update, we can consider it as the [game loop](https://gamedevelopment.tutsplus.com/articles/gamedev-glossary-what-is-the-game-loop--gamedev-2469), in this project I used it to:

- Render game entities on screen
- Check the game's business rules
