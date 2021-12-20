const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const [algo, rest] = string.split('\n\n')

    const board = new Board(
        rest.split('\n').map((row) => row.split('')),
        algo,
        true
    )
    board.show()

    const n = 50
    for (let i = 0; i < n; i++) {
        board.step()
        board.show()
    }
}

class Board {
    constructor(board, algo, flip) {
        this.flip = flip
        this.algo = algo
        this.height = board.length
        this.width = board[0].length
        this.rest = 0
        this.grid = []
        for (let i = 0; i < this.height; i++) {
            this.grid[i] = []
            for (let j = 0; j < this.width; j++) {
                // this.grid.set(`${i},${j}`, board[i][j] === '#')
                this.grid[i][j] = +(board[i][j] === '#')
            }
        }
    }

    step() {
        this.enlarge()
        let newGrid = []
        for (let i = 0; i < this.height; i++) {
            newGrid[i] = []
            for (let j = 0; j < this.width; j++) {
                newGrid[i][j] = this.rest
            }
        }
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                let binary = 0
                for (let k = -1; k <= 1; k++) {
                    for (let l = -1; l <= 1; l++) {
                        binary *= 2
                        if (i + k >= 0 && i + k < this.height && j + l >= 0 && j + l < this.width) {
                            binary += this.grid[i + k][j + l]
                        } else {
                            binary += this.rest
                        }
                    }
                }
                newGrid[i][j] = +(this.algo.charAt(binary) === '#')
            }
        }
        if (this.flip) {
            this.rest = this.rest ? 0 : 1
        }
        this.grid = newGrid
    }

    enlarge() {
        this.grid.unshift(new Array(this.width).fill(this.rest))
        this.grid.push(new Array(this.width).fill(this.rest))
        this.height += 2
        for (let i = 0; i < this.height; i++) {
            this.grid[i].unshift(this.rest)
            this.grid[i].push(this.rest)
        }
        this.width += 2
    }

    show() {
        console.log('\n')
        let count = 0
        for (let i = 0; i < this.height; i++) {
            let row = ''
            for (let j = 0; j < this.width; j++) {
                row += this.grid[i][j] ? '#' : '.'
                count += this.grid[i][j]
            }
            console.log(row)
        }
        console.log(`rest: ${this.rest}, count: ${count}`)
    }
}
