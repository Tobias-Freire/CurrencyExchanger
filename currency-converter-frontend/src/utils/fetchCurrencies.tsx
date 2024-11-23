import axios from 'axios';

const CURRENCIES_URL = "http://localhost:8080/getCurrencies";

interface Currency {
  code: string;
  name: string;
}

interface CurrenciesResponse {
  currencies: Currency[];
}

export interface Option {
  value: string;
  label: string;
}

export async function fetchCurrencies(): Promise<Option[]> {
  try {
    const response = await axios.get<CurrenciesResponse>(CURRENCIES_URL);
    const currencies = response.data.currencies;

    return currencies.map((currency) => ({
      value: currency.code,
      label: currency.name,
    }));
  } catch (error) {
    console.error("Erro ao buscar as moedas:", error);
    throw error;
  }
}
