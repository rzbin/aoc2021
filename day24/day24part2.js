const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

const div = (x, y) => ~~(x / y)

function blockToFunction(zDiv, xAdd, yAdd) {
    //     x = (z % 26) + xAdd == w ? 0 : 1
    //     z /= zDiv
    //     z = z*(25 * x + 1) + (w + yAdd) * x
    const f = (z, w) => {
        const x = +((z % 26) + xAdd != w)
        z = div(z, zDiv)
        z = z * (25 * x + 1) + (w + yAdd) * x
        return z
    }
    return f
}

function main(string) {
    const lines = string.split('\n')
    const groups = []
    for (let i = 0; i < lines.length; i += 18) {
        groups.push(lines.slice(i, i + 18))
    }
    //keep only lines 4 5 and 15
    const g = groups.map((group) => group.filter((line, i) => i === 4 || i === 5 || i === 15))
    const blocks = g.map((group) => {
        const zDiv = +group[0].split(' ')[2]
        const xAdd = +group[1].split(' ')[2]
        const yAdd = +group[2].split(' ')[2]
        return blockToFunction(zDiv, xAdd, yAdd)
    })

    const ws = [1, 7, 1, 5, 3, 1, 1, 4, 6, 9, 1, 1, 1, 8]
    let z = 0
    for (let i = 0; i < ws.length; i++) {
        const w = ws[i]
        z = blocks[i](z, w)
    }
    console.log(z)

    const next = (z, i) => {
        const f = blocks[i]
        const n = {}
        for (let w = 1; w <= 9; w++) {
            n[w] = f(z, w)
        }
        return n
    }

    const visited = new Map()
    const n = blocks.length
    const dfs = (z, i, inputs = []) => {
        if (z > 26 ** (n - i)) return
        if (visited.has(`${z}, ${i}`)) {
            return visited.get(z)
        }
        visited.set(`${z}, ${i}`, true)
        if (i === n) {
            return inputs
        }
        const nexts = next(z, i)
        for (let w = 1; w <= 9; w++) {
            const nextZ = nexts[w]
            if (i === n - 1 && nextZ === 0) {
                console.log('solution', [...inputs, w])
            }
            dfs(nextZ, i + 1, [...inputs, w])
        }
    }

    const ans = dfs(0, 0, [])
}
