
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("blinkB").addEventListener("click",flipLed);
	document.getElementById("bkinkT").addEventListener("click",setBlinkTime);
	document.getElementById("reload").addEventListener("click",reload);
})

var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
var pin = gpioController.openPin(47);
var currentValue = Windows.Devices.Gpio.GpioPinValue.high;
pin.write(currentValue);
pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output);
var timed = false;
var blinkInterval = 500;

function flipLed(){
	console.log("Flip Led Invoked, Current Value: " + currentValue);
    if (currentValue == Windows.Devices.Gpio.GpioPinValue.high) {
        console.log("setting pin value low");
        document.getElementById("edgeLogo").className = "";
        currentValue = Windows.Devices.Gpio.GpioPinValue.low;
    } else {
    	console.log("Setting value to high");
    	document.getElementById("edgeLogo").className = "myImage";
        currentValue = Windows.Devices.Gpio.GpioPinValue.high;
    }
    pin.write(currentValue);
    if(timed) {
    	setTimeout(flipLed, blinkInterval);
    }
}

function setBlinkTime() {
	if (timed) {
		timed = false;
	}
	else {
		timed = true;
		flipLed();
	}
}

function reload() {
	document.location.reload(true);
}