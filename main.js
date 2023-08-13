video="";
status="";
objects=[];
function preload(){
}

    function setup(){
        canvas=createCanvas(400, 320);
        canvas.center();
        video=createCapture(VIDEO);
        video.size(430, 380);
        video.hide();
       
    }

function draw(){
    image(video, 0, 0, 400, 320);
     if(status !="")
    {
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="Object Detected";
            fill("#FF0000");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}


function gotResult(error, results){
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status = Detecting Objects";
}

function modelLoaded(){
    status=true;
}