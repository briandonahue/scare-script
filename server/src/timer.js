
class Timer {

    constructor(options) {
        this.tick = options.tick
        this.duration = options.duration
        this.elapsedCallback = options.elapsedCallback
        this.tickCallback = options.tickCallback
        this.repeat = options.repeat

    }

    start() {
        if (!this.paused) {
            if (this.intervalHandle) clearInterval(this.intervalHandle)
            this.remaining = this.duration
        }
        this.intervalHandle = setInterval(() => {
            if (this.paused) return
            this.remaining -= this.tick
            if (this.remaining <= 0) {
                this.elapsedCallback()
                return
            }
        }, this.tick)

    }

    pause() {
        if (this.intervalHandle) {
            this.paused = true
        }
    }

    reset() {

    }

}

export default Timer