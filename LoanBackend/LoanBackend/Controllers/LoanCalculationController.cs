using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LoanModels.Models;
using LoanServices.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LoanBackend.Controllers
{
    [ApiController]
    [Route("api/loans/calculate")]
    public class LoanCalculationController : ControllerBase
    {
        private ICalculationService _calculationService;
        public LoanCalculationController(ICalculationService calculationService)
        {
            _calculationService = calculationService;
        }

        [HttpGet("monthly_payment")]
        public IActionResult CalculateMonthlyPayment([FromBody] LoanDetails loanDetails)
        {
            return Ok(_calculationService.CalculateMonthlyPayment(loanDetails));
        }

        [HttpPost("loan_plan")]
        public IActionResult CalculateLoanPlan([FromBody] LoanDetails loanDetails)
        {
            return Ok(_calculationService.CalculateLoanPlan(loanDetails));
        }
    }
}
