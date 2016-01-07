
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("blinkB").addEventListener("click",flipLed);
	document.getElementById("reload").addEventListener("click",reload);
})

var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
var pin = gpioController.openPin(5);
var currentValue = Windows.Devices.Gpio.GpioPinValue.high;
pin.write(currentValue);
pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output);

function flipLed(){
	console.log("Flip Led Invoked, Current Value: " + currentValue);
    if (currentValue == Windows.Devices.Gpio.GpioPinValue.high) {
        console.log("setting pin value low");
        currentValue = Windows.Devices.Gpio.GpioPinValue.low;
    } else {
    	console.log("Setting value to high");
        currentValue = Windows.Devices.Gpio.GpioPinValue.high;
    }
    pin.write(currentValue);
    //setTimeout(flipLed, 500);
}

function reload() {
	document.location.reload(true);
}