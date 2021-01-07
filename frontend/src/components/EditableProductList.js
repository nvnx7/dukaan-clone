import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import EditableProductListTile from "./EditableProductListTile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  gridList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    // width: 500,
    height: 550,
  },
}));

export default function EditableProductList({ productsData, onItemClick }) {
  const classes = useStyles();
  const outOfStockProductCount = productsData.reduce((total, product) => {
    if (product.stock === 0) return total + 1;
    return total;
  }, 0);
  return (
    <div className={classes.root}>
      {productsData.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>{`${productsData.length} Products / ${outOfStockProductCount} Out Of Stock`}</Typography>
          </Grid>
          {productsData.map((product) => (
            <EditableProductListTile
              id={product.id}
              key={product.image}
              title={product.title}
              description={product.description}
              imageSrc={product.image}
              price={product.price}
              stock={product.stock}
              unit={product.unit}
              category={product.category}
              onClick={onItemClick}
            />
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" color="textSecondary" align="center">
          No Products Found. Add One Now!
        </Typography>
      )}
    </div>
  );
}
