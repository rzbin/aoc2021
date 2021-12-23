const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

const energy = {
    A: 1,
    B: 10,
    C: 100,
    D: 1000,
}
const spotToHall = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
}

function main(string) {
    // #..x.x.x.x..#
    const hall = Array(11).fill('')
    const spots = string.split('').filter((c) => c == 'A' || c == 'B' || c == 'C' || c == 'D')
    const A = [spots[4], 'D', 'D', spots[0]]
    const B = [spots[5], 'B', 'C', spots[1]]
    const C = [spots[6], 'A', 'B', spots[2]]
    const D = [spots[7], 'C', 'A', spots[3]]
    print(hall, A, B, C, D)
    console.log(move(hall, A, B, C, D, 0))
    // console.log(cache)
}

const cache = new Map()
const maxMoves = 400
function move(hall, A, B, C, D, moves /*, cost*/) {
    console.assert(hall.length == 11)
    console.assert(A.length <= 4)
    console.assert(B.length <= 4)
    console.assert(C.length <= 4)
    console.assert(D.length <= 4)
    // console.assert(cost != undefined)

    if (
        A.filter((c) => c == 'A').length == 4 &&
        B.filter((c) => c == 'B').length == 4 &&
        C.filter((c) => c == 'C').length == 4 &&
        D.filter((c) => c == 'D').length == 4
    ) {
        console.log('completed on', moves)
        // const min = Math.min(cost, cache.get(str(hall, A, B, C, D, cost)))
        // cache.set(str(hall, A, B, C, D, cost), min)
        return 0
    }
    if (cache.has(str(hall, A, B, C, D))) {
        return cache.get(str(hall, A, B, C, D))
    }

    if (moves == maxMoves) {
        return Infinity
    }

    let costs = []

    const maxDepth = 4
    const test = (letter, arr) => {
        let good = true
        for (let depth = arr.length - 1; depth >= 0; depth--) {
            if (arr[depth] != letter) {
                good = false
                break
            }
        }
        if (!good) {
            const canMoveTo = getPossibleHallLocs(hall, letter)
            for (let spot of canMoveTo) {
                const back = arr[arr.length - 1]
                const rest = arr.slice(0, arr.length - 1)

                const newHall = [...hall]
                newHall[spot] = back
                const temp = maxDepth - rest.length

                const c = energy[back] * (Math.abs(spot - spotToHall[letter]) + temp)
                switch (letter) {
                    case 'A':
                        costs.push(move(newHall, rest, B, C, D, moves + 1) + c)
                        break
                    case 'B':
                        costs.push(move(newHall, A, rest, C, D, moves + 1) + c)
                        break
                    case 'C':
                        costs.push(move(newHall, A, B, rest, D, moves + 1) + c)
                        break
                    case 'D':
                        costs.push(move(newHall, A, B, C, rest, moves + 1) + c)
                        break
                }
            }
        }
    }

    test('A', A)
    test('B', B)
    test('C', C)
    test('D', D)

    for (let i = 0; i < hall.length; i++) {
        if (hall[i] == '') continue
        const canMoveTo = canReachSpots(hall, i)

        if (
            hall[i] == 'A' &&
            canMoveTo.includes('A') &&
            ((A.length == 3 && A[2] == 'A' && A[1] == 'A' && A[0] == 'A') ||
                (A.length == 2 && A[1] == 'A' && A[0] == 'A') ||
                (A.length == 1 && A[0] == 'A') ||
                A.length == 0)
        ) {
            const newA = [...A, hall[i]]
            const newHall = hall.slice()
            newHall[i] = ''
            const c = (Math.abs(i - 2) + maxDepth - A.length) * energy[hall[i]]
            costs.push(move(newHall, newA, B, C, D, moves + 1) + c)
        }
        if (
            hall[i] == 'B' &&
            canMoveTo.includes('B') &&
            ((B.length == 3 && B[2] == 'B' && B[1] == 'B' && B[0] == 'B') ||
                (B.length == 2 && B[1] == 'B' && B[0] == 'B') ||
                (B.length == 1 && B[0] == 'B') ||
                B.length == 0)
        ) {
            const newB = [...B, hall[i]]
            const newHall = hall.slice()
            newHall[i] = ''
            const c = (Math.abs(i - 4) + maxDepth - B.length) * energy[hall[i]]
            costs.push(move(newHall, A, newB, C, D, moves + 1) + c)
        }
        if (
            hall[i] == 'C' &&
            canMoveTo.includes('C') &&
            ((C.length == 3 && C[2] == 'C' && C[1] == 'C' && C[0] == 'C') ||
                (C.length == 2 && C[1] == 'C' && C[0] == 'C') ||
                (C.length == 1 && C[0] == 'C') ||
                C.length == 0)
        ) {
            const newC = [...C, hall[i]]
            const newHall = hall.slice()
            newHall[i] = ''
            const c = (Math.abs(i - 6) + maxDepth - C.length) * energy[hall[i]]
            costs.push(move(newHall, A, B, newC, D, moves + 1) + c)
        }
        if (
            hall[i] == 'D' &&
            canMoveTo.includes('D') &&
            ((D.length == 3 && D[2] == 'D' && D[1] == 'D' && D[0] == 'D') ||
                (D.length == 2 && D[1] == 'D' && D[0] == 'D') ||
                (D.length == 1 && D[0] == 'D') ||
                D.length == 0)
        ) {
            const newD = [...D, hall[i]]
            const newHall = hall.slice()
            newHall[i] = ''
            const c = (Math.abs(i - 8) + maxDepth - D.length) * energy[hall[i]]
            costs.push(move(newHall, A, B, C, newD, moves + 1) + c)
        }
    }

    const min = Math.min(...costs)
    cache.set(str(hall, A, B, C, D), min)
    return min
}
function canReachSpots(hall, i) {
    const iToSpot = {
        2: 'A',
        4: 'B',
        6: 'C',
        8: 'D',
    }
    let l = i - 1
    let r = i + 1
    const possible = []
    while (l >= 0) {
        if (hall[l] == '') {
            if (iToSpot[l] != undefined) possible.push(iToSpot[l])
        } else {
            break
        }
        l--
    }
    while (r < hall.length) {
        if (hall[r] == '') {
            if (iToSpot[r] != undefined) possible.push(iToSpot[r])
        } else {
            break
        }
        r++
    }

    return possible
}

function str(hall, A, B, C, D) {
    const h = hall.map((c, i) => `[${i}:${c}]`).join('')
    const a = A.map((c, i) => `[${i}:${c}]`).join('')
    const b = B.map((c, i) => `[${i}:${c}]`).join('')
    const c = C.map((c, i) => `[${i}:${c}]`).join('')
    const d = D.map((c, i) => `[${i}:${c}]`).join('')
    return `hall(${h}), A(${a}), B(${b}), C(${c}), D(${d})`
}

function print(hall, A, B, C, D, moves = -1, cost) {
    console.log('\n')
    if (moves != -1) console.log(`moves: ${moves}, cost: ${cost}`)
    let str = ''
    hall.forEach((loc) => (str += loc || '.'))
    console.log(str)
    str = '##'
    str += (A[3] || '.') + '#'
    str += (B[3] || '.') + '#'
    str += (C[3] || '.') + '#'
    str += (D[3] || '.') + '##'
    console.log(str)
    str = '##'
    str += (A[2] || '.') + '#'
    str += (B[2] || '.') + '#'
    str += (C[2] || '.') + '#'
    str += (D[2] || '.') + '##'
    console.log(str)
    str = '##'
    str += (A[1] || '.') + '#'
    str += (B[1] || '.') + '#'
    str += (C[1] || '.') + '#'
    str += (D[1] || '.') + '##'
    console.log(str)
    str = '##'
    str += (A[0] || '.') + '#'
    str += (B[0] || '.') + '#'
    str += (C[0] || '.') + '#'
    str += (D[0] || '.') + '##'
    console.log(str)
}

function getPossibleHallLocs(hall, spot) {
    let left = spotToHall[spot] - 1
    let right = spotToHall[spot] + 1
    let possible = []
    while (left >= 0) {
        if (hall[left] == '') {
            possible.push(left)
        } else {
            break
        }
        left--
    }
    while (right < hall.length) {
        if (hall[right] == '') {
            possible.push(right)
        } else {
            break
        }
        right++
    }

    return possible.filter((loc) => !Object.values(spotToHall).includes(loc))
}
