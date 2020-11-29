using LoanModels.Models;
using LoanServices.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace LoanServices.Services
{
    public class CalculationService : ICalculationService
    {
        public LoanPlan CalculateLoanPlan(LoanDetails loanDetails)
        {
            var monthlyPayment = CalculateMonthlyPayment(loanDetails);

            var totalInterestsPaid = 0.0d;
            var totalPrincipalPaid = 0.0d;

            var totalRates = loanDetails.RatesPaidPerYear * loanDetails.PeriodYears;
            var geometricSeriesMultiplier = 1 / (1 + (loanDetails.InterestRate / 100.0d / loanDetails.RatesPaidPerYear));

            var loanPayments = new List<LoanPayment>();

            for(int i = 1; i <= totalRates; i++)
            {
                var principalPaid = monthlyPayment * Math.Pow(geometricSeriesMultiplier, i);
                var interestsPaid = monthlyPayment - principalPaid;

                loanPayments.Add(new LoanPayment
                {
                    InterestPaid = interestsPaid,
                    PrincipalPaid = principalPaid,
                    MonthsPassed = (totalRates - i) * (12 / loanDetails.RatesPaidPerYear) + 1
                });

                totalInterestsPaid += interestsPaid;
                totalPrincipalPaid += principalPaid;
            }

            loanPayments.Sort((p1, p2) => p1.MonthsPassed.CompareTo(p2.MonthsPassed));

            return new LoanPlan
            {
                loanPayments = loanPayments,
                MonthTotalRate = monthlyPayment,
                TotalInterestsPaid = totalInterestsPaid,
                TotalPrincipalPaid = totalPrincipalPaid
            };
        }

        public double CalculateMonthlyPayment(LoanDetails loanDetails)
        {
            var totalRates = loanDetails.RatesPaidPerYear * loanDetails.PeriodYears;
            var nominator = loanDetails.Principal;
            var denominatorBase = 0.0d;
            
            for(int i = 1; i <= totalRates; i++)
            {
                denominatorBase += Math.Pow(1.0d + ((loanDetails.InterestRate / 100.0) / loanDetails.RatesPaidPerYear), -i);
            }

            return nominator / denominatorBase;
        }
    }
}
