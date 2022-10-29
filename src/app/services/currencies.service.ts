import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})

export class CurrencyServise {

    errorMessage: string = "";   

    constructor(private http: HttpClient) {  }

    getAllCurrencies(curName: string): Observable<any> {     
        return this.http.get(`https://api.exchangerate.host/latest?base=${curName}`);        
    }

    getCompareCurrencies(firstCur: string, secondCur: string): Observable<any> {   
        return this.http.get(`https://api.exchangerate.host/latest?base=${firstCur}&symbols=${secondCur}`);
    }

    getCountries(): Observable<any> {
        return this.http.get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json");
    }
}