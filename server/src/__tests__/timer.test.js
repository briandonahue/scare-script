
import Timer from '../timer.js'

jest.useFakeTimers()
describe("timer", () => {
    describe("elapse", () => {
        it("should run elapsed callback on elapse", () => {
            let elapsed = false
            const timer = new Timer({ duration: 1000, elapsedCallback: () => elapsed = true })
            timer.start()
            jest.runAllTimers()
            expect(elapsed).toBe(true)
        })
    })
    describe("tick", () => {
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
    describe("stop", () => {
        let tickCount = 0
        let elapsed = false
        let timer
        beforeAll(() => {
            const timer = new Timer({
                tick: 1000,
                tickCallback: () => tickCount++,
                duration: 3000,
                elapsedCallback: () => elapsed = true
            })
            timer.start()
            jest.advanceTimersByTime(2005)
            timer.stop()
            jest.runAllTimers()
        })
        it("should have ticked twice", () => {
            expect(tickCount).toBe(2)
        })
        it("should not elapse", () => {
            expect(elapsed).toBe(false)
        })
    })
    describe("repeat", () => {
        let tickCount = 0
        let elapsedCount = 0
        let timer
        beforeAll(() => {
            const timer = new Timer({
                tick: 1000,
                tickCallback: () => tickCount++,
                duration: 3000,
                elapsedCallback: () => elapsedCount++,
                repeat: true
            })
            timer.start()
            jest.advanceTimersByTime(3000*3)
        })
        it("should tick 9 times", () => {
            expect(tickCount).toBe(9)
        })
        it("should elapse 3 times", () => {
            expect(elapsedCount).toBe(3)
        })


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