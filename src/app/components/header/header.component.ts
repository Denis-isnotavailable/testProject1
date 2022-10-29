import { Component, OnInit } from '@angular/core';
import { CurrencyServise } from 'src/app/services/currencies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logo: string = "Currency Ukraine";
  currentCurrency: string = "UAH";
  currencies: string = "";

  constructor(private currencyService: CurrencyServise) { }

  ngOnInit() {
    this.currencyService.getAllCurrencies(this.currentCurrency).subscribe({
      next: response => {          
        const ob = response.rates;      
        for (const key in ob) {
          this.currencies += key + ": " + Number((1 / ob[key]).toFixed(2)) + " | ";
        }      
      },
      error: (err) => alert(err.message),
      // complete: () => console.info('complete')
    });
  }

}