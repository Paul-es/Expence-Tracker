import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import "../styles/bill.css";
import category from "./category.json";
import months from "./months.json";
import { useHistory } from "react-router-dom";

import {
  Button,
  Modal,
  Backdrop,
  Paper,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Fade,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormControl,
} from "@material-ui/core";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  BiPlus,
  BiPaperPlane,
  BiXCircle,
  BiEdit,
  BiFilterAlt,
} from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

function Bill() {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(true);
  const [openBudget, setOpenBudget] = useState(false);

  const [filterClose, setFilterClose] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [localBills, setLocalbills] = useState([]);
  const [bills, setBills] = useState({
    title: "",
    category: "",
    date: "",
    dateFull: new Date(),
    amount: "",
  });
  const [monthBudget, setMonthBudget] = useState({
    month: "",
    amount: "",
  });

  const history = useHistory();

  const track = () => {
    if (hide === true) {
      for (var i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        localBills.push(JSON.parse(localStorage.getItem(key)));
        setHide(false);
      }
    }
  };
  track();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    localStorage.setItem(bills.title, JSON.stringify(bills));
  };
  const handleCategory = (event) => {
    setBills({ ...bills, category: event.target.value });
  };
  const handleDateChange = (event) => {
    setBills({
      ...bills,
      dateFull: format(event, "yyyy-MM-dd"),
      date: format(event, "MM"),
    });
  };

  const handleTitle = (event) => {
    setBills({ ...bills, title: event.target.value });
  };
  const handleAmount = (event) => {
    setBills({ ...bills, amount: event.target.value });
  };
  const deleteBill = (del) => {
    localStorage.removeItem(del);
    window.location.reload();
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleBudgetOpen = () => {
    setOpenBudget(true);
  };
  const handleCloseBudget = () => {
    setOpenBudget(false);
  };
  const handleMonth = (event) => {
    setMonthBudget({ ...monthBudget, month: event.target.value });
  };
  const handleMonthAmount = (event) => {
    setMonthBudget({ ...monthBudget, amount: event.target.value });
  };
  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    setOpenBudget(false);
    var list = [];
    var s = 0;
    for (var i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const data = JSON.parse(localStorage.getItem(key));
      if (data.date === monthBudget.month) {
        s = s + parseInt(data.amount);
        if (s <= parseInt(monthBudget.amount)) {
          list.push(data);
        }
      }
    }
    setLocalbills(list);
    setFilterClose(true);
  };
  const handleFilter = (data) => {
    setAnchorEl(null);
    setFilterClose(true);
    var list = [];
    for (var i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (JSON.parse(localStorage.getItem(key)).category === data) {
        list.push(JSON.parse(localStorage.getItem(key)));
      }
    }
    setLocalbills(list);
  };
  const handleClear = () => {
    setHide(true);
    setFilterClose(false);
    setLocalbills([]);
    track();
  };

  return (
    <div className="App">
      {/*-------------------App Bar------------------------------*/}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Bill Tracker
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            style={{ marginRight: "1.5rem" }}
            onClick={() => history.push("/chart")}
          >
            Track
          </Button>

          <Button
            color="inherit"
            variant="outlined"
            style={{ marginRight: "1.5rem" }}
            onClick={handleBudgetOpen}
          >
            Set Budget
          </Button>
          {filterClose ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClear}
              style={{ paddingRight: "12px", marginRight: "1.5rem" }}
              startIcon={<BiXCircle />}
            >
              Clear
            </Button>
          ) : null}
          {/*-------------------Category DropDown--------------------------*/}
          <Button
            startIcon={<BiFilterAlt />}
            variant="contained"
            onClick={handleClick}
          >
            Filter
          </Button>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {category.map((option) => (
              <MenuItem onClick={() => handleFilter(option.value)}>
                {option.value}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      {/*-------------------Monthly Budget Modal----------------------------*/}
      <Modal
        className="modal"
        open={openBudget}
        onClose={handleCloseBudget}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openBudget}>
          <div className="budget-model">
            <h2 style={{ paddingBottom: "15px" }} id="transition-modal-title">
              Set Monthly Budget !!!
            </h2>
            <form onSubmit={handleBudgetSubmit}>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    required
                    label="Select"
                    value={monthBudget.month}
                    onChange={handleMonth}
                    helperText="Select the Month"
                    variant="outlined"
                  >
                    {months.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Amount
                    </InputLabel>

                    <OutlinedInput
                      id="outlined-adornment-amount"
                      type="number"
                      required
                      onChange={handleMonthAmount}
                      startAdornment={
                        <InputAdornment position="start">₹</InputAdornment>
                      }
                      labelWidth={60}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disableElevation
                    style={{ marginTop: "20px" }}
                  >
                    <BiPaperPlane style={{ fontSize: "30px" }} />
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
      {/*-------------------Add bill btn------------------------------*/}
      <Button
        className="add-btn"
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        <BiPlus />
      </Button>
      {/*-------------------Add Bill model------------------------------*/}
      <Modal
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Paper variant="outlined" square elevation={3}>
          <div className="paper">
            <h2 style={{ paddingBottom: "5%" }} id="spring-modal-title">
              Budget !!!
            </h2>
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid style={{ paddingLeft: "30px" }} item xs={6}>
                  <TextField
                    value={bills.title}
                    onChange={handleTitle}
                    required
                    label="Title"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-select-currency"
                    select
                    label="Category"
                    style={{ width: "65%" }}
                    value={bills.category}
                    onChange={handleCategory}
                    variant="outlined"
                  >
                    {category.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid style={{ paddingLeft: "30px" }} item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Due Date"
                      style={{ marginTop: "30px" }}
                      format="MM/dd/yyyy"
                      onChange={handleDateChange}
                      value={bills.dateFull}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid style={{ marginTop: "30px" }} item xs={12}>
                  <TextField
                    required
                    type="number"
                    label="Amount"
                    variant="outlined"
                    value={bills.amount}
                    onChange={handleAmount}
                  />
                </Grid>
                <Grid className="submit-bill" item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disableElevation
                  >
                    <BiPaperPlane style={{ fontSize: "30px" }} />
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Paper>
      </Modal>
      {/*-------------------Cards------------------------------*/}
      <div className="Cards">
        {localBills.map((item) => (
          <div style={{ display: "inline-block" }}>
            <Card
              style={{
                width: "20rem",
                marginInlineEnd: "20px",
                marginTop: "20px",
              }}
            >
              <CardContent>
                <Typography component="h2" variant="h5">
                  {item.title}
                </Typography>
                <Typography
                  style={{ marginTop: 12, marginBottom: 12 }}
                  color="textSecondary"
                >
                  {item.category}
                </Typography>
                <Typography style={{ color: "red" }}>
                  Due: {item.amount} Rs on {item.dateFull}
                </Typography>
              </CardContent>
              <CardActions style={{ backgroundColor: "#e6e6e6" }}>
                <Button style={{ fontSize: "25px" }}>
                  <BiEdit />
                </Button>
                <Button
                  onClick={() => deleteBill(item.title)}
                  style={{ right: -165, fontSize: "25px" }}
                >
                  <AiOutlineDelete />
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bill;
