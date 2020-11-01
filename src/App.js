import React, {useState, useEffect} from 'react'
// CSS
import './App.css';
// Data
import CurrencyList from './CurrencyList'
// Components
import {useForm} from 'react-hook-form'

function App() {

  const {register, handleSubmit} = useForm();
  const [myValue, setMyValue] = useState("")
  const [exchangeValue, setExchangeValue] = useState("") 
  const [valueAmount, setValueAmount] = useState()
  const [myExchangedValue, setMyExchangedValue] = useState()
  const [showResult, setShowResult] = useState(false)


  const onSubmit = data => {
      setValueAmount(document.getElementById("value-amount").value)
      setMyValue(document.getElementById("myCurrency").value)
      setExchangeValue(document.getElementById("convertCurrency").value)
  }

  const displayCurrency = CurrencyList.currencies.map((currency, index) => (
      <option value={currency.code}>{currency.name}</option>
  ))

  useEffect(() => {
      fetch(`https://currency-converter5.p.rapidapi.com/currency/convert?language=en&format=json&from=${myValue}&to=${exchangeValue}&amount=${valueAmount}`, {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
              "x-rapidapi-key": "985371e109mshb5666c0424d5dcfp1b7485jsndf2afe5a3591"
          }
      }).then(response => response.json())
      .then(response => {
          setMyExchangedValue(response.rates[exchangeValue].rate)
          setShowResult(true)
      })
      .catch(err => {
          console.log(err);
      });
  }, [exchangeValue, myValue, valueAmount, myExchangedValue])

  console.log(myExchangedValue)
  
  return (
      <div className="App">
          <h1>Currency Converter</h1>
          <div className="currency-form">
              <form onSubmit={handleSubmit(onSubmit)} >
                  <input className="input-ammount" id="value-amount"/>
                  <br/>
                  <label>My currency:</label>
                  <select id="myCurrency" className="selection-currency">
                      {displayCurrency}
                  </select>
                  <br/>
                  <label>Convert into:</label>
                  <select id="convertCurrency" className="selection-currency">
                      {displayCurrency}
                  </select>
                  <br/>
                  <input type="submit" ref={register} value="Submit" className="submit-button"/>
              </form>
              {showResult && <h1>{myValue}: {valueAmount} = {exchangeValue}: {myExchangedValue} </h1>}
          </div>
      </div>
  )
}

export default App;
