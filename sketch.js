

// Runs JS function on receiving the following Arduno input
let arduino   = new ArduinoEvents([
  {message:"Image starts: ", handler: reset},
  {message:"p ",         handler: addPixel},
    {message:"Classification: ",         handler: classification},
      {message:"Confidence: ",         handler: log},
]);

  let savedImages = [];
  let scale = 0;
  let inputBuffer = [];
  let currentImage = [];
  let cam_width;
  let cam_height;
  let px = 0;
  let py = 0;
  let sizex = 0;
    let sizey = 0;
    let banner = "";

  let class_labels = [];
  let numer_examples = 0;
  let example_classes = [];
  let example_images = [];

function reset(w, h, type){
banner = "Arduino live image "+w+"x"+h;
  scale = 320/w;
  inputBuffer = [];
  cam_width = w;
  cam_height = h;
  px = 0;
  py = 0;
  sizex = (320/w);
  sizey = (240/h);
  console.log(sizex,sizey)
}

if(window.location.href.indexOf("test") > -1){
  test(arduino.parser);
}

function addPixel(r,g,b,c){
//console.log(cam_width, cam_height)
inputBuffer.push([r,g,b]);
}

function addPixel(p){
// grayscale
inputBuffer.push([p,p,p]);
}

function log(m){
  console.log(m);
}

function classification(m){
  console.log(m);

  banner = "KNN classifier output: "+m;
}

function setup() {
  var canvas = createCanvas(1280, 500);
  canvas.parent('p5-sketch');
  strokeWeight(1);
  textSize(24);
  textAlign(LEFT);


input = createInput();
input.position(12, 360);
input.value("Label name");

button = createButton('Capture image');
button.position(input.x + input.width, 360);
button.mousePressed(captureImage);

}

function draw() {
  // Draw banner
  px=0;py=0;
  if (inputBuffer.length == cam_width*cam_height){
    currentImage = inputBuffer;
    //background(0x88);
  currentImage.forEach((p) => {
      noStroke();
    fill(color(p[0],p[1],p[2]));
    rect(12+px*sizex,32+py*sizey,sizex,sizey);
   px++;
   if (px>=cam_width) {px=0;py++;}
  })
  noStroke();
  fill("#000000");
  rect(12,10,200,20);
  fill('#eee')
  textSize(12);
  text(banner, 12,20);
}
}

function captureImage() {


  // Get class number, or create new class
  if (class_labels.indexOf(input.value())==-1) {
    class_labels.push(input.value());
    noStroke();
    fill('#eee')
    textSize(8);
    text(input.value(), 370,30+class_labels.indexOf(input.value())*80);
  }
  let thisClass = class_labels.indexOf(input.value());
  example_classes.push(thisClass);

  let thisImageArray = "{"+currentImage.flat().map(n => "0x"+("00" + parseInt(n).toString(16)).substr(-2)).join(",")+"}";
  example_images.push(thisImageArray);

  serialMonitor.textContent =  "const int input_size = 3 * "+cam_width+" * "+cam_height+";\n"
  serialMonitor.textContent += "KNNClassifier myKNN(input_size);\n"
  serialMonitor.textContent += "const int number_examples = "+example_images.length+";\n"
  serialMonitor.textContent += "const int example_classes[] = {"+example_classes.join(",")+"};\n"
  serialMonitor.textContent += "const char* classes[] = {"+(class_labels.map(x=>"\""+x+"\"")).join(",")+"};\n"
  serialMonitor.textContent += "const float example_images[][input_size] =\n{\n"+example_images.join(",\n")+"\n};\n"

  // Display thumbnail
  var oy = 32 + thisClass * 80;
  var ox = 280 + (example_classes.filter(x=>x==thisClass).length)*90;
  var px = 0; var py = 0;
  currentImage.forEach((p) => {
    fill(color(p[0],p[1],p[2]));
    rect(ox+px*5,oy+py*5,4,4);
   px++;
   if (px>=cam_width) {px=0;py++;}
  })

}
