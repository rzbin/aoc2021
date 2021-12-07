const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    let arr = string.split(',').map(Number)
    const m = median(arr)
    get(arr, m)
}

function get(arr, m) {
    let d = arr.map((x) => Math.abs(x - m))
    const sum = d.reduce((a, b) => a + b)
    console.log(m, ' -> sum ', sum)
}

function median(arr) {
    arr.sort((a, b) => a - b)
    let len = arr.length
    return arr[Math.floor(len / 2)]
}
