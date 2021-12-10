const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const lines = string.split('\n')
    const reverse = {
        ')': '(',
        ']': '[',
        '}': '{',
        '>': '<',
        '(': ')',
        '[': ']',
        '{': '}',
        '<': '>',
    }
    const points = []
    lines.forEach((line) => {
        let done = false
        const stack = []
        const chars = line.split('')
        chars.forEach((char) => {
            if (!done) {
                if (char === '(' || char === '[' || char === '{' || char === '<') {
                    stack.push(char)
                } else {
                    const last = stack.pop()
                    if (last !== reverse[char]) {
                        done = true
                    }
                }
            }
        })
        if (!done) {
            const getPoints = {
                ')': 1,
                ']': 2,
                '}': 3,
                '>': 4,
            }
            const left = stack.map((c) => reverse[c]).reverse()
            console.log(line, ' complete by adding ', left.join(''))
            let score = 0
            left.forEach((c) => {
                score *= 5
                score += getPoints[c]
            })
            console.log(' score: ', score)
            points.push(score)
        }
    })
    points.sort((a, b) => b - a)
    console.log('middle point: ', points[Math.floor(points.length / 2)])
}
