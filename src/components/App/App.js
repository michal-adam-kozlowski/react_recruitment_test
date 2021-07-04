import React, { useState, useEffect } from 'react';
import './App.css';
import {countSum, setNumberAsPrice} from "./utils";
import {CartButtons} from "../CartButtons/CartButtons";


const App = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sum, setSum] = useState([]);

    useEffect(() => {
        fetch('/api/cart')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.log(`Error data fetching, error: ${error}`)
                setError(error)
            })
            .finally(()=> {
                setLoading(false)
            })

    }, []);


  return (
    <div className="container">
      <h3>Lista produktów</h3>
      <ul>
          {data &&
              data.map(({pid, name, price, max, min, isBlocked}) =>
                  <li  key={pid} className="row">
                      {name}, cena: {setNumberAsPrice(price)} zł
                      <CartButtons
                          min={min}
                          max={max}
                          isBlocked={isBlocked}
                          pid={pid}
                          setSum={setSum}
                          price={price}
                          sum={sum}
                      />
                  </li>
              )
          }
          {
              loading && <div>Loading...</div>
          }
          {
              error && <div>Error!</div>
          }
      </ul>
        <div>
            Suma zamówienia {countSum(sum).toFixed(2)} zł
        </div>
    </div>
  );
};

export {
    App
};
