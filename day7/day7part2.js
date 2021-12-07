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
    const m = mean(arr)
    get(arr, m - 2)
    get(arr, m - 1)
    get(arr, m)
    get(arr, m + 1)
}

function get(arr, m) {
    let d = arr.map((x) => ((Math.abs(x - m) + 1) ** 2 - (Math.abs(x - m) + 1)) / 2)
    let sum = d.reduce((a, b) => a + b)
    console.log({ m, sum })
}

function mean(arr) {
    return Math.round(arr.reduce((a, b) => a + b) / arr.length)
}
