import VideoPlayer from './VideoPlayer'
import Timer from './Timer'
import ReadMotion from './ReadMotion'


class App {
    constructor(options) {
        this.player = new VideoPlayer()
        this.kidScareFiles = options.kidScareFiles
        this.adultScareFiles = options.adultScareFiles
        this.roamFiles = options.roamFiles
        this.motion = new ReadMotion()
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
        this.motion.start(process.env.MOTION_PIN, process.env.MOTION_INTERVAL, () => this.randomScare())

    }
    async randomRoam() {
        console.log("randomRoam")
        if (Array.isArray(this.roamFiles) && this.roamFiles.length > 0) {
            const ghost = Math.floor(Math.random() * this.roamFiles.length)
            const file = this.roamFiles[ghost]
            await this.player.play(file)
        }
        else {
            await Promise.resolve()
        }
    }
    async randomScare() {
        console.log("randomScare", this)
        if (Array.isArray(this.adultScareFiles) && this.adultScareFiles.length > 0) {
            const ghost = Math.floor(Math.random() * this.adultScareFiles.length)
            const file = this.adultScareFiles[ghost]
            await this.player.play(file)
        }
        else {
            await Promise.resolve()
        }
    }
    tickCallback() {
        console.log(this.roamTimer?.remaining)
    }

}

export default App