import React from "react";
import classes from "./container.module.css";

type Props = {
  children?: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default Container;
