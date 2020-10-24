import VideoPlayer from './VideoPlayer'
import Timer from './Timer'


class App {
    constructor(options) {
        this.player = new VideoPlayer()
        this.scareFiles = options.scareFiles
        this.roamFiles = options.roamFiles
    }
    start() {
        console.log("App started")
        this.roamTimer = new Timer({
            tickCallback: () => this.tickCallback(),
            duration: process.env.ROAM_COOLDOWN,
            elapsedCallback: () => this.randomRoam(),
            repeat: true,
            immediate: true
        })
        this.roamTimer.start()

    }
    randomRoam() {
        console.log("randomRoam")
        if (Array.isArray(this.roamFiles) && this.roamFiles.length > 0) {
            const ghost = Math.floor(Math.random() * this.roamFiles.length)
            const file = this.roamFiles[ghost]
            this.player.play(file)
        }
    }
    tickCallback() {
        console.log(this.roamTimer?.remaining)
    }

}

export default App