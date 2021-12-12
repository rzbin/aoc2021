const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const map = {}
    const elems = string.split('\n').map((e) => e.split('-'))
    elems.forEach((e) => {
        const [start, end] = e
        if (map[start]) {
            map[start].push(end)
        } else {
            map[start] = [end]
        }
        if (map[end]) {
            map[end].push(start)
        } else {
            map[end] = [start]
        }
    })
    const paths = findAllPaths(map, 'start', [], false)
    console.log(paths.map((e) => e.join(',')).sort())
    console.log(paths.length)
}

function findAllPaths(map, location, path, doubled) {
    path.push(location)
    if (location == 'end') {
        return [path]
    }

    const paths = []
    map[location].forEach((e) => {
        if (e.toUpperCase() == e || path.indexOf(e) == -1) {
            if (e != 'start') {
                const news = findAllPaths(map, e, [...path], doubled)
                news.forEach((n) => paths.push(n))
            }
        }
        if (!doubled) {
            if (!(e.toUpperCase() == e) && path.indexOf(e) != -1) {
                if (e != 'start') {
                    const news = findAllPaths(map, e, [...path], true)
                    news.forEach((n) => paths.push(n))
                }
            }
        }
    })
    return paths
}
