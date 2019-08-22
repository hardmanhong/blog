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
          <h3 className="title ellipsis2">testeseteststste</h3>
          <div className='action'>
            <p className="date" >2019-09-09</p>
            <Icon className='icon' type="edit" />
            <Icon className='icon' type="delete" />
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {};

export default ProjectItem;
