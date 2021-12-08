const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const nums = string.split('\n').map((l) =>
        l
            .split(' | ')[1]
            .split(' ')
            .map((l) => l.length)
    )
    let count = 0
    nums.forEach((l) => {
        l.forEach((n) => {
            count += n == 2 || n == 4 || n == 3 || n == 7
        })
    })
    console.log(count)
}
