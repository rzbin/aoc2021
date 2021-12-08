const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const nums = string.split('\n')
    let count = 0
    nums.forEach((num) => (count += solve(num)))
    console.log(count)
}

function solve(string) {
    let nums = string.split(' | ')
    console.log(nums[0])
    nums = nums.map((num) => num.split(' '))
    const display = {}
    const sets = []
    nums[0].forEach((num) => {
        sets.push(new Set(num))
    })
    sets.sort((a, b) => a.size - b.size)
    console.log(sets)

    display.a = difference(sets[1], sets[0])
    display.c = sets[0]
    display.f = sets[0]
    display.b = difference(sets[2], sets[0])
    display.d = difference(sets[2], sets[0])

    const test = [...sets[3], ...sets[4], ...sets[5]]
    const counts = {}
    test.forEach((num) => (counts[num] = (counts[num] || 0) + 1))
    console.log(counts)
    const arr = Object.keys(counts).map((key) => [key, counts[key]])
    const candidates = new Set(arr.filter(([key, count]) => count === 1).map(([key]) => key))
    const candidates3 = new Set(arr.filter(([key, count]) => count === 3).map(([key]) => key))
    console.log(candidates3)

    display.b = intersection(display.b, candidates)
    display.d = difference(display.d, display.b)
    display.e = difference(candidates, display.b)
    display.g = difference(difference(candidates3, display.a), display.d)

    const test2 = [...sets[6], ...sets[7], ...sets[8]]
    const counts2 = {}
    test2.forEach((num) => (counts2[num] = (counts2[num] || 0) + 1))
    console.log(counts2)
    const c = [...display.c]
    if (counts2[c[0]] == 2) {
        display.c = new Set(c[0])
        display.f = new Set(c[1])
    } else {
        display.c = new Set(c[1])
        display.f = new Set(c[0])
    }

    const disp = Object.keys(display).map((key) => [key, [...display[key]][0]])

    console.log(disp.map(([key, val]) => `${key} <= ${val}`).join('\n'))
    const translate = {}
    disp.forEach(([key, val]) => (translate[val] = key))
    console.log(translate)
    console.log(nums[1].map((num) => toNum(num, translate)).join(''))
    return Number(nums[1].map((num) => toNum(num, translate)).join(''))
}

function toNum(string, translate) {
    const nums = [
        new Set('abcefg'.split('')), // 0
        new Set('cf'.split('')), // 1
        new Set('acdeg'.split('')), // 2
        new Set('acdfg'.split('')), // 3
        new Set('bcdf'.split('')), // 4
        new Set('abdfg'.split('')), // 5
        new Set('abdefg'.split('')), // 6
        new Set('acf'.split('')), // 7
        new Set('abcdefg'.split('')), // 8
        new Set('abcdfg'.split('')), // 9
    ]
    let s = string.split('')
    s = new Set(s.map((x) => translate[x]))
    return nums.findIndex((num) => same(num, s))
}

function difference(setX, setY) {
    return new Set([...setX].filter((x) => !setY.has(x)))
}

function intersection(setX, setY) {
    return new Set([...setX].filter((x) => setY.has(x)))
}

function same(setX, setY) {
    return setX.size === setY.size && [...setX].every((x) => setY.has(x))
}
