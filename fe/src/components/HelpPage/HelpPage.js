import React from "react";
import PropTypes from "prop-types";
import "./HelpPage.scss";
const HelpPage = ({ title, content, buttonText, onClick }) => {
  return (
    <div className="component-help-page">
      <main>
        <div className="content">
          <h1>{title}</h1>
          <p>{content}</p>
          <a onClick={onClick}>{buttonText}</a>
        </div>
      </main>
      <div className="cloud" />
      <div className="cloud bt" />
    </div>
  );
};
HelpPage.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func
};
export default HelpPage;
