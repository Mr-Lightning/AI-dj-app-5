leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
score_left_wrist=0;
score_right_wrist=0;
song="";
function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}


function draw(){
image(video,0,0,600,500);
fill('red');
stroke('red');
circle(rightWristX,rightWristY,20);
if(score_left_wrist>0.2)
{
circle(leftWristX,leftWristY,20)
remove_decimal=floor(leftWristY);
volume=remove_decimal/500;
document.getElementById('volume').innerHTML="volume ="+volume;
song.setVolume(volume);
}
}


function preload(){
song=loadSound("music.mp3");
}

function play(){
song.play();
song.setVolume(1);
song.rate(1);
}

function gotPoses(results){
if(results.length>0){
    console.log(results);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log('LeftWristX='+leftWristX+'LeftWristY='+leftWristY);
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log('RightWristX='+rightWristX+'RightWristY='+rightWristY);
    score_left_wrist=results[0].pose.keypoints[9].score;
    console.log('score left wrist=' + score_left_wrist);
    score_right_wrist=results[0].pose.keypoints[10].score;
    console.log('score right wrist=' + score_right_wrist);
}
}

function modelLoaded(){
console.log('PoseNet is initialized');
}