import React from "react";
import { Typography, Tab } from "@material-ui/core";
import { makeStyles, styled, withStyles } from "@material-ui/core/styles";

const styles = {
  icon: {
    verticalAlign: "top",
    marginRight: "2px",
  },
};

export default function StyledTab({ label, icon }) {
  const styledIcon = React.createElement(icon, { style: styles.icon });
  return (
    <Tab
      label={
        <div>
          {styledIcon}
          <Typography component="span" variant="subtitle2">
            {label}
          </Typography>
        </div>
      }
    />
  );
}
