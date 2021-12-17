const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const lines = string.split(' ')
    const [xMin, xMax] = lines[2].replace(',', '').replace('x=', '').split('..').map(Number)
    const [yMin, yMax] = lines[3].replace(',', '').replace('y=', '').split('..').map(Number)
    const zone = { xMin, xMax, yMin, yMax }

    let total = 0
    const n = 1000
    for (let x = 0; x < n; x++) {
        for (let y = -n; y < n; y++) {
            if (shoot(x, y, zone)) {
                total++
            }
        }
    }
    console.log(total)
}

function shoot(xVel, yVel, zone) {
    let x = 0
    let y = 0
    while (true) {
        x += xVel
        y += yVel
        if (xVel !== 0) {
            xVel += xVel > 0 ? -1 : 1
        }
        yVel--
        if (x >= zone.xMin && x <= zone.xMax && y >= zone.yMin && y <= zone.yMax) {
            return true
        }
        if (y <= zone.yMin) {
            return false
        }
    }
}
