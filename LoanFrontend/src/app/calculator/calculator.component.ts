import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { LoanDetails, LoanPlan } from './models/LoanApiModels';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ]
})

export class CalculatorComponent implements OnInit {
  private properLoanChoices: Array<string> = ['house', 'car', 'spending'];
  calculationSubject: Subject<LoanDetails> = new Subject<LoanDetails>();
  chosenLoanType: string = "";
  loanHasProperState: boolean = false;
  amountFormGroup: FormGroup;
  paybackPeriod: number = 1;
  amount: number = 200000;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.amountFormGroup = this._formBuilder.group({
      amountCtrl: ['',  Validators.pattern('[0-9]+')]
    });
  }

  onLoanChoice(loanType: string) {
    this.chosenLoanType = loanType;
    this.checkLoanHasProperState();
  }

  checkLoanHasProperState() {
    this.loanHasProperState = this.properLoanChoices.includes(this.chosenLoanType);
  }

  onCalculateRequest() {
    if(!this.isFormValid()){
      return;
    }

    var eventDetails = new LoanDetails();
    // when implementing features below, set depending on chosen loan type, for now, config would do
    eventDetails.interestRate = 3.5;
    eventDetails.ratesPaidPerYear = 12;
    eventDetails.periodYears = this.paybackPeriod;
    eventDetails.principal = Number(this.amount);
    this.calculationSubject.next(eventDetails);
  }

  isFormValid() {
    return this.loanHasProperState && !isNaN(this.amount);
  }

  getSettingsSummary() {
    return this.paybackPeriod + '-Year ' + this.chosenLoanType + ' loan with amount of ' + this.amount + "$";
  }
}
