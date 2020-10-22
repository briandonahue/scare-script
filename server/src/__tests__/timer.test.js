
import Timer from '../timer.js'

    console.log("everything")
        console.log("something")
        const timer = new Timer({
            tick: 500,
            duration: 100,
            elapsedCallback: () => console.log("Elapsed"),
            tickCallback: () => console.log("Tick")
        })
        console.log(timer)
        timer.start()

