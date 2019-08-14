import React, { PureComponent } from "react";
import "./NotFound.scss";
class NotFound extends PureComponent {
  render() {
    return (
      <div className="component-404">
        <div className="text-error">
          <div className="center-text-box">
            <h1>Error ...</h1>
          </div>
        </div>

        <div className="container">
          <div className="center-numb-box">
            <div className="four_one" />
          </div>
        </div>

        <div className="container">
          <div className="center-numb-box_zero">
            <div className="zero">
              <div className="face" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="center-numb-box">
            <div className="four_two" />
          </div>
        </div>

        <div className="text-page-not-found">
          <div className="center-text-box">
            <h1>Page Not Found !!!</h1>
          </div>
        </div>
      </div>
    );
  }
}

NotFound.propTypes = {};

export default NotFound;
