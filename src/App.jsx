import { useState, useEffect } from 'react';
import InputBox from './components/InputBox.jsx';
import usecurrencyinfo from './hooks/usecurrencyinfo';
import './App.css'

function App() {

  const [amount, setamount] = useState(0);
  const [from, setfrom] = useState("usd");
  const [to, setto] = useState("inr");
  const [convertedamount, setconvertedamount] = useState(0);

  const currencyinfo = usecurrencyinfo(from);
  const options = Object.keys(currencyinfo); 

  const swap = ()=>{
    setfrom(to);
    setto(from);
    setconvertedamount(amount);
    setamount(convertedamount);
  }

  const convert = ()=>{setconvertedamount(amount * currencyinfo[to])};

  useEffect(()=>{convert();}, [from, to, setamount, swap]);

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://aibni.co.uk/content/dam/aibni/personal/fxcentre/images/homepage/Markets-rethink-US-interest-rates.jpg')`,
        }}
    >
      <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
              onSubmit={(e) => {
                  e.preventDefault();
                  convert();
              }}
          >
              <div className="w-full mb-1">
                  <InputBox
                      label="From"
                      amount={amount}
                      currencyoptions={options}
                      onCurrencyChange={(currency)=>setfrom(currency)}
                      onAmountChange={(amount)=>setamount(amount)}
                      selectedcurrency={from}
                  />
              </div>
              <div className="relative w-full h-0.5">
                  <button
                      type="button"
                      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                      onClick={swap}
                  >
                      swap
                  </button>
              </div>
              <div className="w-full mt-1 mb-4">
                  <InputBox
                      label="To"
                      amount={convertedamount}
                      currencyoptions={options}
                      onCurrencyChange={(currency)=>setto(currency)}
                      selectedcurrency={to}
                      amountdisabled={true}
                  />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                  Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
          </form>
          </div>
      </div>
    </div>
    );
}

export default App
