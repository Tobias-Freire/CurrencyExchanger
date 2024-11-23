import React, { useEffect, useState } from 'react';
import { fetchExchangeRate } from './utils/fetchExchangeRate';
import { fetchCurrencies, Option } from './utils/fetchCurrencies';
import SelectList from './components/SelectList';
import './App.css';

function App() {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [selectedValue1, setSelectedValue1] = useState<string>('EUR');
  const [selectedValue2, setSelectedValue2] = useState<string>('CAD');
  const [amount1, setAmount1] = useState<string>('1');
  const [amount2, setAmount2] = useState<string>('');
  const [options, setOptions] = useState<Option[]>([]);

  const calculatePreciseAmount = (
    value: number,
    rate: number,
    isMultiply: boolean
  ): string => {
    const scaledValue = value * 1_000_000;
    const scaledRate = rate * 1_000_000;

    const result = isMultiply
      ? (scaledValue * scaledRate) / (1_000_000 * 1_000_000)
      : (scaledValue / scaledRate) * (1_000_000 / 1_000_000);

    return (Math.round(result * 100) / 100).toFixed(2);
  };

  useEffect(() => {
    async function loadCurrencies() {
      try {
        const currencies = await fetchCurrencies();
        setOptions(currencies); // Os dados já vêm no formato correto.
      } catch (error) {
        console.error('Erro ao buscar moedas:', error);
      }
    }

    loadCurrencies();
  }, []);

  useEffect(() => {
    async function getExchangeRate() {
      try {
        const rate = await fetchExchangeRate(selectedValue1, selectedValue2);
        setExchangeRate(rate);

        if (rate !== null) {
          const value = parseFloat(amount1) || 0;
          const converted = calculatePreciseAmount(value, rate, true);
          setAmount2(converted);
        }
      } catch (error) {
        console.error('Erro ao buscar taxa de câmbio:', error);
      }
    }

    getExchangeRate();
  }, [selectedValue1, selectedValue2, amount1]);

  const handleAmount1Change = (value: string) => {
    setAmount1(value);

    if (exchangeRate !== null) {
      const parsedValue = parseFloat(value) || 0;
      const converted = calculatePreciseAmount(parsedValue, exchangeRate, true);
      setAmount2(converted);
    }
  };

  const handleAmount2Change = (value: string) => {
    setAmount2(value);

    if (exchangeRate !== null) {
      const parsedValue = parseFloat(value) || 0;
      const converted = calculatePreciseAmount(parsedValue, exchangeRate, false);
      setAmount1(converted);
    }
  };

  return (
    <div className="App">
      <div className="conversion-container">
        <SelectList
          options={options}
          selectedValue={selectedValue1}
          onChange={(value) => setSelectedValue1(value)}
        />
        <input
          type="number"
          value={amount1}
          onChange={(e) => handleAmount1Change(e.target.value)}
          placeholder="Digite uma quantia"
          min="0"
          step="0.01"
        />
      </div>

      <span>
        Taxa de Câmbio:{' '}
        {exchangeRate !== null ? (Math.round(exchangeRate * 10000) / 10000).toFixed(4) : 'Carregando...'}
      </span>

      <div className="conversion-container">
        <SelectList
          options={options}
          selectedValue={selectedValue2}
          onChange={(value) => setSelectedValue2(value)}
        />
        <input
          type="number"
          value={amount2}
          onChange={(e) => handleAmount2Change(e.target.value)}
          placeholder="Digite uma quantia"
          min="0"
          step="0.01"
        />
      </div>
    </div>
  );
}

export default App;
