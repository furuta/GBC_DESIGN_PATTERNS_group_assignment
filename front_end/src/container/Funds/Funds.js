import React, { useState, useEffect } from "react";
import Fund from "../../component/Fund/Fund";
import "./Funds.scss";
import { database } from "../../firebase";
import contractInfo from "../../contractInfo";
function Funds() {
  const [requestsList, setRequestsList] = useState([]);
  useEffect(() => {
    database.ref("requests").on(
      "value",
      async snapshot => {
        const data = snapshot.val();
        const fetchedRequests = [];
        for (let key in data) {
          let requestedValue = await contractInfo.methods
            .getRequestedValue(key)
            .call();
          let fundedValue = await contractInfo.methods
            .getFundedValue(key)
            .call();
          let statusRequested = await contractInfo.methods
            .getStatusRequested(key)
            .call();
          if (statusRequested === true) {
            fetchedRequests.push({
              ...data[key],
              user: key,
              value: requestedValue,
              fundedValue: fundedValue
            });
          }
        }
        setRequestsList(fetchedRequests);
      },
      err => console.log(err.code)
    );
  }, []);

  return (
    <div className="funds">
      {requestsList.map(request => (
        <Fund
          name={request.name}
          reason={request.reason}
          value={request.value}
          user={request.user}
          fundedValue={request.fundedValue}
          key={request.user}
        />
      ))}
    </div>
  );
}

export default Funds;
