import VideoPlayer from './VideoPlayer'
import Timer from './Timer'
import ReadMotion from './ReadMotion'


class App {
    constructor(options) {
        this.player = new VideoPlayer()
        this.kidScareFiles = options.kidScareFiles
        this.adultScareFiles = options.adultScareFiles
        this.roamFiles = options.roamFiles
        this.kidMode = options.kidMode
    }
    start() {
        console.log("App started")
        this.motion = new ReadMotion()
        this.roamTimer = new Timer({
            tickCallback: () => this.tickCallback(),
            duration: process.env.ROAM_COOLDOWN,
            elapsedCallback: () => this.randomRoam(),
            repeat: true,
            immediate: true
        })
        this.roamTimer.start()
        this.motion.start(process.env.MOTION_PIN, process.env.MOTION_INTERVAL, () => this.safeScare())

    }
    async randomRoam() {
        console.log("randomRoam")
        this.roamPlaying = true
        if (Array.isArray(this.roamFiles) && this.roamFiles.length > 0) {
            const ghost = Math.floor(Math.random() * this.roamFiles.length)
            const file = this.roamFiles[ghost]
            await this.player.play(file)
        }
        else {
            await Promise.resolve()
        }
        this.roamPlaying = false
    }
    async safeScare() {
            console.log("attempt scare")
        if(!this.preventScare){
            console.log("start scare")
            this.preventScare = true
            await this.randomScare()
            this.preventScare = false
            console.log("finish scare")
        }
    }
    async randomScare() {
        console.log("randomScare", this)
        this.scarePlaying=true
        const files = this.kidMode ? this.kidScareFiles : this.adultScareFiles
        if (Array.isArray(files) && files.length > 0) {
            const ghost = Math.floor(Math.random() * files.length)
            const file = files[ghost]
            await this.player.play(file)
        }
        else {
            await Promise.resolve()
        }
        this.scarePlaying = false
    }
    tickCallback() {
        console.log(this.roamTimer?.remaining)
    }

}

export default App