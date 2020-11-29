import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CalculationService } from '../services/calculation.service';
import { LoanDetails, LoanPlan, LoanPayment } from '../calculator/models/LoanApiModels';
import { Observable, Subscribable, Subscription } from 'rxjs';
import * as CanvasJS from '../../assets/canvasjs.min.js';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-loan-plan',
  templateUrl: './loan-plan.component.html',
  styleUrls: ['./loan-plan.component.css']
})
export class LoanPlanComponent implements OnInit {
  @Input() events: Observable<LoanDetails>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private eventsSubscription: Subscription;

  displayedColumns: string[] = ['monthNo', 'interests', 'principal'];
  paymentsSource = new MatTableDataSource<LoanPayment>();
  loanPlan: LoanPlan = null;

  constructor(private calculationService: CalculationService) {
    
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((loanDetails) => this.beginCalculation(loanDetails));
  }

  ngAfterViewInit(){
    this.paymentsSource.paginator = this.paginator;
  }

  beginCalculation(loanDetails: LoanDetails) {
    this.calculationService.getPaymentsPlan(loanDetails)
      .subscribe(res => this.paymentsPlanLoaded(res.body));
  }

  paymentsPlanLoaded(loanPlan: LoanPlan) {
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Total loan expenses"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: loanPlan.totalInterestsPaid, name: "Interests" },
          { y: loanPlan.totalPrincipalPaid, name: "Principal" },
        ]
      }]
    });
      
    chart.render();
    this.paymentsSource = new MatTableDataSource<LoanPayment>(loanPlan.loanPayments);
    this.loanPlan = loanPlan;
    this.paymentsSource.paginator = this.paginator;
  }
}
