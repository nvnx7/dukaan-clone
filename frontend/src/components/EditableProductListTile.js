import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
} from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  actions: {
    display: "flex",
    alignItems: "flexEnd",
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
    <Card>
      <CardActionArea>
        <CardMedia className={classes.media} image={imageSrc} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            noWrap
          >
            {`Rs. ${price}/${unit} - ${stock} Available`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Button
          variant="text"
          color="primary"
          startIcon={<EditRoundedIcon />}
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
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
