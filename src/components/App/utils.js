import {useEffect, useState} from "react";

export const setNumberAsPrice = (number) => {
    return ((number * 100) / 100).toFixed(2);
};

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay]
    );
    return debouncedValue;
};

export const countSum = (array) => {
    console.log(array);
    return Object.values(array).reduce((a, b) => a + b, 0)
}