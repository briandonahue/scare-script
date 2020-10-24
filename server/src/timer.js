
class Timer {

    constructor(options) {
        this.duration = options.duration
        this.elapsedCallback = options.elapsedCallback
        this.tick = options.tick || options.duration
        this.tickCallback = options.tickCallback
        this.repeat = options.repeat

    }

    start() {
        this.remaining = this.duration
        this.intervalHandle = setInterval(() => {
            this.remaining -= this.tick
            if (this.remaining >= 0) {
                if (this.tickCallback) this.tickCallback()
            }
            if (this.remaining <= 0) {
                this.elapsedCallback()
                if (this.repeat) {
                    this.remaining = this.duration
                }
                else {
                    if (this.intervalHandle) clearInterval(this.intervalHandle)
                }
            }
        }, this.tick)
    }
    stop() {
        clearInterval(this.intervalHandle)
    }

}

export default Timer