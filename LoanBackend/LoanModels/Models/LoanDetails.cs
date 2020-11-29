using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace LoanModels.Models
{
    public class LoanDetails
    {
        [Range(1.0, 9999999.9)]
        public double Principal { get; set; }
        [Range(0.1, 99.9)]
        public double InterestRate { get; set; }
        [Range(1, 50)]
        public int PeriodYears { get; set; }
        [Range(1,12)]
        public int RatesPaidPerYear { get; set; }
    }
}
