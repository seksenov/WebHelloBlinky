
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("blinkB").addEventListener("click",flipLed);
	document.getElementById("bkinkT").addEventListener("click",setBlinkTime);
	document.getElementById("reload").addEventListener("click",reload);
    document.getElementById("web-on-pi-home").addEventListener("click",goHome);
	$( "#slider" ).slider();
})

var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
var pin = gpioController.openPin(47);
var currentValue = Windows.Devices.Gpio.GpioPinValue.high;
pin.write(currentValue);
pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output);
var timed = false;
var blinkInterval = 500;
var timeout;

function goHome() {
    console.log("GoHome");
    pin.close();
    window.location.href = "webonpi:home";
}

function flipLed(){
	console.log("Flip Led Invoked, Current Value: " + currentValue);
    if (currentValue == Windows.Devices.Gpio.GpioPinValue.high) {
        console.log("setting pin value low");
        document.getElementById("edgeLogo").className = "myImage";
        currentValue = Windows.Devices.Gpio.GpioPinValue.low;
    } else {
    	console.log("Setting value to high");
    	document.getElementById("edgeLogo").className = "";
        currentValue = Windows.Devices.Gpio.GpioPinValue.high;
    }
    pin.write(currentValue);
    if(timed) {
    	var multiplier = 1 - $('#slider').slider("option", "value") / 100;
    	var frequency = blinkInterval * multiplier;
    	if (timeout) {
    		clearTimeout(timeout);
    	}
    	timeout = setTimeout(flipLed, frequency);
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