const isNestable = obj => Array.isArray(obj) || ({}).toString.call(obj) === ({}).toString.call({});
const Storagify = (key, defaultVal) => {
    // ウォッチャーの設定
    const watcher = {
        set(target, prop, value) {
            if (isNestable(value))
                Reflect.set(target, prop, new Proxy( deepWatcher(value), watcher )); // valueがオブジェクトか配列だったらProxyを設定
            else
                Reflect.set(target, prop, value);

            localStorage.setItem(key, JSON.stringify(watchedValue)); // localStorageに変更後のオブジェクトを保存
            return true;
        }
    };
    // ネストしているところにもプロキシを設定
    const deepWatcher = (obj) => {
        if (Array.isArray(obj))
            return obj.map(item => {
                if (!isNestable(item))
                    return item;
                return new Proxy(deepWatcher(item), watcher);
            });

        for (const key of Object.keys(obj)) {
            if (!isNestable(obj[key]))
                continue;
            obj[key] = new Proxy(deepWatcher(obj[key]), watcher);
        }
        return obj;
    };

    // localStorageに保存する処理
    const localStorageKeys = [...Array(localStorage.length)].map((_, n) => localStorage.key(n));;
    const keyExists = localStorageKeys.some(val => val === key);
    const value = (keyExists ? JSON.parse(localStorage.getItem(key)) : defaultVal);

    const watchedValue = new Proxy( deepWatcher(value), watcher );
    localStorage.setItem(key, JSON.stringify(watchedValue));

    return watchedValue;
};
export default Storagify;
