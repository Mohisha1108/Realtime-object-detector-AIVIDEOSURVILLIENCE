var video='';
var status = '';
var objects = [];
function setup(){
    canvas = createCanvas(450,450);
    canvas.center();
}
function preload(){
    video = createVideo('video.mp4');
    video.hide();
}
function start(){
    objectdetector = ml5.objectDetector('cocossd',modelLoaded);
    video.play();
    document.getElementById("status").innerHTML = "Status : Object is detecting";
}
function modelLoaded(){
    console.log("model is loaded");
    status = true;
    video.loop();
    video.speed(2);
    video.volume(0)
}
function draw(){
    image(video,0,0,450,450);
    r = random (255);
    g = random (255);
    b = random (255);
    if (status != ""){
        objectdetector.detect(video,gotResults);
        for (i = 0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status: Objects detected";
            document.getElementById("number_of objects").innerHTML = "Number of objects "+objects.length;

            fill(r,g,b)
            stroke(r,g,b)
            percentage = floor(objects[i].confidence * 100)
            text(objects[i].label+percentage+"%",objects[i].x,objects[i].y)
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}