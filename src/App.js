import React, {useState, useEffect} from 'react'
// CSS
import './App.css';
// Data
import CurrencyList from './CurrencyList'
// Components
import {useForm} from 'react-hook-form'

function App() {

  const {register, handleSubmit} = useForm();
  const [valueAmount, setValueAmount] = useState()
  const [myCurrency, setMyCurrency] = useState("")
  const [exchangeCurrency, setExchangeCurrency] = useState("") 
  const [exchangeResult, setExchangeResult] = useState()
  const [showResult, setShowResult] = useState(false)


  const onSubmit = data => {
      // data.preventDefault()
      setValueAmount(document.getElementById("value-amount").value)
      setMyCurrency(document.getElementById("selectedCurrency1").value)
      setExchangeCurrency(document.getElementById("selectedCurrency2").value)
  }

  const displayCurrency = CurrencyList.currencies.map((currency, index) => (
      <option value={currency.code} key={index}>{currency.name}</option>
  ))

  useEffect(() => {
      fetch(`https://currency-converter5.p.rapidapi.com/currency/convert?language=en&format=json&from=${myCurrency}&to=${exchangeCurrency}&amount=${valueAmount}`, {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
              "x-rapidapi-key": "985371e109mshb5666c0424d5dcfp1b7485jsndf2afe5a3591"
          }
      }).then(response => response.json())
      .then(response => {
          console.log(response)
          setExchangeResult(response.rates[exchangeCurrency].rate_for_amount)
          setShowResult(true)
      })
      .catch(err => {
          console.log(err);
        });
      }, [valueAmount, myCurrency, exchangeCurrency])
        
  
  return (
      <div className="App">
          <h1>Currency Converter</h1>
          <div className="currency-form">
              <form onInput={handleSubmit(onSubmit)} >
                  <input 
                    id="value-amount" 
                    name="input-amount"
                    className="input-amount"/>
                  <br/>
                  <label name="my-chosen-currency">My currency:</label>
                  <select id="selectedCurrency1" className="selection-currency">
                      {displayCurrency}
                  </select>
                  <br/>
                  <label name="chosen-output-currency">Convert into:</label>
                  <select id="selectedCurrency2" className="selection-currency">
                      {displayCurrency}
                  </select>
                  <br/>
                  <input name="submit-button" type="submit" ref={register} value="Submit" className="submit-button"/>
              </form>
              {showResult && <h1>{myCurrency}: {valueAmount} = {exchangeCurrency}: {exchangeResult} </h1>}
          </div>
      </div>
  )
}

export default App;
