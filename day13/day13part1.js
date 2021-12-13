const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const split = string.split('\n')
    const locations = []
    let folds = []
    let maxY = 0
    let maxX = 0
    let empty = false
    for (let i = 0; i < split.length; i++) {
        const line = split[i]
        if (line.length === 0) {
            empty = true
            continue
        }
        if (!empty) {
            const [x, y] = line.split(',').map(Number)
            locations.push({ x, y })
            maxY = Math.max(maxY, y)
            maxX = Math.max(maxX, x + 1)
        } else {
            const t = line.split('=')
            const dir = t[0].charAt(t[0].length - 1)
            const val = Number(t[1])
            folds.push({ dir, val })
        }
    }
    console.log(locations)
    console.log(folds)
    let board = new Array(maxY + 1).fill(0).map(() => new Set())
    locations.forEach(({ x, y }) => board[y].add(x))
    drawBoard(board, maxX)

    folds = [folds[0]]
    folds.forEach(({ dir, val }) => {
        if (dir === 'y') {
            for (let i = 0; i < val + 1; i++) {
                for (let e of board[val + i]) {
                    board[val - i].add(e)
                }
            }
            board = board.slice(0, val)
            maxY = val
        } else {
            for (let i = 0; i < board.length; i++) {
                const row = [...board[i]].map((x) => (x >= val ? val - (x - val) : x))
                board[i] = new Set(row)
            }
            maxX = val
        }

        drawBoard(board, maxX)
    })
}

function drawBoard(board, maxX) {
    console.log('\n')
    let total = 0
    // console.log(board)
    for (let y = 0; y < board.length; y++) {
        let line = ''
        for (let x = 0; x < maxX; x++) {
            if (board[y].has(x)) {
                line += '#'
                total++
            } else {
                line += '.'
            }
        }
        console.log(line)
    }
    console.log(total)
}
