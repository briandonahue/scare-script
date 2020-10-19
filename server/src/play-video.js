import { exec } from 'child_process'
import Omx from 'node-omxplayer'

let player = undefined


const play = async (file) => {
    console.log(`Playing: ${file}`)
/*
    const {error, stdout, stderr} = await exec(`sudo omxplayer -b -o both --vol -1000 ${file}`)
    console.log(error, stdout, stderr)
*/
    if(player) {
        player.newSource(file, 'both', false, 100)
    }
    else {
        player = Omx(file, 'both', false, 100)
    }
}

export { play }

