import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GridList, GridListTile, ListSubheader } from "@material-ui/core";

import EditableProductListTile from "./EditableProductListTile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    // width: 500,
    height: 550,
    // border: "solid 2px black",
  },
}));

export default function EditableProductList({ productsData, onItemClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList
        className={classes.gridList}
        fullWidth
        cellHeight={164}
        cols={3}
        spacing={8}
      >
        <GridListTile item key="Subheader" cols={3} style={{ height: "auto" }}>
          <ListSubheader component="div">{`${productsData.length} PRODUCTS`}</ListSubheader>
        </GridListTile>

        {productsData.map((product) => (
          <EditableProductListTile
            id={product.id}
            title={product.title}
            description={product.description}
            imageSrc={product.imageSrc}
            price={product.price}
            stock={product.stock}
            unit={product.unit}
            category={product.category}
            onClick={onItemClick}
          />
        ))}
      </GridList>
    </div>
  );
}
