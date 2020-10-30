import VideoPlayer from './VideoPlayer'
import Timer from './Timer'
import ReadMotion from './ReadMotion'


class App {
    constructor(options) {
        this.player = new VideoPlayer()
        this.kidScareFiles = options.kidScareFiles
        this.adultScareFiles = options.adultScareFiles
        this.enableRoam = options.enableRoam === undefined ? true : options.enableRoam
        this.enableMotion = options.enableMotion === undefined ? true : options.enableMotion
        this.roamFiles = options.roamFiles
        this.kidMode = options.kidMode
        this.motion = new ReadMotion()
        this.roamTimer = new Timer({
            startCallback: () => console.log("Roam timer started"),
            stopCallback: () => console.log("Roam timer stopped"),
            tickCallback: () => this.tickCallback(),
            duration: process.env.ROAM_COOLDOWN,
            elapsedCallback: () => this.randomRoam(),
            repeat: true,
            //            immediate: true
        })
        this.motionCooldown = new Timer({
            startCallback: () => console.log("Motion cooldown started"),
            stopCallback: () => console.log("Motion cooldown stopped"),
            tickCallback: () => this.scareTickCallback(),
            duration: process.env.SCARE_COOLDOWN,
            elapsedCallback: () => {
                this.setMotion(this.enableMotion)
                this.setRoam(this.enableRoam)
            }
        })
    }
    start() {
        console.log("App started")
        this.setRoam(this.enableRoam)
        this.setMotion(this.enableMotion)
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
    async scare() {
        console.log("attempt scare")
        this.setMotion(false)
        this.setRoam(false)
        await this.randomScare()
        this.motionCooldown.start()
        console.log("finish scare")
    }
    async randomScare() {
        console.log("randomScare")
        const files = this.kidMode ? this.kidScareFiles : this.adultScareFiles
        if (Array.isArray(files) && files.length > 0) {
            const ghost = Math.floor(Math.random() * files.length)
            const file = files[ghost]
            await this.player.play(file)
        }
        else {
            await Promise.resolve()
        }
    }

    tickCallback() {
        console.log("Roam:", this.roamTimer?.remaining)
    }
    scareTickCallback() {
        console.log("Motion cooldown:", this.motionCooldown?.remaining)
    }

    setRoam(enable) {
        if (enable) {
            this.roamTimer?.start()
        }
        else {
            this.roamTimer?.stop()
        }

    }
    setMotion(enable) {
        if (enable) {
            this.motion.start(process.env.MOTION_PIN, process.env.MOTION_INTERVAL, () => this.scare())
        }
        else {
            this.motion.stop()
        }

    }

}

export default App