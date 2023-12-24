const { chunk, compact, difference } = require("../lodash/array");
const { range, dropRight, flatten, isEqual } = require("lodash");
var assert = require("assert");

describe("Array", function () {
    describe("#chunk()", function () {
        it("个数与值符合预期", function () {

            for (let i = 0; i < 100; i++) {
                for (let j = 0; j < 100; j++) {
                    const ran = range(i).fill().map(() => new Object());
                    const arr = chunk(ran, j);
                    if (j !== 0) {
                        assert.ok(arr.length === Math.ceil(i / j));
                        (i % j === 0 ? arr : dropRight(arr)).forEach((child) => {
                            assert.ok(child.length === j);
                        });
                        assert.ok(isEqual(flatten(arr), ran));
                    }
                }
            }
        });
    });
    describe("#compact()", function () {
        it("成功过滤", function () {
            const arr = [0, false, null, NaN, "", undefined];
            assert.ok(compact(arr).length === 0)
        })
    })
    describe("#difference()", function () {
        it("成功过滤", function () {
            var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (let i = 0; i < a.length; i++) {
                var b = [a[i]];
                assert.ok(isEqual(b, difference(a, b)))
            }
        })
    })

});
