import React, { useEffect, useState } from "react";
import { useDebounce } from "../App/utils";
import './CartButtons.css';


export const CartButtons = ({min, max, isBlocked, pid, setSum, price}) => {

    const [productQuantity, setProductQuantity] = useState(min);

    const debouncedProductQuantity = useDebounce(productQuantity, 1000);

    const addProduct = () => {
        if (productQuantity < max)
            return setProductQuantity(productQuantity + 1);

    };

    const removeProduct = () => {
        if (productQuantity > min)
            return setProductQuantity(productQuantity - 1);
    };

    const checkQuantity = () => {
        fetch('/api/product/check', {
            method: "POST",
            body: JSON.stringify({
                pid: `${pid}`,
                quantity: `${productQuantity}`
            })
        }).then(response => {
            if (response.status === 406) {
                return response.json();
            }
        }).then(data => {
            if (data?.isError === true) {
                setProductQuantity(min)
            }
        })
    };

    useEffect(()=> {
            if (debouncedProductQuantity) {
                checkQuantity()
            }
        }, [debouncedProductQuantity]);

    useEffect(() => {
        setSum(prevState => {
            return {...prevState, [pid]: productQuantity * price}
        })
    }, [productQuantity]);


    return <div>
            <div>
                Obecnie masz {productQuantity} sztuk produktu
            </div>
            <button
                className="button"
                disabled={(productQuantity === max) || isBlocked}
                onClick={() => addProduct()}>
                +
            </button>
            <button
                className="button"
                disabled={productQuantity === min || isBlocked}
                onClick={() => removeProduct()}
            >
                -
            </button>
        </div>

};