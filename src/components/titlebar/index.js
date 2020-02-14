import React from "react";
import styles from "./index.module.css";

const Titlebar = props => {
  const { title } = props;
  const { title_bar } = styles;
  return (
    <div className={title_bar}>
      <h2>{title}</h2>
    </div>
  );
};

export default Titlebar;
