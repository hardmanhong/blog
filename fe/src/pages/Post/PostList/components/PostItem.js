import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Row, Col, Icon } from "antd";
import moment from "moment";
import "./PostItem.scss";
class PostItem extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    createDate: PropTypes.number,
    tag: PropTypes.string,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
  };
  static defaultProps = {
    title: "",
    tag: "",
    onEdit() {},
    onDelete() {}
  };
  render() {
    const { title, createdDate, tag, onEdit, onDelete } = this.props;
    return (
      <Row className="component-post-item" type="flex" align="middle">
        <Col span={10} className="title">
          {title}
        </Col>
        <Col span={10} className="info">
          <Row type="flex">
            <Col>{moment(createdDate).format("YYYY/MM/DD")}</Col>
            <Col className="tag" offset={5}>
              {tag}
            </Col>
          </Row>
        </Col>
        <Col span={4}>
          <Row type="flex" justify="end">
            <Icon className="icon" type="edit" onClick={onEdit} />
            <Icon className="icon" type="delete" onClick={onDelete} />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default PostItem;
