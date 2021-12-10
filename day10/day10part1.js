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
    const getPoints = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    }
    const endToStart = {
        ')': '(',
        ']': '[',
        '}': '{',
        '>': '<',
    }
    let points = 0
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
                    if (last !== endToStart[char]) {
                        console.log(`${char} does not match ${last}`)
                        points += getPoints[char]
                        done = true
                    }
                }
            }
        })
    })
    console.log(points)
}
