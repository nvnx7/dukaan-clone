import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Box } from "@material-ui/core";

import ShopProductListTile from "./ShopProductListTile";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  itemList: {
    height: "100%",
    maxHeight: "550px",
    overflowY: "scroll",
  },
}));

export default function ShopProductList({ productsData, onChangeCount }) {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      fullWidth
      p={1}
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      justifyContent="flex-start"
    >
      <Box p={1}>
        <Typography>{`${productsData.length} Products`}</Typography>
      </Box>

      {productsData.length > 0 ? (
        <Grid
          className={classes.itemList}
          container
          fullWidth
          spacing={2}
          alignItems="flex-start"
          justify="flex-start"
        >
          {productsData.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShopProductListTile
                id={product.id}
                key={product.image}
                title={product.title}
                description={product.description}
                imageSrc={product.image}
                price={product.price}
                stock={product.stock}
                unit={product.unit}
                category={product.category}
                count={product.count}
                onChangeCount={onChangeCount}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" color="textSecondary" align="center">
          Shop is empty!
        </Typography>
      )}
    </Box>
  );
}
