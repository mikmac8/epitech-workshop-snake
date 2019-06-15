
// --------------------------------
// ------- GLOBAL VARIABLES -------
// --------------------------------

// size of square tiles in pixels
const SQUARE_SIZE = 20;

// Informations about the game status
const game = {
    status: "playing",
    score: 0,
    speed: 150
}

// Game boards characteristcs
const board_color="yellow"
const board_width=20
const board_heigths=20

// Snake characteristics
const snake={
    color:"purple",
    body_color:"grey",
    border_color:"orange",
    x:board_width/2,
    y:board_heigths/2,
    direction:RIGHT,
    lenght:3,
    body:[
        {x:board_width/2, y:board_heigths/2},
        {x:board_width/2, y:board_heigths/2},
        {x:board_width/2, y:board_heigths/2},
    ]

}

// fruit object
const fruit={
    color:"red",
    border_color:"orange",
    x:get_random_number(0,board_width-1),
    y:get_random_number(0,board_heigths-1)
}
// -------------------------
// ------- FUNCTIONS -------
// -------------------------

// Main Drawing function, you should put all of the things that you want to draw in this function
function draw() {
draw_board(board_width,board_heigths,board_color)
draw_fruit()
draw_snake()
}

// Main loop function, this function is called every "game.speed" milliseconds.
function loop() {
    if (game.status === "playing"){
        move_snake();

        const fruit_eaten=isSnakeonFruit();
    if(fruit_eaten===true){
        game.score = game.score+10;
        update_score(game.score)
        fruit.x=get_random_number(0,board_width-1);
        fruit.y=get_random_number(0,board_heigths-1);
         snake.lenght = snake.lenght + 1
    }
    snake_body_movement(snake.body,snake.lenght, {x:snake.x,y:snake.y}, fruit_eaten)
    }
  
}

// This function is called when a key is pressed
function onKeyDown(key_pressed) {
if(key_pressed===ARROW_DOWN && snake.direction !== UP){snake.direction=DOWN}
if(key_pressed===ARROW_UP && snake.direction !== DOWN){snake.direction=UP}
if(key_pressed===ARROW_RIGHT && snake.direction !== LEFT){snake.direction=RIGHT}
if(key_pressed===ARROW_LEFT && snake.direction !== RIGHT){snake.direction=LEFT}
}

// --- Functions that they will have to do ---

// Handle the snake
function draw_snake(){
    draw_square(snake.x,snake.y,snake.color,snake.border_color)
    draw_snake_body(snake.body, snake.lenght,snake.body_color)
}

function move_snake(){
    if (snake.direction===UP ) {
        if (snake.y===0){
            snake.y=board_heigths - 1
        } else {
            snake.y=snake.y-1
        }
        }
    if (snake.direction===RIGHT && snake.direction !== LEFT) {
        if (snake.x===board_width-1){
            snake.x=0
        } else {
            snake.x=snake.x+1
        }
    }
    if(snake.direction===DOWN && snake.direction !== UP) {
        if (snake.y===board_heigths-1){
            snake.y=0
        } else {
            snake.y=snake.y+1
        }
         }
    if(snake.direction===LEFT && snake.direction !== RIGHT) {
        if (snake.x===0){
            snake.x=board_width - 1
        } else {
        snake.x=snake.x-1}
    }
}
// Handle the fruit
function draw_fruit(){
    draw_square(fruit.x,fruit.y,fruit.color,fruit.border_color)
}

function isSnakeonFruit(){
    if(snake.x == fruit.x && snake.y == fruit.y){
        console.log("fruit")
        return true;
    }
    else 
    return false
}