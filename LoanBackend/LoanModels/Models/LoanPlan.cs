using System;
using System.Collections.Generic;
using System.Text;

namespace LoanModels.Models
{
    public class LoanPlan
    {
        public double MonthTotalRate { get; set; }
        public List<LoanPayment> loanPayments { get; set; }
        public double TotalPrincipalPaid { get; set; }
        public double TotalInterestsPaid { get; set; }
    }

    public class LoanPayment
    {
        public int MonthsPassed { get; set; }
        public double PrincipalPaid { get; set; }
        public double InterestPaid { get; set; }
    }
}
