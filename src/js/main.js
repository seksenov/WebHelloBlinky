
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

function flipLed(){
	console.log("Flip Led Invoked, Current Value: " + currentValue);
    if (currentValue == Windows.Devices.Gpio.GpioPinValue.high) {
        console.log("setting pin value low");
        //document.getElementById("edgeLogo").removeClass();
        currentValue = Windows.Devices.Gpio.GpioPinValue.low;
    } else {
    	console.log("Setting value to high");
        currentValue = Windows.Devices.Gpio.GpioPinValue.high;
    }
    pin.write(currentValue);
    if(timed) {
    	setTimeout(flipLed, 500);
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