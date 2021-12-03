const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    handle(buff.toString())
})

function handle(string) {
    const strings = string.split('\n')
    let input = strings.map((s) => s.split('').map((c) => +c))
    let input2 = strings.map((s) => s.split('').map((c) => +c))

    i = 0
    while (input.length > 1) {
        input = mostCommonAt(input, i, 'most')
        i++
    }
    i = 0
    while (input2.length > 1) {
        input2 = mostCommonAt(input2, i, 'least')
        i++
    }
    const a = binaryToNum(input[0])
    const b = binaryToNum(input2[0])
    console.log(`${a} * ${b} = ${a * b}`)
}

function binaryToNum(binary) {
    let num = 0
    binary.forEach((b) => {
        num = num * 2 + b
    })
    return num
}

function mostCommonAt(input, index, type) {
    let ones = 0,
        zeros = 0
    input.forEach((row) => {
        if (row[index]) {
            ones++
        } else {
            zeros++
        }
    })
    if (ones == zeros) {
        ones++
    }
    let num = ones > zeros ? 1 : 0
    if (type == 'least') {
        num = !num
    }
    return input.filter((row) => row[index] == num)
}
