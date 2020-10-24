
class Timer {

    constructor(options) {
        this.duration = options.duration
        this.elapsedCallback = options.elapsedCallback
        this.tick = options.tick || options.duration
        this.tickCallback = options.tickCallback
        //this.repeat = options.repeat

    }

    start() {
        this.remaining = this.duration
        this.intervalHandle = setInterval(() => {
            this.remaining -= this.tick
            console.log(this)
            if(this.remaining >=0) {
                if(this.tickCallback) this.tickCallback()
            }
            if(this.remaining <=0){
                if(this.intervalHandle) clearInterval(this.intervalHandle)
                this.elapsedCallback()
            }
        }, this.tick)
    }
}

export default Timer