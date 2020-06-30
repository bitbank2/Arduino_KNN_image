# Arduino_KNN_image
Simple machine vision using KNN on an [Arduino Nano BLE sense](https://store.arduino.cc/usa/nano-33-ble-sense) and a OV767x low-cost VGA camera module.

An Arduino sketch captures image examples which can be imported to the KNN classifier and recognized. A web page that connects to the Arduino using web serial displays a visualization of this using p5js and auto generates Arduino code of the example image data array to paste back into your sketch.

[Full write up here](https://blog.arduino.cc/2020/06/18/simple-machine-learning-with-arduino-knn/). 


## Prerequisites 
  
  * Install the Arduino KNN library following these [instructions](https://blog.arduino.cc/2020/06/18/simple-machine-learning-with-arduino-knn/)

  * Connect the Arduino and Camera and install the library following these [instructions](https://blog.arduino.cc/2020/06/24/machine-vision-with-low-cost-camera-modules/). 

  
## Usage
  
  * Download this project and unzip it
  
  * Install and open the [Arduino IDE](https://www.arduino.cc/en/main/software) or [Arduino Create](https://create.arduino.cc/projecthub/Arduino_Genuino/getting-started-with-arduino-web-editor-on-various-platforms-4b3e4a?f=1)

  * In the Arduino IDE open the [CameraKNN.ino](https://blog.arduino.cc/2020/06/18/simple-machine-learning-with-arduino-knn/) project file, compile and upload to your board

  * In Google Chrome load index.html in the project folder. The sketch currently relies on Web Serial so is Chrome only at this time.
  
  
### Connect the browser to the board

  * Connect the Chrome browser to the Arduino board by hitting the `Connect to Arduino` button
  
  * The browser will pop-up with another window to confirm - select the Arduino Nano BLE Sense and press `Connect`
  
  
  
