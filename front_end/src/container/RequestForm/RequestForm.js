import React from "react";
import "./RequestForm.scss";
import web3 from "web3";
import Step from "../../component/formStep/formStep";
import PersonalInfo from "../../component/form/personalInfo/personalInfo";
import LoanInfo from "../../component/form/loanInfo/loanInfo";
import contractInfo from "../../contractInfo";
import { database } from "../../firebase";
const stepsList = [
  { id: 1, content: "Personal Information" },
  { id: 2, content: "Loan" }
];
function RequestForm(props) {
  const [step, setStep] = React.useState(1);
  const [infor, setInfor] = React.useState({
    name: "",
    address: "",
    phone: "",
    amountOfMoney: "",
    reason: ""
  });
  const [loading, setLoading] = React.useState(false);
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
  const requestFund = async () => {
    setLoading(true);
    await contractInfo.methods
      .loanRequest(web3.utils.toWei(infor.amountOfMoney))
      .send({ from: props.account })
      .once("receipt", async result => {
        console.log(result);
        await database.ref("requests/" + props.account).set(infor);
        setLoading(false);
      });
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
      <button className="btn btn--white" onClick={requestFund}>
        {loading ? "Sending..." : "Submit"}
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
