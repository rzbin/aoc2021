const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const vents = string.split('\n').map((line) => {
        return line.split('->').map((part) => part.split(',').map(Number))
    })
    let max = 0
    vents.forEach(([start, end]) => {
        max = Math.max(max, Math.max(Math.max(...start), Math.max(...end)))
    })
    console.log({ max })
    const map = []
    for (let i = 0; i <= max; i++) {
        map[i] = []
        for (let j = 0; j <= max; j++) {
            map[i][j] = 0
        }
    }
    let total = 0
    vents.forEach(([[sx, sy], [ex, ey]]) => {
        // console.log(sx, sy, '->', ex, ey)
        if (sx === ex) {
            const min = Math.min(sy, ey)
            const max = Math.max(sy, ey)
            for (let i = min; i <= max; i++) {
                map[i][sx] += 1
                if (map[i][sx] == 2) {
                    total += 1
                }
            }
        } else if (sy === ey) {
            const min = Math.min(sx, ex)
            const max = Math.max(sx, ex)
            for (let i = min; i <= max; i++) {
                map[sy][i] += 1
                if (map[sy][i] == 2) {
                    total += 1
                }
            }
        }
    })

    // console.log(map.map((row) => row.join('')).join('\n'))
    console.log(total)
}
