import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import "./ProjectItem.scss";
class ProjectItem extends PureComponent {
  render() {
    return (
      <div className="component-project-item">
        <div className="cover">
          <img src="http://127.0.0.1:9999/public/images/vehikl.png" alt="" />
        </div>
        <div className="info">
          <div className="title ellipsis2">
            testetestesetestststetestesetestststeseteststste
          </div>
          <div className="operation">
            <p className="date">2019-09-09</p>
            <div className="action">
              <Icon className="icon" type="edit" />
              <Icon className="icon" type="delete" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {};

export default ProjectItem;
