import { RouteConfigLoadEnd } from '@angular/router';

export class LoanDetails {
    principal: number;
    interestRate: number;
    periodYears: number;
    ratesPaidPerYear: number;
}

export class LoanPlan {
    monthTotalRate: Number;
    loanPayments: Array<LoanPayment>;
    totalPrincipalPaid: number;
    totalInterestsPaid: number;
}

export class LoanPayment {
    monthsPassed: number;
    interestPaid: number;
    principalPaid: number;
}