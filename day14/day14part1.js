const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const n = 10
    let [template, , ...longInput] = string.split('\n')
    template = template.split('')
    const input = {}
    longInput.forEach((line) => {
        const [from, to] = line.split(' -> ')
        input[from] = to
    })
    console.log(input)
    console.log('Template:', template)
    for (let counter = 0; counter < n; counter++) {
        for (let i = 0; i < template.length - 1; i++) {
            const pair = template[i] + template[i + 1]
            if (input[pair]) {
                template.splice(i + 1, 0, input[pair])
                i++
            }
        }
        console.log('After step', counter + 1, ': ', template)
    }
    const counts = {}
    template.forEach((char) => {
        counts[char] = (counts[char] || 0) + 1
    })
    console.log('Counts:', counts)
    const sorted = Object.values(counts).sort((a, b) => a - b)
    const min = sorted[0]
    const max = sorted[sorted.length - 1]
    console.log('Min:', min, 'Max:', max)
    console.log('Answer:', max - min)
}
