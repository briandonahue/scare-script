
import Timer from '../timer.js'

jest.useFakeTimers()
describe("timer", () => {
    it("should run elapsed callback on elapse", () => {
        let elapsed = false
        const timer = new Timer({ duration: 1000, elapsedCallback: () => elapsed = true })
        timer.start()
        jest.runAllTimers()
        expect(elapsed).toBe(true)
    })
    it("should run tick callback on each tick", () => {
        let tickCount = 0
        let elapsed = false
        const timer = new Timer({ 
            tick: 1000,
            tickCallback: () => tickCount++,
            duration: 3000, 
            elapsedCallback: () => elapsed = true 
        })
        timer.start()
        jest.runAllTimers()
        expect(tickCount).toBe(3)
        expect(elapsed).toBe(true)


    })
})

/*
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


        */