
var Gpio = require('onoff').Gpio;

const ReadMotion = {

    start: (pinNumber, intervalMs, callback) => {

        if (isNaN(options.pinNumber)) throw new Error("Pin not specified.")
        const pin = new Gpio(pinNumber, "in")
        let MOTION_DETECTED = false
        this.intervalHandle = setInterval(async () => {
            const value = await pin.read()
            const current = value === 1
            if (MOTION_DETECTED != current) {
                MOTION_DETECTED = current
                callback()
            }
        }, intervalMs)

    },
    stop: () => {
        clearInterval(this.intervalHandle)
    }
}
