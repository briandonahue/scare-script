
import { Gpio } from 'onoff'

class ReadMotion {

    start(pinNumber, intervalMs, callback) {

        if (isNaN(pinNumber)) throw new Error("Pin not specified.")
        const pin = new Gpio(pinNumber, "in")
        let MOTION_DETECTED = false
        this.intervalHandle = setInterval(async () => {
            const value = await pin.read()
            const current = value === 1
            if (MOTION_DETECTED != current && !this.running) {
                this.running = true
                MOTION_DETECTED = current
                console.log(current ? "Motion detected!" : "Motion stopped.")
                await callback(current)
                this.running = false
            }
        }, intervalMs)

    }
    stop() {
        this.intervalHandle && clearInterval(this.intervalHandle)
    }
}

export default ReadMotion