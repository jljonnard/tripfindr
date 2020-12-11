import axios from "axios";

export const skyscannerAPI = axios.create({
    baseURL:
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/fr/EUR",
});

export const unsplashAPI = axios.create({
    baseURL: "https://api.unsplash.com/search/photos",
});
