const sum = a => b => a + b

test('sum', () => {
    expect(sum(4)(5)).toBe(9)
})
