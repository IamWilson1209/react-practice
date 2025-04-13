import { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    la: '',
    lt: '',
    ir: '',
  });
  const [result, setResult] = useState(null);

  /* 改變formData狀態 */
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* 提交表單 */
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const loanAmount = parseFloat(formData.la);
    const loanTerm = parseFloat(formData.lt);
    const interestRate = parseFloat(formData.ir) / 100;

    if (
      isNaN(loanAmount) ||
      isNaN(loanTerm) ||
      isNaN(interestRate) ||
      loanAmount <= 0 ||
      loanTerm <= 0 ||
      interestRate < 0
    ) {
      setResult(null);
      return;
    }
    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = loanTerm * 12;

    /*每月支付金額公式：M = P[i(1+i)^n]/[(1+i)^n - 1] */
    const monthlyPayment =
      loanAmount *
      ((monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1));

    /* 總支付金額 */
    const totalPayment = monthlyPayment * numberOfPayments;

    /* 總利息支付 */
    const totalInterest = totalPayment - loanAmount;

    /* 先多算兩位到整數位，再/100變成浮點數 */
    setResult({
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
    });
  };

  return (
    <>
      <form onSubmit={handleOnSubmit} className="loan-form">
        <div className="form-item">
          <label>Loan Amount: </label>
          <input
            type="text"
            name="la"
            value={formData.la}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-item">
          <label>Loan Term (years): </label>
          <input
            type="text"
            name="lt"
            value={formData.lt}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-item">
          <label>Interest Rate (%): </label>
          <input
            type="text"
            name="ir"
            value={formData.ir}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
      {result && (
        <div>
          <p>Monthly Payment: ${result.monthlyPayment}</p>
          <p>Total Payment: ${result.totalPayment}</p>
          <p>Total Interest: ${result.totalInterest}</p>
        </div>
      )}
    </>
  );
}
