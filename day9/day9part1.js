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
    let count = 0
    for (let y = 0; y < nums.length; y++) {
        for (let x = 0; x < nums[y].length; x++) {
            if (
                nums[y][x] < get(nums, x - 1, y) &&
                nums[y][x] < get(nums, x + 1, y) &&
                nums[y][x] < get(nums, x, y - 1) &&
                nums[y][x] < get(nums, x, y + 1)
            ) {
                count += nums[y][x] + 1
            }
        }
    }
    console.log(count)
}

function get(nums, x, y) {
    if (x < 0 || y < 0 || x >= nums[0].length || y >= nums.length) {
        return 10
    }
    return nums[y][x]
}
