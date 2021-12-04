const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const numbers = string.split('\n')[0].split(',').map(Number)

    const [, ...strings] = string.split('\n').filter((c) => c != '')

    let boards = []
    for (let i = 0; i < strings.length / 5; i++) {
        boards[i] = strings.slice(i * 5, (i + 1) * 5)
    }
    boards = boards.map((board) => {
        return board.map((line) => {
            return line
                .split(' ')
                .filter((c) => c != '')
                .map(Number)
        })
    })

    let stop = false
    let count
    let mult
    let hasWon = []
    numbers.forEach((draw) => {
        boards.forEach((board, boardNum) => {
            board.forEach((line) => {
                line.forEach((number, i) => {
                    if (!stop) {
                        if (number === draw) {
                            line[i] = 'x'
                            if (
                                !hasWon.includes(boardNum) &&
                                (line.filter((c) => c != 'x').length === 0 ||
                                    board.map((line) => line[i] === 'x').filter((c) => !c)
                                        .length === 0)
                            ) {
                                console.log(boardNum, 'has won')
                                mult = draw
                                count = board
                                hasWon.push(boardNum)
                                if (hasWon.length === boards.length) {
                                    stop = true
                                }
                            }
                        }
                    }
                })
            })
        })
    })
    let sum = 0
    count.forEach((line) => {
        line.forEach((number) => {
            if (number !== 'x') {
                sum += number
            }
        })
    })
    console.log(mult, sum, mult * sum)
}
