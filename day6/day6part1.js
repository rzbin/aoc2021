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
    const n = 80
    for (let i = 1; i <= n; i++) {
        let add = 0
        arr = arr.map((x) => {
            if (x == 0) {
                add++
                return 6
            }
            return x - 1
        })
        for (let i = 0; i < add; i++) {
            arr.push(8)
        }
    }
    console.log(arr.length)
}
