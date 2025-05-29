package com.climate.backend.service;

import com.climate.backend.model.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.json.JSONObject;

@Service
public class WeatherService {

    @Value("${openweathermap.api.key}")
    private String apiKey;

    @Value("${openweathermap.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public WeatherResponse getWeather(String city) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("q", city)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric")
                .toUriString();

        String response = restTemplate.getForObject(url, String.class);
        JSONObject json = new JSONObject(response);

        WeatherResponse weather = new WeatherResponse();
        weather.setCity(json.getString("name"));
        weather.setTemperature(json.getJSONObject("main").getDouble("temp"));
        weather.setHumidity(json.getJSONObject("main").getInt("humidity"));
        weather.setWindSpeed(json.getJSONObject("wind").getDouble("speed"));
        weather.setDescription(json.getJSONArray("weather").getJSONObject(0).getString("main"));

        return weather;
    }
}
