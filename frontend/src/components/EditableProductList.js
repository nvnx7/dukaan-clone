import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Box } from "@material-ui/core";

import EditableProductListTile from "./EditableProductListTile";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  itemList: {
    height: "100%",
    maxHeight: "550px",
    overflowY: "scroll",
  },
}));

export default function EditableProductList({ productsData, onItemClick }) {
  const classes = useStyles();
  const outOfStockProductCount = productsData.reduce((total, product) => {
    if (product.stock === 0) return total + 1;
    return total;
  }, 0);
  return (
    <Box
      className={classes.root}
      p={1}
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      justifyContent="flex-start"
    >
      <Box p={1}>
        <Typography>{`${productsData.length} Products / ${outOfStockProductCount} Out Of Stock`}</Typography>
      </Box>

      {productsData.length > 0 ? (
        <Grid
          className={classes.itemList}
          container
          spacing={2}
          alignItems="flex-start"
          justify="flex-start"
        >
          {productsData.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" color="textSecondary" align="center">
          No Products Found. Add One Now!
        </Typography>
      )}
    </Box>
  );
}
