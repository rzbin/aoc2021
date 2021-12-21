const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

const cache = new Map()

function main(string) {
    const lines = string.split('\n')
    let p1 = Number(lines[0].charAt(lines[0].length - 1))
    let p2 = Number(lines[1].charAt(lines[1].length - 1))

    const n = 21
    const [w1, w2] = play(1, p1, p2, 0, 0, n)
    console.log(w1, w2)
    console.log(Math.max(w1, w2))
}

function play(turn, p1, p2, s1, s2, n) {
    if (cache.has(`${turn}-${p1}-${p2}-${s1}-${s2}`)) {
        return cache.get(`${turn}-${p1}-${p2}-${s1}-${s2}`)
    }
    if (s1 >= n) {
        return [1, 0]
    } else if (s2 >= n) {
        return [0, 1]
    }
    console.assert(turn === 1 || turn === 2)
    console.assert(p1 >= 0 && p1 <= 10)
    console.assert(p2 >= 0 && p2 <= 10)
    console.assert(s1 >= 0 && s1 < n)
    console.assert(s2 >= 0 && s2 < n)

    let p1Wins = 0
    let p2Wins = 0

    const perms = getPerms()
    if (turn === 1) {
        for (let i = 0; i < perms.length; i++) {
            const add = perms[i]
            const newP1 = rollover(p1 + add)
            const [w1, w2] = play(2, newP1, p2, s1 + newP1, s2, n)
            p1Wins += w1
            p2Wins += w2
        }
    } else if (turn === 2) {
        for (let i = 0; i < perms.length; i++) {
            const add = perms[i]
            const newP2 = rollover(p2 + add)
            const [w1, w2] = play(1, p1, newP2, s1, s2 + newP2, n)
            p1Wins += w1
            p2Wins += w2
        }
    }

    cache.set(`${turn}-${p1}-${p2}-${s1}-${s2}`, [p1Wins, p2Wins])
    return [p1Wins, p2Wins]
}

function getPerms() {
    const perms = []
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            for (let k = 1; k <= 3; k++) {
                perms.push(i + j + k)
            }
        }
    }
    return perms
}

//stupid
function rollover(n) {
    if (n <= 10) return n
    return n - 10
}
