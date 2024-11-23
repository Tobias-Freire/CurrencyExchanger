package com.CurrencyConverter.app.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

@SpringBootApplication
@RestController
public class CurrencyConverterBackendSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(CurrencyConverterBackendSpringApplication.class, args);
    }

    @Value("${exchangerate.api_key}")
    private String API_KEY;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getConversion")
    public ResponseEntity<Map<String, Object>> getConversion(
            @RequestParam(value = "fromCurrency", defaultValue = "USD") String fromCurrency,
            @RequestParam(value = "toCurrency", defaultValue = "BRL") String toCurrency) {

        String completeURL = "https://v6.exchangerate-api.com/v6/" + this.API_KEY + "/latest/" + fromCurrency;
        Map<String, Object> responseMap = new HashMap<>();

        try {
            URL url = new URL(completeURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            JSONObject jsonResponse = new JSONObject(response.toString());
            double exchangeRate = jsonResponse.getJSONObject("conversion_rates").getDouble(toCurrency);

            responseMap.put("fromCurrency", fromCurrency);
            responseMap.put("toCurrency", toCurrency);
            responseMap.put("exchangeRate", exchangeRate);
            return ResponseEntity.ok(responseMap);
        } catch (Exception e) {
            responseMap.put("error", "Erro ao obter taxa de câmbio: " + e.getMessage());
            return ResponseEntity.status(500).body(responseMap);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getCurrencies")
    public ResponseEntity<Map<String, Object>> getCurrencies() {

        String completeURL = "https://v6.exchangerate-api.com/v6/" + this.API_KEY + "/codes";
        Map<String, Object> responseMap = new HashMap<>();

        try {
            URL url = new URL(completeURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            JSONObject jsonResponse = new JSONObject(response.toString());
            JSONArray codesArray = jsonResponse.getJSONArray("supported_codes");

            List<Map<String, String>> currencies = new ArrayList<>();   
            for (int i = 0; i < codesArray.length(); i++) {
                JSONArray codePair = codesArray.getJSONArray(i);
                Map<String, String> currency = new HashMap<>();
                currency.put("code", codePair.getString(0));
                currency.put("name", codePair.getString(1));
                currencies.add(currency);
            }

            responseMap.put("currencies", currencies);
            return ResponseEntity.ok(responseMap);

        } catch (Exception e) {
            responseMap.put("error", "Erro ao obter códigos de moedas: " + e.getMessage());
            return ResponseEntity.status(500).body(responseMap);
        }
    }
}
