const fs = require('fs')

fs.readFile('input.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return
    }
    main(buff.toString())
})

function main(string) {
    const nums = string.split('\n').map((l) => l.split('').map(Number))
    nums.forEach((l) => console.log(l.join('')))
    const low = []
    for (let y = 0; y < nums.length; y++) {
        for (let x = 0; x < nums[y].length; x++) {
            if (
                nums[y][x] < get(nums, x - 1, y, 10) &&
                nums[y][x] < get(nums, x + 1, y, 10) &&
                nums[y][x] < get(nums, x, y - 1, 10) &&
                nums[y][x] < get(nums, x, y + 1, 10)
            ) {
                low.push({ x, y })
            }
        }
    }
    console.log(low)
    const sizes = low.map((l) => getLow(nums, l))
    sizes.sort((a, b) => b - a)
    console.log(sizes)
    console.log(sizes[0] * sizes[1] * sizes[2])
}

function getLow(nums, low) {
    console.log('finding low for ', low)
    const visited = new Set()
    const queue = [low]
    while (queue.length > 0) {
        const { x, y } = queue.shift()
        if (!visited.has(`${x}-${y}`)) {
            visited.add(`${x}-${y}`)
            if (get(nums, x + 1, y, 0) > get(nums, x, y, -1) && get(nums, x + 1, y, 10) < 9) {
                queue.push({ x: x + 1, y })
            }
            if (get(nums, x - 1, y, 0) > get(nums, x, y, -1) && get(nums, x - 1, y, 10) < 9) {
                queue.push({ x: x - 1, y })
            }
            if (get(nums, x, y + 1, 0) > get(nums, x, y, -1) && get(nums, x, y + 1, 10) < 9) {
                queue.push({ x, y: y + 1 })
            }
            if (get(nums, x, y - 1, 0) > get(nums, x, y, -1) && get(nums, x, y - 1, 10) < 9) {
                queue.push({ x, y: y - 1 })
            }
        }
    }
    return visited.size
}

function get(nums, x, y, def) {
    if (x < 0 || y < 0 || x >= nums[0].length || y >= nums.length || nums[y][x] == 9) {
        return def
    }
    return nums[y][x]
}
