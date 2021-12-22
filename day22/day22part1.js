const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const lines = string.split('\n').map((line) => {
        const on = line.charAt(1) === 'n'
        let [, x, , y, , z] = line.split(/,|=/)
        x = x.split('..').map(Number)
        y = y.split('..').map(Number)
        z = z.split('..').map(Number)
        return {
            on,
            x,
            y,
            z,
        }
    })
    console.log(lines)
    const map = Array(102)
        .fill(0)
        .map(() =>
            Array(102)
                .fill(0)
                .map(() => Array(102).fill(0))
        )
    for (let i = 0; i < lines.length; i++) {
        const square = lines[i]
        if (square.x[0] > 50 || square.x[0] < -50) continue
        for (let x = square.x[0]; x <= square.x[1]; x++) {
            for (let y = square.y[0]; y <= square.y[1]; y++) {
                for (let z = square.z[0]; z <= square.z[1]; z++) {
                    map[x + 50][y + 50][z + 50] = square.on ? 1 : 0
                }
            }
        }
    }
    let count = 0
    console.log(
        map
            .flat()
            .flat()
            .flat()
            .filter((x) => x === 1).length
    )
}
