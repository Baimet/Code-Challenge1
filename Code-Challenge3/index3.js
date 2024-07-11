class SalaryCalculator {
  constructor(basicSalary, benefits) {
    this.basicSalary = basicSalary;
    this.benefits = benefits;
    this.grossSalary = this.calculateTaxableIncome();
    this.paye = this.calculatePAYE();
    this.nhif = this.calculateNHIF();
    this.nssf = this.calculateNSSF();
    this.netSalary = this.calculateNetSalary();
  }

  calculateTaxableIncome() {
    return this.basicSalary + this.benefits;
  }

  calculatePAYE() {
    if (this.grossSalary <= 24000) {
      return this.grossSalary * 0.1;
    } else if (this.grossSalary <= 32333) {
      return 24000 * 0.1 + (this.grossSalary - 24000) * 0.25;
    } else if (this.grossSalary <= 500000) {
      return (
        24000 * 0.1 + (32333 - 24000) * 0.25 + (this.grossSalary - 32333) * 0.3
      );
    } else if (this.grossSalary <= 800000) {
      return (
        24000 * 0.1 +
        (32333 - 24000) * 0.25 +
        (500000 - 32333) * 0.3 +
        (this.grossSalary - 500000) * 0.325
      );
    } else {
      return (
        24000 * 0.1 +
        (32333 - 24000) * 0.25 +
        (500000 - 32333) * 0.3 +
        (800000 - 500000) * 0.325 +
        (this.grossSalary - 800000) * 0.35
      );
    }
  }

  calculateNHIF() {
    const nhifTable = [
      { limit: 5999, deduction: 150 },
      { limit: 7999, deduction: 300 },
      { limit: 11999, deduction: 400 },
      { limit: 14999, deduction: 500 },
      { limit: 19999, deduction: 600 },
      { limit: 24999, deduction: 750 },
      { limit: 29999, deduction: 850 },
      { limit: 34999, deduction: 900 },
      { limit: 39999, deduction: 950 },
      { limit: 44999, deduction: 1000 },
      { limit: 49999, deduction: 1100 },
      { limit: 59999, deduction: 1200 },
      { limit: 69999, deduction: 1300 },
      { limit: 79999, deduction: 1400 },
      { limit: 89999, deduction: 1500 },
      { limit: 99999, deduction: 1600 },
      { limit: Infinity, deduction: 1700 },
    ];
    for (let i = 0; i < nhifTable.length; i++) {
      if (this.grossSalary <= nhifTable[i].limit) {
        return nhifTable[i].deduction;
      }
    }
    return 0;
  }

  calculateNSSF() {
    const tier1 = Math.min(this.basicSalary, 7000) * 0.06;
    const tier2 = Math.max(0, Math.min(this.basicSalary - 7000, 29000)) * 0.06;
    return tier1 + tier2;
  }

  calculateNetSalary() {
    return this.grossSalary - (this.paye + this.nhif + this.nssf);
  }

  getSalaryDetails() {
    return {
      grossSalary: this.grossSalary.toFixed(2),
      paye: this.paye.toFixed(2),
      nhif: this.nhif.toFixed(2),
      nssf: this.nssf.toFixed(2),
      netSalary: this.netSalary.toFixed(2),
    };
  }
}

function calculateNetSalary() {
  const basicSalary = parseFloat(document.getElementById("basicSalary").value);
  const benefits = parseFloat(document.getElementById("benefits").value);

  const calculator = new SalaryCalculator(basicSalary, benefits);
  const salaryDetails = calculator.getSalaryDetails();

  const details = `
        Gross Salary: Ksh ${salaryDetails.grossSalary}<br>
        PAYE: Ksh ${salaryDetails.paye}<br>
        NHIF: Ksh ${salaryDetails.nhif}<br>
        NSSF: Ksh ${salaryDetails.nssf}<br>
        Net Salary: Ksh ${salaryDetails.netSalary}
    `;
  document.getElementById("salaryDetails").innerHTML = details;
}

export { calculateNetSalary };
