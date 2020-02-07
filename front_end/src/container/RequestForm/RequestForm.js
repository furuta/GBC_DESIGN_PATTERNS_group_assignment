import React from "react";
import "./RequestForm.scss";
import Step from "../../component/formStep/formStep";
import PersonalInfo from "../../component/form/personalInfo/personalInfo";
import LoanInfo from "../../component/form/loanInfo/loanInfo";
import { CSSTransition } from "react-transition-group";
const stepsList = [
  { id: 1, content: "Personal Information" },
  { id: 2, content: "Loan" }
];
function RequestForm() {
  const [step, setStep] = React.useState(1);
  const [infor, setInfor] = React.useState({
    name: "",
    address: "",
    phone: "",
    amountOfMoney: "",
    reason: ""
  });
  const handleInforChange = input => e => {
    const updatedInfo = { ...infor };
    updatedInfo[input] = e.target.value;
    setInfor(updatedInfo);
  };
  const processStep = () => {
    if (step === 1) {
      let newStep = step + 1;
      setStep(newStep);
    } else if (step === 2) {
      let newStep = step - 1;
      setStep(newStep);
    }
  };
  const { name, address, phone, amountOfMoney, reason } = infor;
  let content;
  switch (step) {
    case 1:
      content = (
        <PersonalInfo
          name={name}
          address={address}
          phone={phone}
          change={handleInforChange}
        />
      );
      break;
    case 2:
      content = (
        <LoanInfo
          money={amountOfMoney}
          reason={reason}
          change={handleInforChange}
        />
      );
      break;
    default:
      content = "";
      break;
  }
  let action;
  if (
    name === "" ||
    address === "" ||
    phone === "" ||
    amountOfMoney === "" ||
    reason === ""
  ) {
    action = (
      <button className="btn btn--green" onClick={processStep}>
        {step === 1 ? "Next" : "Previous"}
      </button>
    );
  } else {
    action = (
      <button className="btn btn--white" onClick={processStep}>
        Submit
      </button>
    );
  }
  return (
    <div className="rqform">
      <div className="flex">
        <div className="rqform_step">
          {stepsList.map(stepInfo => (
            <Step
              id={stepInfo.id}
              active={stepInfo.id === step}
              content={stepInfo.content}
              key={stepInfo.id}
              click={setStep}
            />
          ))}
        </div>
        <div className="rqform_content">{content}</div>
      </div>
      {action}
    </div>
  );
}

export default RequestForm;
