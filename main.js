Peter_pan_song="";
Harry_potter_theme_song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
song_Peter_pan="";

function preload(){
 Peter_pan_song= loadSound("music2.mp3");
 Harry_potter_theme_song= loadSound("music.mp3")

}

function setup(){
    canvas=createCanvas(600,550);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,550);

    fill("#00FF00");
    stroke("#00FF00");

    song_Peter_pan=Peter_pan_song.isPlaying();
    console.log(song_Peter_pan);

    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        Harry_potter_theme_song.stop();
        if(song_Peter_pan==false){
            Peter_pan_song.play();
        }
        else{
            document.getElementById("song_id").innerHTML="Song Name: Peter Pan Song";
        }
    }
}

function modelLoaded(){
    console.log("PoseNet is Initialized!");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("score left wrist= "+scoreLeftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("left wrist x= "+leftWristX+" left wrist y= "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("right wrist x= "+rightWristX+" right wrist y= "+rightWristY);
    }
}

