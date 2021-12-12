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
    const paths = findAllPaths(map, 'start', [])
    console.log(paths)
    console.log(paths.length)
}

function findAllPaths(map, location, path) {
    path.push(location)
    if (location == 'end') {
        return [path]
    }

    const paths = []
    map[location].forEach((e) => {
        if (path.indexOf(e) == -1 || e.toUpperCase() == e) {
            const news = findAllPaths(map, e, [...path])
            news.forEach((n) => paths.push(n))
        }
    })
    return paths
}
