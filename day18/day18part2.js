const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const numbers = string.split('\n').map(toFishNumber)

    let max = 0
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            const num = fishAdd(numbers[i], numbers[j])
            const magnitude = getMagnitude(eval(num.join('')))
            max = Math.max(max, magnitude)
        }
    }
    console.log(max)
}
function toFishNumber(string) {
    const chars = string.split('')
    const arr = []
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === '[' || chars[i] === ']' || chars[i] === ',') {
            arr.push(chars[i])
        } else {
            let n = 0
            while (Number(chars[i]) == chars[i]) {
                n *= 10
                n += Number(chars[i])
                i++
            }
            i--
            arr.push(n)
        }
    }
    return arr
}

function fishAdd(a, b) {
    return reduce(['[', ...a, ',', ...b, ']'])
}

function reduce(num) {
    let depth = 0
    let stop = false
    for (let i = 0; i < num.length && !stop; i++) {
        depth += num[i] === '[' ? 1 : 0
        depth -= num[i] === ']' ? 1 : 0
        if (depth > 4) {
            stop = true
            const [, l, , r] = num.splice(i, 5, 0)
            for (let j = i - 1; j >= 0; j--) {
                if (Number(num[j]) == num[j]) {
                    num[j] += l
                    break
                }
            }
            for (let j = i + 1; j < num.length; j++) {
                if (Number(num[j]) == num[j]) {
                    num[j] += r
                    break
                }
            }
            break
        }
    }
    for (let i = 0; i < num.length && !stop; i++) {
        if (Number(num[i]) == num[i] && Number(num[i]) > 9) {
            stop = true
            const number = num[i] / 2
            num.splice(i, 1, ...['[', Math.floor(number), ',', Math.ceil(number), ']'])
            break
        }
    }

    return stop ? reduce(num) : num
}

function getMagnitude(fish) {
    if (Array.isArray(fish)) {
        return 3 * getMagnitude(fish[0]) + 2 * getMagnitude(fish[1])
    }
    return fish
}
