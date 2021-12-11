const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function print(field) {
    field.forEach((row) => {
        console.log(row.map((x) => x.n).join(''))
    })
}

function getNeighbours(field, x, y) {
    let neighbours = []
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue
            }
            let nx = x + i
            let ny = y + j
            if (ny >= 0 && ny < field.length && nx >= 0 && nx < field[ny].length) {
                neighbours.push({
                    x: nx,
                    y: ny,
                })
            }
        }
    }
    return neighbours
}

function step(field) {
    let total = 0
    const todo = []
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            field[y][x].n++
            field[y][x].done = false
            if (field[y][x].n === 10) {
                todo.push({
                    x,
                    y,
                })
            }
        }
    }
    if (todo.length > 0) {
        do {
            total++
            const { x, y } = todo.shift()
            if (field[y][x].n < 10) {
                console.log('error')
            }
            field[y][x].done = true
            const neighbours = getNeighbours(field, x, y)
            neighbours.forEach((neighbour) => {
                field[neighbour.y][neighbour.x].n++
                if (
                    !field[neighbour.y][neighbour.x].done &&
                    field[neighbour.y][neighbour.x].n === 10
                ) {
                    todo.push(neighbour)
                }
            })
        } while (todo.length > 0)
    }

    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            if (field[y][x].n > 9) {
                field[y][x].n = 0
            }
        }
    }

    console.log('did ', total)
    return total
}

function main(string) {
    const n = 195
    let fieldSpaces = 0
    const field = string.split('\n').map((x) =>
        x.split('').map((x) => {
            fieldSpaces++
            return {
                n: Number(x),
                done: false,
            }
        })
    )
    console.log('initial')
    print(field)
    let i = 1
    while (true) {
        console.log('\nstep ', i)
        if (step(field) == fieldSpaces) {
            print(field)

            break
        }
        print(field)
        i++
    }
    console.log('\nsteps: ', i)
}
