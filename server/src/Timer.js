
class Timer {

    constructor(options) {
        this.elapsedCount = 0
        this.duration = options.duration
        /* DEBUG
        this.elapsedCallback = () => {
            this.elapsedCount++
            console.log("Callback!", this.elapsedCount)
            options.elapsedCallback()
        }
        this.tickCallback = options.tickCallback ? () => {
            console.log("Tick:", this.remainingMs)
            options.tickCallback()
        } : undefined
        */
        this.startCallback = options.startCallback
        this.stopCallback = options.stopCallback
        this.elapsedCallback = options.elapsedCallback
        this.tickCallback = options.tickCallback
        this.repeat = options.repeat
        this.immediate = options.immediate
        this.tick = 1000
    }

    async start() {
        this.startCallback && this.startCallback()
        if (this.immediate) {
            await this.elapsedCallback()
        }
        this.countdown()
    }
    countdown() {
        this.reset()
        if (this.tickCallback) this.tickCallback()
        if(this.intervalHandle) clearInterval(this.intervalHandle)

        this.intervalHandle = setInterval(async () => {
            this.remainingMs -= this.tick
            this.remaining -= 1
            if (this.remainingMs > 0) {
                if (this.tickCallback)
                    this.tickCallback()
            }
            if (this.remainingMs <= 0) {
                if (this.intervalHandle)
                    clearInterval(this.intervalHandle)
                await this.elapsedCallback()
                if (this.repeat) {
                    this.countdown()
                }
            }
        }, this.tick)
    }

    reset() {
        this.remainingMs = this.duration * 1000
        this.remaining = this.duration
    }
    stop() {
        this.stopCallback && this.stopCallback()
        clearInterval(this.intervalHandle)
    }

}

export default Timer