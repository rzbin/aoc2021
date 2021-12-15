const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    let lines = string.split('\n').map((line) => line.split('').map(Number))
    lines = enlarge5(lines)
    console.log(dijkstra(lines))
}

function enlarge5(lines) {
    const newLines = []
    for (let i = 0; i < lines.length; i++) {
        const newLine = []
        for (let j = 0; j < lines[i].length; j++) {
            newLine[0 * lines[i].length + j] = (lines[i][j] + 0) % 9 || 9
            newLine[1 * lines[i].length + j] = (lines[i][j] + 1) % 9 || 9
            newLine[2 * lines[i].length + j] = (lines[i][j] + 2) % 9 || 9
            newLine[3 * lines[i].length + j] = (lines[i][j] + 3) % 9 || 9
            newLine[4 * lines[i].length + j] = (lines[i][j] + 4) % 9 || 9
        }
        newLines.push(newLine)
    }
    const newLines2 = []
    for (let i = 0; i < newLines.length; i++) {
        for (let j = 0; j < 5; j++) {
            newLines2[j * newLines.length + i] = newLines[i].map((n) => (n + j) % 9 || 9)
        }
    }
    return newLines2
}

function dijkstra(grid) {
    const visited = new Set()
    const distances = new Map()
    const previous = new Map()
    const queue = [
        {
            x: 0,
            y: 0,
            distance: 0,
        },
    ]

    while (queue.length) {
        const { x, y, distance } = queue.shift()
        if (visited.has(`${x}-${y}`)) {
            continue
        }
        visited.add(`${x}-${y}`)
        const newDistance = distance + grid[y][x]
        if (x === grid[0].length - 1 && y === grid.length - 1) {
            previous.set(`${x}-${y}`, { x, y, distance: newDistance })
            distances.set(`${x}-${y}`, newDistance)
            return newDistance - grid[0][0]
        }
        if (!distances.has(`${x}-${y}`) || distances.get(`${x}-${y}`) > newDistance) {
            distances.set(`${x}-${y}`, newDistance)
            previous.set(`${x}-${y}`, { x, y, distance })
        }
        if (y > 0 && !visited.has(`${x}-${y - 1}`)) {
            queue.push({ x, y: y - 1, distance: newDistance })
        }
        if (x > 0 && !visited.has(`${x - 1}-${y}`)) {
            queue.push({ x: x - 1, y, distance: newDistance })
        }
        if (y < grid.length - 1 && !visited.has(`${x}-${y + 1}`)) {
            queue.push({ x, y: y + 1, distance: newDistance })
        }
        if (x < grid[0].length - 1 && !visited.has(`${x + 1}-${y}`)) {
            queue.push({ x: x + 1, y, distance: newDistance })
        }
        queue.sort((a, b) => a.distance - b.distance)
    }
}
