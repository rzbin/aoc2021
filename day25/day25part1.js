const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

async function main(string) {
    let board = string.split('\n').map((row) => row.split(''))
    console.log('initial board')
    printBoard(board)

    const changed = { hasChanged: false }
    let i = 0
    while (true) {
        await sleep(100)
        i++
        changed.hasChanged = false
        board = east(board, changed)
        board = south(board, changed)
        console.log('Step ' + i)
        printBoard(board)
        console.log()
        if (!changed.hasChanged) break
    }
    console.log('Steps used: ' + i)
}

function printBoard(board) {
    let str = ''
    board.forEach((row) => (str += row.join('') + '\n'))
    console.log(str)
}

function east(board, changed) {
    const nextBoard = []
    for (let y = 0; y < board.length; y++) {
        nextBoard[y] = []
        for (let x = 0; x < board[y].length; x++) {
            nextBoard[y][x] = board[y][x]
            const next = (x + 1) % board[y].length
            if (board[y][x] === '>' && board[y][next] === '.') {
                changed.hasChanged = true
                nextBoard[y][next] = '>'
                nextBoard[y][x] = '.'
                x++
            }
        }
    }
    return nextBoard
}

function south(board, changed) {
    const nextBoard = []
    board.forEach((_) => nextBoard.push([]))
    for (let x = 0; x < board[0].length; x++) {
        for (let y = 0; y < board.length; y++) {
            nextBoard[y][x] = board[y][x]
            const next = (y + 1) % board.length
            if (board[y][x] === 'v' && board[next][x] === '.') {
                changed.hasChanged = true
                nextBoard[next][x] = 'v'
                nextBoard[y][x] = '.'
                y++
            }
        }
    }
    return nextBoard
}
