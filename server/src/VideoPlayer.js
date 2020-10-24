import Omx from 'node-omxplayer'

class VideoPlayer {
    constructor() {
        if (process.env.RASPPI === 'true') {
            this.player = Omx()
        }
    }

    play(file) {
        console.log(`Playing: ${file}`)
        /*
            const {error, stdout, stderr} = await exec(`sudo omxplayer -b -o both --vol -1000 ${file}`)
            console.log(error, stdout, stderr)
        */
        if (this.player) {
            this.player.newSource(file, 'both', false, 100)
        }
    }

}

export default VideoPlayer

