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
            add: on ? 1 : -1,
            xMin: x[0],
            xMax: x[1],
            yMin: y[0],
            yMax: y[1],
            zMin: z[0],
            zMax: z[1],
        }
    })
    const area = (cuboid) => {
        return (
            (cuboid.xMax - cuboid.xMin + 1) *
            (cuboid.yMax - cuboid.yMin + 1) *
            (cuboid.zMax - cuboid.zMin + 1)
        )
    }

    const cubes = []
    lines.forEach((line) => {
        const {
            add: add1,
            xMin: xMin1,
            xMax: xMax1,
            yMin: yMin1,
            yMax: yMax1,
            zMin: zMin1,
            zMax: zMax1,
        } = line
        cubes.forEach(({ add, xMin, xMax, yMin, yMax, zMin, zMax }) => {
            if (
                ((xMin1 <= xMin && xMin <= xMax1) || (xMin <= xMin1 && xMin1 <= xMax)) &&
                ((yMin1 <= yMin && yMin <= yMax1) || (yMin <= yMin1 && yMin1 <= yMax)) &&
                ((zMin1 <= zMin && zMin <= zMax1) || (zMin <= zMin1 && zMin1 <= zMax))
            ) {
                cubes.push({
                    add: add * -1,
                    xMin: Math.max(xMin1, xMin),
                    xMax: Math.min(xMax1, xMax),
                    yMin: Math.max(yMin1, yMin),
                    yMax: Math.min(yMax1, yMax),
                    zMin: Math.max(zMin1, zMin),
                    zMax: Math.min(zMax1, zMax),
                })
            }
        })
        if (add1 === 1) {
            cubes.push(line)
        }
    })

    let count = 0
    cubes.forEach((c) => (count += c.add * area(c)))
    console.log(count)
}
