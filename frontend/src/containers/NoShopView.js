import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Container,
} from "@material-ui/core";

import AddRoundedIcon from "@material-ui/icons/AddRounded";
import StorefrontRoundedIcon from "@material-ui/icons/StorefrontRounded";

import AddShopForm from "../components/AddShopForm";

import {
  addShopFormDialogOpen,
  loading,
} from "../selectors/dashboardSelectors";
import { addShop, toggleAddShopFormDialog } from "../actions/dashboardActions";
import { shopDetail } from "../selectors/shopSelectors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    height: "100%",
  },
  icon: {
    fontSize: "126px",
  },
  fab: {
    margin: "32px",
  },
}));

function NoShopView({
  // prop
  user,

  // states
  loading,
  addShopFormDialogOpen,
  toggleAddShopFormDialog,
  addShop,
}) {
  const classes = useStyles();

  const handleAddShop = (shopDetail) => {
    addShop(user, shopDetail);
  };

  return (
    <Container className={classes.root}>
      <StorefrontRoundedIcon className={classes.icon} color="primary" />
      <Typography color="textSecondary" align="center">
        No Shop Found. Add One Now!
      </Typography>
      <Fab
        className={classes.fab}
        color="primary"
        variant="extended"
        onClick={toggleAddShopFormDialog}
      >
        <AddRoundedIcon />
        Add Shop
      </Fab>

      <Dialog
        open={addShopFormDialogOpen}
        onClose={toggleAddShopFormDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Add Product Details</DialogTitle>
        <DialogContent>
          <AddShopForm
            loading={loading}
            onSave={handleAddShop}
            onCancel={toggleAddShopFormDialog}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: loading(state),
    addShopFormDialogOpen: addShopFormDialogOpen(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAddShopFormDialog: () => dispatch(toggleAddShopFormDialog()),
    addShop: (user, shopDetail) => dispatch(addShop(user, shopDetail)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoShopView);
