const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const lines = string.split('\n')
    let p1 = Number(lines[0].charAt(lines[0].length - 1))
    let p2 = Number(lines[1].charAt(lines[1].length - 1))
    let s1 = 0
    let s2 = 0

    let dice = 1
    let turns = 0
    const roll = (die) => {
        turns++
        dice = die + 1 > 100 ? 1 : die + 1
        return die % 10
    }
    const n = 1000
    while (true) {
        console.log(`\n p1 ${p1}`)
        let r
        r = roll(dice)
        p1 = rollover(p1 + r)
        console.log('Added ' + r + ', p1 now ' + p1)
        r = roll(dice)
        p1 = rollover(p1 + r)
        console.log('Added ' + r + ', p1 now ' + p1)
        r = roll(dice)
        p1 = rollover(p1 + r)
        console.log('Added ' + r + ', p1 now ' + p1)

        s1 += p1
        console.log(`turn ${turns} p1: ${p1} s1: ${s1}`)
        if (s1 >= n) break

        console.log(`\n p2 ${p2}`)
        r = roll(dice)
        p2 = rollover(p2 + r)
        console.log('Added ' + r + ', p2 now ' + p2)
        r = roll(dice)
        p2 = rollover(p2 + r)
        console.log('Added ' + r + ', p2 now ' + p2)
        r = roll(dice)
        p2 = rollover(p2 + r)
        console.log('Added ' + r + ', p2 now ' + p2)

        s2 += p2
        console.log(`turn ${turns} p2: ${p2} s2: ${s2}`)
        if (s2 >= n) break
    }
    console.log(`Turns: ${turns}, s1: ${s1}, s2: ${s2}`)
    console.log(turns * Math.min(s1, s2))
}

//stupid
function rollover(n) {
    if (n <= 10) return n
    return n - 10
}
