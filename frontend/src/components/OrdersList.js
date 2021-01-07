import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  Typography,
  Grid,
  Button,
  Collapse,
  IconButton,
  Box,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { sortOrdersByStatusAndDate } from "../utils/shopUtils";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    height: "100%",
    overflow: "hidden",
  },
  tableContainer: {
    overflowY: "scroll",
    maxHeight: "550px",
  },
  table: {
    minWidth: 650,
  },
  head: {
    backgroundColor: theme.palette.primary.main,
  },
  headCell: {
    color: theme.palette.common.white,
  },
}));

const status = ["NONE", "PENDING", "ACCEPTED", "SHIPPED", "DELIVERED"];

export default function OrdersList({ orders, loading, onOrderAction }) {
  const classes = useStyles();

  const pendingOrdersCount = orders.reduce((total, order) => {
    if (order.status === 1) return total + 1;
    else return total;
  }, 0);

  sortOrdersByStatusAndDate(orders);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>{`${orders.length} ORDERS / ${pendingOrdersCount} PENDING`}</Typography>
        </Grid>
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell className={classes.headCell} align="center">
                  {""}
                </TableCell>
                <TableCell className={classes.headCell} align="center">
                  ID
                </TableCell>
                <TableCell className={classes.headCell} align="center">
                  Order Date
                </TableCell>
                <TableCell className={classes.headCell} align="center">
                  Product
                </TableCell>
                <TableCell className={classes.headCell} align="center">
                  Quantity
                </TableCell>
                <TableCell className={classes.headCell} align="center">
                  Status
                </TableCell>
                <TableCell className={classes.headCell} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  loading={loading}
                  onOrderAction={onOrderAction}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}

function OrderRow({ order, loading, onOrderAction }) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const buttonLabels = ["NONE", "ACCEPT", "SHIP", "DELIVER", "DELIVERED"];
  const handleActionBtnClick = () => {
    if (order.status === 4) {
      console.log("Error! Order already set to delivered!");
      return;
    }
    const updateOrder = Object.assign({}, order);
    updateOrder.status = updateOrder.status + 1;
    onOrderAction(updateOrder);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.id}
        </TableCell>
        <TableCell align="right">
          {new Date(order.date_ordered).toLocaleDateString()}
        </TableCell>
        <TableCell align="right">{order.product.title}</TableCell>
        <TableCell align="right">{order.quantity}</TableCell>
        <TableCell align="right">{status[order.status]}</TableCell>
        <TableCell align="right">
          <Button
            variant="outlined"
            onClick={handleActionBtnClick}
            disabled={order.status === 4 || loading}
          >
            {buttonLabels[order.status]}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Grid fullWidth container xs={12}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" component="span">
                    Order Date -&nbsp;
                  </Typography>
                  <Typography variant="subtitle2" component="span">
                    {new Date(order.date_ordered).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" align="right" component="span">
                    Total -&nbsp;
                  </Typography>
                  <Typography variant="subtitle2" component="span">
                    Rs. {order.product.price * order.quantity}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2">Customer Details</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" component="span">
                    Name -&nbsp;
                  </Typography>
                  <Typography variant="subtitle2" component="span">
                    {order.customer["first_name"]} {order.customer["last_name"]}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" component="span">
                    Phone -&nbsp;
                  </Typography>
                  <Typography variant="subtitle2" component="span">
                    {order.customer.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" component="span">
                    Delivery Address -&nbsp;
                  </Typography>
                  <Typography variant="subtitle2" component="span">
                    {order["delivery_address"]}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
