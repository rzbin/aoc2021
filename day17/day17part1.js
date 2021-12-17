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

    let maxHeight = 0
    const n = 1000
    for (let x = 0; x < n; x++) {
        for (let y = 0; y < n; y++) {
            maxHeight = Math.max(maxHeight, shoot(x, y, zone))
        }
    }
    console.log(maxHeight)
}

function shoot(xVel, yVel, zone) {
    let x = 0
    let y = 0
    let maxHeight = 0
    let hit = false
    while (y > zone.yMax) {
        x += xVel
        y += yVel
        if (xVel !== 0) {
            xVel += xVel > 0 ? -1 : 1
        }
        yVel--
        if (x >= zone.xMin && x <= zone.xMax && y >= zone.yMin && y <= zone.yMax) {
            hit = true
        }
        maxHeight = Math.max(maxHeight, y)
    }
    return hit && maxHeight
}
