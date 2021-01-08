import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Box,
  IconButton,
  ButtonGroup,
  Button,
} from "@material-ui/core";

import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";

import { getTotalPriceFromBag } from "../utils/customerUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  itemList: {
    height: "100%",
    maxHeight: "500px",
    overflowY: "scroll",
  },
  item: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  img: {
    maxWidth: 128,
    maxHeight: 128,
  },
}));

export default function ShoppingBag({ bag, onChangeCount, onPlaceOrder }) {
  const classes = useStyles();

  const handleClick = (product, count) => {
    if (count < 0) count = 0;
    onChangeCount(product, count);
  };

  return (
    <Box
      className={classes.root}
      p={1}
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      justifyContent="flex-start"
    >
      <Box p={1} display="flex" justifyContent="space-between">
        <Typography variant="h6">{`${bag.length} Items`}</Typography>
        <Typography variant="h6">{`Rs. ${getTotalPriceFromBag(
          bag
        )} Total`}</Typography>
      </Box>

      {bag.length > 0 ? (
        <Grid
          className={classes.itemList}
          container
          spacing={2}
          alignItems="flex-start"
          justify="flex-start"
        >
          {bag.map((product) => (
            <Grid className={classes.item} item container xs={12}>
              <Grid item xs={4}>
                <img
                  className={classes.img}
                  alt="product"
                  src={product.imageSrc}
                />
              </Grid>
              <Grid item xs={8} container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom noWrap>
                      {product.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Qty. {product.count} - Rs. {product.price}/{product.unit}
                    </Typography>
                    <ButtonGroup variant="outlined" color="primary">
                      <IconButton
                        size="small"
                        onClick={() => handleClick(product, product.count - 1)}
                      >
                        <RemoveRoundedIcon />
                      </IconButton>
                      <Typography
                        className={classes.count}
                        style={{ marginTop: "4px" }}
                        align="center"
                      >
                        {product.count || 0}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleClick(product, product.count + 1)}
                      >
                        <AddRoundedIcon />
                      </IconButton>
                    </ButtonGroup>
                  </Grid>
                </Grid>
                <Grid item>
                  <IconButton
                    color="secondary"
                    onClick={() => handleClick(product, 0)}
                  >
                    <DeleteRoundedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" color="textSecondary" align="center">
          Bag is empty!
        </Typography>
      )}
    </Box>
  );
}
