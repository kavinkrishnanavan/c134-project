let video;
let model;
let statusP;
let alertSound;

function preload() {
    alertSound = loadSound('alert.mp3'); // Replace with your alert sound file
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    statusP = select('#status');
    
    loadCocoModel();
}

async function loadCocoModel() {
    model = await cocoSsd.load();
    console.log('Model loaded successfully');
}

function draw() {
    image(video, 0, 0, width, height);
    detectBaby();
}

async function detectBaby() {
    const predictions = await model.detect(video.elt);
    let babyDetected = false;
    
    for (let i = 0; i < predictions.length; i++) {
        if (predictions[i].class === 'person') {
            babyDetected = true;
            break;
        }
    }
    
    if (babyDetected) {
        statusP.html('Status: Baby detected');
        alertSound.stop();
    } else {
        statusP.html('Status: Baby not detected');
        if (!alertSound.isPlaying()) {
            alertSound.play();
        }
    }
    
    if (predictions.length === 0) {
        statusP.html('Status: Baby not detected');
        if (!alertSound.isPlaying()) {
            alertSound.play();
        }
    }
}
