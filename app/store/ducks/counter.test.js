import * as counterDuck from './counter'

test('counter reducer', () => {
    const initialState = 0
    const nextState = counterDuck.reducer(initialState, counterDuck.increment())
    const expectedFinalState = 1
    expect(nextState).toBe(expectedFinalState)
})
