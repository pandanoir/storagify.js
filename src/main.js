const Storagify = (key, defaultVal) => {
    const toString = ({}).toString;
    const isNestable = obj => Array.isArray(obj) || toString.call(obj) === toString.call({});

    // ウォッチャーの設定
    const handler = {
        set(target, prop, value) {
            if (isNestable(value)) Reflect.set(target, prop, new Proxy( nest(value), handler )); // valueがオブジェクトか配列だったらProxyを設定
            else Reflect.set(target, prop, value);

            localStorage.setItem(key, JSON.stringify(val)); // localStorageに変更後のオブジェクトを保存
            return true;
        }
    };

    // localStorageに保存する処理
    const keys = [...Array(localStorage.length)].map((_, n) => localStorage.key(n));;
    const keyExists = keys.some(val => val === key); // キーが存在するか判定
    const _val = keyExists ? JSON.parse(localStorage.getItem(key)) : defaultVal;

    // ネストしているところにもプロキシを設定
    const nest = (obj) => {
        if (Array.isArray(obj))
            for (let i = 0, _i = obj.length; i < _i; i++) {
                if (isNestable(obj[i]))
                    obj[i] = new Proxy(nest(obj[i]), handler);
            }
        else
            for (const key of Object.keys(obj)) {
                if (isNestable(obj[key]))
                    obj[key] = new Proxy(nest(obj[key]), handler);
            }
        return obj;
    }

    const val = new Proxy( nest(_val), handler );
    localStorage.setItem(key, JSON.stringify(val));

    return val;
};
export default Storagify;
