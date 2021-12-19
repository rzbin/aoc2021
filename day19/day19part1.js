const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const scans = string.split('\n\n').map((line) => new Set(line.split('\n').slice(1)))
    const world = scans[0]
    let todo = []
    for (let i = 1; i < scans.length; i++) {
        todo.push(i)
    }

    while (todo.length > 0) {
        console.log(world.size, todo)
        out: for (let j = 0; j < todo.length; j++) {
            const at = todo[j]
            const perm = perms(scans[at])
            console.assert(perm.length === 24)
            for (let k = 0; k < perm.length; k++) {
                const d = overlap(world, perm[k])
                if (d) {
                    console.log('Found overlap with', at, 'd', d)
                    const works = perm[k]
                    for (let i = 0; i < works.length; i++) {
                        const loc = works[i].split(',').map(Number)
                        loc[0] += d.dx
                        loc[1] += d.dy
                        loc[2] += d.dz
                        world.add(loc.join(','))
                    }
                    todo.splice(j, 1)
                    break out
                }
            }
        }
    }
    console.log(world.size)
}

function findPath(from, to, edges) {
    const q = [{ at: from, path: [from] }]
    const seen = new Set([from])
    while (q.length > 0) {
        const { at, path } = q.shift()
        if (at === to) {
            return path
        }
        for (let i = 0; i < edges.length; i++) {
            const { from, to } = edges[i]
            if (from == at && !seen.has(to)) {
                seen.add(to)
                q.push({ at: to, path: [...path, to] })
            }
        }
    }
}

function overlap(scan1, scan2) {
    const s1 = [...scan1].map((x) => {
        let t = x.split(',').map(Number)
        return { x: t[0], y: t[1], z: t[2] }
    })
    const s2 = [...scan2].map((x) => {
        let t = x.split(',').map(Number)
        return { x: t[0], y: t[1], z: t[2] }
    })
    for (let i = 0; i < s1.length; i++) {
        for (let j = 0; j < s2.length; j++) {
            const dx = s1[i].x - s2[j].x
            const dy = s1[i].y - s2[j].y
            const dz = s1[i].z - s2[j].z
            const os2 = s2.map((x) => `${x.x + dx},${x.y + dy},${x.z + dz}`)
            let count = 0
            for (let k = 0; k < os2.length; k++) {
                if (scan1.has(os2[k])) {
                    count++
                }
            }
            if (count >= 12) {
                return { dx, dy, dz }
            }
        }
    }
    return false
}

function perms(points) {
    let p = [...points].map((x) => {
        const t = x.split(',').map(Number)
        return { x: t[0], y: t[1], z: t[2] }
    })
    const perms = []
    for (let x = 0; x < 4; x++) {
        p = p.map((point) => {
            return { x: point.x, y: point.z, z: -point.y }
        })
        for (let y = 0; y < 4; y++) {
            p = p.map((point) => {
                return { x: -point.z, y: point.y, z: point.x }
            })
            for (let z = 0; z < 4; z++) {
                p = p.map((point) => {
                    return { x: point.y, y: -point.x, z: point.z }
                })
                perms.push(p.map((point) => `${point.x},${point.y},${point.z}`))
            }
        }
    }
    const r = []
    out: for (let i = 0; i < perms.length; i++) {
        let same = 0
        for (let j = 0; j < r.length; j++) {
            if (perms[i].join(',') === r[j].join(',')) {
                continue out
            }
        }
        r.push(perms[i])
    }

    return r
}
