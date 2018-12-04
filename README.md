You don't need to deal with localStorage. Storagify.js automatically save and load localStorage.

# How to use

```javascript
// Storagify(key, defaultVal)
const obj = Storagify('obj', {
    a: 1,
    b: 2,
    c: 3,
});
const arr = Storagify('arr', [1, 2, 3]);

```

If localStorage has item that has given key, Storagify returns localStorage item. Otherwise Storagify returns given defaultVal;

When you changed `obj` or `arr` properties, then Storagify saves the changes.
