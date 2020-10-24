import Omx from 'node-omxplayer'

class VideoPlayer {
    constructor() {
        if (process.env.RASPPI === 'true') {
            this.player = Omx()
        }
    }

    async play(file) {
        console.log(`Playing: ${file}`)
        /*
            const {error, stdout, stderr} = await exec(`sudo omxplayer -b -o both --vol -1000 ${file}`)
            console.log(error, stdout, stderr)
        */
        return new Promise((resolve, reject) => {
            if (this.player) {
                try {
                    this.player.newSource(file, 'both', false, 100)
                    this.player.on('close', () => {
                        resolve()
                    })
                }
                catch (err) {
                    reject()
                }
            }
            else {
                setTimeout(() => resolve(), 3000)
            }

        })
    }

}

export default VideoPlayer

