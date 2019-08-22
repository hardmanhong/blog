import React, { Component } from "react";
import {
  Row,
  Col,
  Menu,
  Icon,
  Modal,
  message,
  Skeleton,
  Pagination,
  Button
} from "antd";
import "./ProjectList.scss";
import PagePagination from "@/components/PagePagination/PagePagination";

import ProjectItem from "./components/ProjectItem";
import api from "@/api/project";
class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.pageParams = {
      pageNumber: 1,
      pageSize: 10
    };
  }
  state = {
    loading: false,
    activeStatus: "all",
    cateStatus: "menu",
    list: {},
    count: 0
  };
  componentDidMount() {
    this.getProjectList();
  }
  toggleStatus(value, status) {
    this.setState({
      activeStatus: value
    });
    this.pageParams.status = status;
    this.getProjectList();
  }
  handlePageChange(page, pageSize) {
    console.log(page, pageSize);
    this.pageParams.pageNumber = page;
    this.getProjectList();
  }
  goToEdit(id, title) {
    this.props.historyPush({
      pathname: "/post/edit",
      search: { id, title }
    });
  }
  getProjectList() {
    this.setState({
      loading: true
    });
    api.getProjectList(this.pageParams).then(res => {
      this.setState({
        count: res.data.count,
        list: res.data.list,
        loading: false
      });
    });
  }
  handleMenuClick() {}
  handleCateClick(cateStatus) {
    this.setState({
      cateStatus
    });
  }
  handleDeletePost(id, index, date) {
    const that = this;
    Modal.confirm({
      title: "确定删除该文章吗？",
      content: "删除后可在垃圾桶找回",
      onOk() {
        api.deletePost(id).then(res => {
          let list = that.state.list;
          list[date].splice(index, 1);
          if (!list[date].length) delete list[date];
          that.setState(
            {
              list
            },
            () => {
              message.success("删除成功");
            }
          );
        });
      }
    });
  }
  render() {
    const buttons = [
      {
        text: "全部",
        value: "all",
        status: null
      },
      {
        text: "草稿",
        value: "drafts",
        status: 1
      },
      {
        text: "已发布",
        value: "published",
        status: 2
      }
    ];
    const StatusButtonRender = buttons =>
      buttons.map(button => {
        return (
          <span
            className={`status ${
              this.state.activeStatus === button.value ? "active" : ""
            }`}
            key={button.value}
            onClick={() => {
              this.toggleStatus(button.value, button.status);
            }}
          >
            {button.text}
          </span>
        );
      });
    const { count, list, loading } = this.state;
    return (
      <div className="project-list page">
        <div className="main-content">
        <Button className='button' type="primary" icon="plus" />
          {/* 骨架 文章列表 */}
          <Skeleton
            loading={loading}
            active
            title={{ width: 100 }}
            paragraph={{ rows: 5, width: "100%" }}
          >
            {Object.keys(list).map(date => (
              <React.Fragment key={date}>
                <Row gutter={15}>
                  {list[date].map((item, index) => (
                    <Col span={6} key={item.id}>
                      <ProjectItem />
                    </Col>
                  ))}
                </Row>
              </React.Fragment>
            ))}
          </Skeleton>
        </div>
      </div>
    );
  }
}

export default ProjectList;
