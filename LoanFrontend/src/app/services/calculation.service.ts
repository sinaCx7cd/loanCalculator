import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoanDetails, LoanPlan } from '../calculator/models/LoanApiModels';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  constructor(private http: HttpClient) { 
    
  }

  getPaymentsPlan(loanDetails: LoanDetails) {
    return this.http.post<LoanPlan>('http://51.91.8.173:8762/api/loans/calculate/loan_plan', loanDetails, { observe: "response", responseType: "json" });
  }
}
