const assert = require('assert');
const Storagify = require('../dist/storagify.js');
describe('Storagify', () => {
    beforeEach(() => {
        localStorage.clear();
    })
    it('watch properties', () => {
        const key = 'obj';
        const obj = Storagify(key, {a: 1, b: 2, c: 3});
        assert.equal(localStorage.getItem(key), JSON.stringify({a: 1, b: 2, c: 3}));
        obj.a++;
        assert.equal(localStorage.getItem(key), JSON.stringify({a: 2, b: 2, c: 3}));
    });
    it('watch array', () => {
        const key = 'arr';
        const arr = Storagify(key, [1, 2, 3]);
        assert.equal(localStorage.getItem(key), JSON.stringify([1, 2, 3]));
        arr.push(4);
        assert.equal(localStorage.getItem(key), JSON.stringify([1, 2, 3, 4]));
        arr[1]++;
        assert.equal(localStorage.getItem(key), JSON.stringify([1, 3, 3, 4]));
    });
    it('watch nested properties', () => {
        const key = 'obj';
        const obj = Storagify(key, [{a: 1, b: 2, c: 3}, {d: 4, e: 5, f: 6}]);
        assert.equal(localStorage.getItem(key), JSON.stringify([{a: 1, b: 2, c: 3}, {d: 4, e: 5, f: 6}]));
        obj[0].a++;
        assert.equal(localStorage.getItem(key), JSON.stringify([{a: 2, b: 2, c: 3}, {d: 4, e: 5, f: 6}]));
    });
    it('watch nested properties added later', () => {
        const key = 'obj';
        const obj = Storagify(key, [{a: 1, b: 2, c: 3}, {d: 4, e: 5, f: 6}]);
        assert.equal(localStorage.getItem(key), JSON.stringify([{a: 1, b: 2, c: 3}, {d: 4, e: 5, f: 6}]));
        obj.push({hoge: 42, fuga: 43});
        assert.equal(localStorage.getItem(key), JSON.stringify([{a: 1, b: 2, c: 3}, {d: 4, e: 5, f: 6}, {hoge: 42, fuga: 43}]));
        obj[2].hoge = 3;
        assert.equal(localStorage.getItem(key), JSON.stringify([{a: 1, b: 2, c: 3}, {d: 4, e: 5, f: 6}, {hoge: 3, fuga: 43}]));
    });
});
