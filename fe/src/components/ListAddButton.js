import React from "react";
import { Icon } from "antd";
import style from './ListAddButton.module.css';
const ListAddButton = ({ text, onClick }) => {
  return (
    <div
    className={style.button}
      onClick={() => {
        onClick();
      }}
    >
      <Icon type="plus" />
      <span className={style.text}>{text}</span>
    </div>
  );
};
export default ListAddButton;
