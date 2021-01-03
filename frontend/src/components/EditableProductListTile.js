import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "4px 4px",
    borderRadius: "4px",
    objectPosition: "center",
  },
  icon: {
    color: "rgb(255, 255, 255)",
  },
  tileBar: {
    backgroundColor: theme.palette.primary.main,
  },
  img: {
    width: "200px",
  },
}));

export default function EditableProductListTile({
  id,
  title,
  description,
  price,
  stock,
  unit,
  category,
  imageSrc,
  onClick,
}) {
  const classes = useStyles();

  return (
    <GridListTile className={classes.root} sm={4} key={id}>
      <img className={classes.img} src={imageSrc} alt={title} />
      <GridListTileBar
        className={classes.tileBar}
        title={title}
        subtitle={`Rs. ${price} / ${stock} Available`}
        actionIcon={
          <IconButton
            className={classes.icon}
            onClick={() =>
              onClick({
                id,
                title,
                description,
                price,
                stock,
                unit,
                category,
                imageSrc,
              })
            }
          >
            <EditRoundedIcon />
          </IconButton>
        }
      />
    </GridListTile>
  );
}
