import { Component, OnInit } from '@angular/core';
import { CurrencyServise } from 'src/app/services/currencies.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  firstCurrency: string = "UAH";
  secondCurrency: string = "USD";
  
  firstQuantity: number = 0;
  secondQuantity: number = 0;

  currencies: string[][] = [["UAH", "Ukrainian hryvnia"], ["USD", "United States dollar"], ["EUR", "Euro"]];
  countries: any;
  rate:number = 0;

  constructor(private currencyService: CurrencyServise) { }
  
  ngOnInit(): void {

    this.currencyService.getCountries().subscribe({
      next: response => {
        this.countries = response;              
      },
      error: (err) => alert(err.message),
      // complete: () => console.info('complete')
    });


    this.currencyService.getAllCurrencies(this.firstCurrency).subscribe({
      next: response => {          
        // this.currencies = Object.keys(response.rates);
        this.currencies = Object.keys(response.rates).map(currency => {
          const key = currency.toLowerCase();
          const country = this.countries[key] || "Unknown";
          return [currency, country];
        });        
        this.rate = response.rates.USD;      
      },
      error: (err) => alert(err.message),
      // complete: () => console.info('complete')
    });    
  }

  onCurrencyChange() {
    this.currencyService.getCompareCurrencies(this.firstCurrency, this.secondCurrency).subscribe({
      next: response => {          
        this.rate = Number(Object.values(response.rates)[0]);     
        this.onFirstQuantitychange();
      },
      error: (err) => alert(err.message),
      complete: () => console.info('complete')
    });    
  } 


  onFirstQuantitychange() {    
    if (this.rate === 0) {     
      return;
    }

    if (this.firstQuantity !== 0) {
      this.secondQuantity = this.firstQuantity * this.rate;
      // this.secondQuantity = Number((this.firstQuantity * this.rates).toFixed(3));
    }
     
  }

  onSecondQuantitychange() {    
    if (this.rate === 0) {    
      return;
    }

    if (this.secondQuantity !== 0) {
      this.firstQuantity = this.secondQuantity / this.rate;
      // this.firstQuantity = Number((this.secondQuantity / this.rates).toFixed(3));
    }
  }

  onClick(e:any) {     
    if (e.target.name === "firstCurrencyButton") {
      this.firstCurrency = e.target.value;
    } else if (e.target.name === "secondCurrencyButton") {
      this.secondCurrency = e.target.value;      
    }

    this.onCurrencyChange();
  } 

}
