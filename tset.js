
const obj = {
    data: 1,
    toJSON: function () {
        return 2
    }
}
console.log(JSON.stringify(obj))