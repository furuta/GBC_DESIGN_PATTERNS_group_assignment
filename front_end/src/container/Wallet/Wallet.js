import React, { useState, useEffect, useContext, useCallback } from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./Wallet.scss";
import { Web3Context } from "../../web3-context";
import web3 from "web3";
import contractInfo from "../../contractInfo";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: "10rem"
  }
}));

export default function Wallet() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [fundedPeopleList, setFundedPeopleList] = useState([]);
  const [borrowerWallet, setBorrowerWallet] = useState("");
  const web3Context = useContext(Web3Context);
  const initData = useCallback(async () => {
    console.log(web3Context.accounts[0]);
    if (web3Context.accounts[0]) {
      let fundedPeople = await contractInfo.methods
        .getFundedPeople(web3Context.accounts[0])
        .call();
      let updatedFundedPeopleList = [];
      for (let i = 0; i < fundedPeople.length; i++) {
        let fundedmoney = await contractInfo.methods
          .getLoanerValue(fundedPeople[i], web3Context.accounts[0])
          .call();
        if (fundedmoney > 0) {
          updatedFundedPeopleList.push({
            address: fundedPeople[i],
            price: fundedmoney
          });
        }
      }
      setFundedPeopleList(updatedFundedPeopleList);
      let borrowerValue = await contractInfo.methods.getLoannerWallet().call();
      setBorrowerWallet(borrowerValue);
    }
  }, [web3Context.accounts]);
  useEffect(() => {
    initData();
  }, [initData]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const payBack = async (address, value) => {
    await contractInfo.methods
      .payBack(address)
      .send({ from: web3Context.accounts[0], price: value })
      .once("receipt", async result => {
        initData();
      });
  };
  const withDrawBorrower = async () => {
    await contractInfo.methods
      .withDrawLoaners()
      .send({ from: web3Context.accounts[0] });
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="DEBT" {...a11yProps(0)} />
          <Tab label="LOAN" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="debt">
            <div className="fundedwallet">
              <span>
                Funded Value: {web3.utils.fromWei(borrowerWallet, "ether")}{" "}
                ether
              </span>
              <button
                className="btn btn--green btn--wallet"
                onClick={withDrawBorrower}
              >
                Claim
              </button>
            </div>
            <p>DEBT LIST</p>
            {fundedPeopleList.map(fundedPerson => (
              <div class="fundedperson">
                <span>
                  {fundedPerson.address} gave {fundedPerson.price} Ether
                </span>
                <button className="btn btn--white" onClick={payBack}>
                  Pay
                </button>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
