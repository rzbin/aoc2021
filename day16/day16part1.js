const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

let versions = 0

function main(string) {
    const bin = hexToBin(string)
    console.log(bin.join(''))
    console.log('done', parse(bin))
    console.log('versions', versions)
}

function hexToBin(str) {
    let bin = []
    for (let i = 0; i < str.length; i++) {
        let char = str[i]
        let binChar = parseInt(char, 16).toString(2)
        while (binChar.length < 4) binChar = '0' + binChar
        bin.push(...binChar.split(''))
    }
    return bin
}

function parse(bin) {
    console.log(bin.join(''))
    // Get V
    const v = binArrToNum(shiftAndGet(bin, 3))
    console.log('V', v)
    versions += v
    // Get ID
    const id = binArrToNum(shiftAndGet(bin, 3))
    console.log('ID', id)

    switch (id) {
        case 4:
            return literal(bin)
        default:
            return operator(bin, id)
    }
}

function operator(bin, op) {
    console.log('Operator', op)
    const i = binArrToNum(shiftAndGet(bin, 1))
    console.log('I', i)
    if (i === 0) {
        const len = binArrToNum(shiftAndGet(bin, 15))
        console.log('Len', len)
        console.log('to operate', bin.join(''))
        let take = shiftAndGet(bin, len)
        const values = []

        while (take.length > 0) {
            const { value, rest } = parse(take)
            values.push(value)
            take = rest
        }
        console.log('values', values)
        return { value: values, rest: bin }
    } else if (i === 1) {
        const len = binArrToNum(shiftAndGet(bin, 11))
        console.log('Len', len)
        const values = []
        for (let i = 0; i < len; i++) {
            const { value, rest } = parse(bin)
            values.push(value)
        }
        return { value: values, rest: bin }
    }
}

function literal(bin) {
    // while (bin.length % 4 !== 0) bin.push('0')
    const chunks = []
    const len = 5
    let go = true
    while (go) {
        const chunk = shiftAndGet(bin, len)
        if (chunk.shift() === '0') go = false
        chunks.push(chunk)
    }
    const value = binArrToNum(chunks.flat())
    console.log('chunks', chunks)
    console.log('num', value)
    console.log('rest', bin)
    return { value, rest: bin }
}

function shiftAndGet(arr, n) {
    const newArr = []
    for (let i = 0; i < n; i++) {
        newArr.push(arr.shift())
    }
    return newArr
}

function binArrToNum(binArr) {
    let num = 0
    binArr.forEach((bit, i) => {
        num *= 2
        num += bit === '1'
    })
    return num
}
