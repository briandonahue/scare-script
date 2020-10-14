import Omx from 'node-omxplayer'

let player = undefined


const play = (file) => {
    if(player) {
        player.newSource(file, 'both', false, 1000)
    }
    else {
        player = Omx(file, 'both', false, 1000)
    }
}

export {play}

