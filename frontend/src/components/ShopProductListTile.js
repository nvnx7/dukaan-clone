import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  ButtonGroup,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
} from "@material-ui/core";

import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";

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
  count: {
    paddingTop: "4px",
  },
}));

export default function ShopProductListTile({
  id,
  title,
  description,
  price,
  stock,
  unit,
  category,
  imageSrc,
  count,
  onChangeCount,
}) {
  const classes = useStyles();

  const handleClick = (count) => {
    if (count < 0) count = 0;
    onChangeCount(
      {
        id,
        title,
        description,
        price,
        stock,
        unit,
        category,
        imageSrc,
        count,
      },
      count
    );
  };

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
            {`Rs. ${price}/${unit}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        {count > 0 ? (
          <ButtonGroup variant="outlined" color="primary">
            <IconButton size="small" onClick={() => handleClick(count - 1)}>
              <RemoveRoundedIcon />
            </IconButton>
            <Typography className={classes.count} align="center">
              {count || 0}
            </Typography>
            <IconButton size="small" onClick={() => handleClick(count + 1)}>
              <AddRoundedIcon />
            </IconButton>
          </ButtonGroup>
        ) : (
          <Button
            variant="text"
            color="primary"
            startIcon={<AddRoundedIcon />}
            onClick={() => handleClick(count + 1)}
          >
            Add To Bag
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
