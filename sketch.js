var hypnoticBall, hypnoticBallPosition;
var database, ballPos;

function setup(){
    database = firebase.database();
    console.log(database);

    createCanvas(500,500);

    hypnoticBall = createSprite(250,250,40,40);
    hypnoticBall.shapeColor = "red";

    hypnoticBallPosition = database.ref('ball/position');
    hypnoticBallPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");

    if(ballPos !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();
    }

}

function writePosition(x,y){
    database.ref('ball/position').set({
        x:hypnoticBall.x+x, y:hypnoticBall.y+y
    })
}

function readPosition(data){
    ballPos = data.val();
    hypnoticBall.x = ballPos.x;
    hypnoticBall.y = ballPos.y;
}

function showError(){
    console.log("error displayed");
}
