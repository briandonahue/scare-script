
import Timer from '../Timer.js'

jest.useFakeTimers()
describe("timer", () => {

    describe("elapse", () => {
        it("should run elapsed callback on elapse", () => {
            let elapsed = false
            const timer = new Timer({ duration: 1, elapsedCallback: () => elapsed = true })
            timer.start()
            jest.runAllTimers()
            expect(elapsed).toBe(true)
        })
    })
    describe("tick", () => {
        let tickCount = 0
        let elapsed = false
        beforeAll(() => {
            const timer = new Timer({
                tickCallback: () => tickCount++,
                duration: 3,
                elapsedCallback: () => elapsed = true
            })
            timer.start()
            jest.runAllTimers()
        })
        it("should run tick callback three times", () => {
            expect(tickCount).toBe(3)
        })
        it("should elapse", () => {
            expect(elapsed).toBe(true)

        })
    })
    describe("stop", () => {
        let tickCount = 0
        let elapsed = false
        let timer
        beforeAll(() => {
            const timer = new Timer({
                tickCallback: () => tickCount++,
                duration: 3,
                elapsedCallback: () => elapsed = true
            })
            timer.start()
            jest.advanceTimersByTime(2005)
            timer.stop()
            jest.runAllTimers()
        })
        it("should have ticked three times", () => {
            expect(tickCount).toBe(3)
        })
        it("should not elapse", () => {
            expect(elapsed).toBe(false)
        })
    })
    describe("repeat", () => {
        let tickCount = 0
        let elapsedCount = 0
        beforeAll(() => {
            const timer = new Timer({
                tickCallback: () => tickCount++,
                duration: 3,
                elapsedCallback: () => elapsedCount++,
                repeat: true
            })
            timer.start()
            jest.advanceTimersByTime(3 * 3000)
        })
        it("should tick 10 times", () => {
            // ticks one extra time because it's beginning to repeat on last elapse
            expect(tickCount).toBe(10)
        })
        it("should elapse 3 times", () => {
            expect(elapsedCount).toBe(3)
        })
    })
    describe("repeat and immediate", () => {
        let tickCount = 0
        let elapsedCount = 0
        beforeAll(() => {
            const timer = new Timer({
                tickCallback: () => tickCount++,
                duration: 3,
                elapsedCallback: () => elapsedCount++,
                repeat: true,
                immediate: true
            })
            timer.start()
            jest.advanceTimersByTime(3 * 3000)
        })
        it("should tick 10 times", () => {
            // ticks one extra time because it's beginning to repeat on last elapse
            expect(tickCount).toBe(10)
        })
        it("should elapse 3 times", () => {
            expect(elapsedCount).toBe(4)
        })
    })
    describe("immediate", () => {
        let tickCount = 0
        let elapsedCount = 0
        beforeAll(() => {
            const timer = new Timer({
                tickCallback: () => tickCount++,
                duration: 3,
                elapsedCallback: () => elapsedCount++,
                repeat: true,
                immediate: true
            })
            timer.start()
            jest.advanceTimersByTime(500)
        })
        it("should tick once", () => {
            expect(tickCount).toBe(1)
        })
        it("should elapse 1 times", () => {
            expect(elapsedCount).toBe(1)
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