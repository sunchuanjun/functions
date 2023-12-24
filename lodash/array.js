module.exports = {
    chunk,
    compact
}

function chunk(arr, size = 1) {
    if (!size) return;
    let i = 0, res = [], count = Math.ceil(arr.length / size);
    while (count--) {
        res.push(arr.slice(i * size, size * (i + 1)))
        ++i;
    }
    return res;
}

function compact(arr) {
    return arr.filter(Boolean);
}