const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const n = 40
    let [template, , ...longInput] = string.split('\n')
    template = template.split('')
    const translate = {}
    longInput.forEach((line) => {
        const [from, to] = line.split(' -> ')
        translate[from] = to
    })
    let counts = {}
    const letterCounts = {}
    let i = 0
    for (; i < template.length - 1; i++) {
        const pair = template[i] + template[i + 1]
        counts[pair] = (counts[pair] || 0) + 1
        letterCounts[template[i]] = (letterCounts[template[i]] || 0) + 1
    }
    letterCounts[template[i]] = (letterCounts[template[i]] || 0) + 1

    console.log('translate', translate)
    console.log('counts', counts)
    for (let i = 0; i < n; i++) {
        let newCounts = {}
        for (let key in counts) {
            const to = translate[key]
            const toLeft = key.split('')[0] + to
            const toRight = to + key.split('')[1]
            newCounts[toLeft] = (newCounts[toLeft] || 0) + counts[key]
            newCounts[toRight] = (newCounts[toRight] || 0) + counts[key]
            letterCounts[to] = (letterCounts[to] || 0) + counts[key]
        }
        counts = newCounts
        console.log('counts', i + 1, counts)
    }
    console.log('letter counts', letterCounts)

    const min = Math.min(...Object.values(letterCounts))
    const max = Math.max(...Object.values(letterCounts))
    console.log('Min', min, 'Max', max, 'Diff', max - min)
}
