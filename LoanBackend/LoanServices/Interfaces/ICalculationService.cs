using LoanModels.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace LoanServices.Interfaces
{
    public interface ICalculationService
    {
        public double CalculateMonthlyPayment(LoanDetails loanDetails);
        public LoanPlan CalculateLoanPlan(LoanDetails loanDetails);
    }
}
