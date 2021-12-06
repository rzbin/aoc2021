const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const add = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    string
        .split(',')
        .map(Number)
        .forEach((el) => add[el]++)
    // console.log(0, '[', add.join(','), ']')

    const n = 256
    let add6 = 0
    let add8 = 0
    for (let i = 1; i <= n; i++) {
        add6 = add[0]
        add8 = add[0]
        for (let j = 1; j < add.length; j++) {
            add[j - 1] = add[j]
        }
        add[6] += add6
        add[8] = add8
        // console.log(
        //     i,
        //     '[',
        //     add.join(','),
        //     '] : ',
        //     add.reduce((a, b) => a + b)
        // )
    }
    console.log(add.reduce((a, b) => a + b))
}
