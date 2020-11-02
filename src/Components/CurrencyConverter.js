import React, {useState, useEffect} from 'react'
// Data
import CurrencyList from 'Data/CurrencyList'
import myRapidApiID from 'Data/MyRapidApiID'
// CSS
import './CurrencyConverter.css'

const CurrencyConverter = () => {

    const [valueAmount, setValueAmount] = useState()
    const [myCurrency, setMyCurrency] = useState("")
    const [exchangeCurrency, setExchangeCurrency] = useState("") 
    const [exchangeResult, setExchangeResult] = useState()
    const [showResult, setShowResult] = useState(false)

    const onSubmit = data => {
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
                "x-rapidapi-key": myRapidApiID
            }
        }).then(response => response.json())
        .then(response => {
            setExchangeResult(response.rates[exchangeCurrency].rate_for_amount)
            setShowResult(true)
        })
        .catch(err => {
            console.log(err);
        });
    }, [valueAmount, myCurrency, exchangeCurrency])
            
    
    return (
        <>
            <h1>Currency Converter</h1>
            <h3 className="converter-description">
                Select your currencies and the amount you wish to convert!</h3>
            <div className="currency-form">
                <form onInput={onSubmit} >
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
                    <label name="my-amount">My currency: </label>
                    <input 
                        id="value-amount" 
                        name="input-amount"
                        className="input-amount"/>
                </form>
                {showResult && 
                    <h2>
                        {myCurrency}: {valueAmount} = {exchangeCurrency}: {exchangeResult} 
                    </h2>}
            </div>
        </>
    )
}

export default CurrencyConverter