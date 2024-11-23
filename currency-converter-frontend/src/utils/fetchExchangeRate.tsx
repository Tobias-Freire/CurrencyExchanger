import axios from 'axios';

const BASE_URL = "http://localhost:8080/getConversion";

interface Conversion {
  toCurrency: string;
  exchangeRate: number;
  fromCurrency: string;
}

export async function fetchExchangeRate(
  fromCurrency?: string | null,
  toCurrency?: string | null
): Promise<number> {
  try {
    const response = await axios.get<Conversion>(BASE_URL, {
      params: {
        fromCurrency,
        toCurrency,
      },
    });

    return response.data.exchangeRate;
  } catch (error) {
    console.error('Erro ao buscar taxa de conversão:', error);
    throw error;
  }
}

