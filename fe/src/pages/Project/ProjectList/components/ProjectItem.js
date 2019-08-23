import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import "./ProjectItem.scss";
import { upload } from "@/filters";

class ProjectItem extends PureComponent {
  handleEdit=()=>{
    const {id,title,onEdit} = this.props;
    onEdit(id,title);
  }
  handleDelete=()=>{
    const {id,index,onDelete} = this.props;
    onDelete(id,index);
  }
  render() {
    const { title, date, cover } = this.props;
    return (
      <div className="component-project-item">
        <div className="cover">
          <img src={upload(cover)} alt="" />
        </div>
        <div className="info">
          <p className="title ellipsis">{title}</p>
          <div className="operation">
            <p className="date">{date}</p>
            <div className="action">
              <Icon className="icon" type="edit" onClick={this.handleEdit}/>
              <Icon className="icon" type="delete" onClick={this.handleDelete}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  title: PropTypes.string,
  cover: PropTypes.string,
  date: PropTypes.string,
  onEdit:PropTypes.func,
  onDelete:PropTypes.func,
};

export default ProjectItem;
