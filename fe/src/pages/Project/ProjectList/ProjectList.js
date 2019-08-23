import React, { Component } from "react";
import { Row, Col, Modal, message, Skeleton, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import "./ProjectList.scss";
import ListAddButton from "@/components/ListAddButton/ListAddButton";
import ProjectItem from "./components/ProjectItem";
import api from "@/api/project";
class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.pageParams = {
      pageNumber: 1,
      pageSize: 12
    };
  }
  state = {
    loading: false,
    hasMore: true,
    activeStatus: "all",
    cateStatus: "menu",
    list: [],
    count: 0
  };
  componentDidMount() {
    this.getProjectList();
  }
  handleInfiniteOnLoad = () => {
    console.log("handleInfiniteOnLoad");
    this.pageParams.pageNumber++;
    this.getProjectList();
  };
  goToEdit = (id, title) => {
    this.props.historyPush({
      pathname: "/project/edit",
      search: { id, title }
    });
  };
  getProjectList() {
    this.setState({
      loading: true
    });
    api.getProjectList(this.pageParams).then(res => {
      let length = this.state.list.length;
      length += res.data.list.length;
      let hasMore = this.state.hasMore;
      const list = this.state.list;
      list.push(...res.data.list);
      if (length < res.data.count) {
        hasMore = true;
      } else {
        hasMore = false;
      }
      console.log("hasmore", hasMore);
      this.setState({
        count: res.data.count,
        list,
        loading: false,
        hasMore
      });
    });
  }
  handleDeletePost = (id, index, date) => {
    Modal.confirm({
      title: "确定删除该项目吗？",
      onOk: () => {
        api.deletePost(id).then(res => {
          let list = this.state.list;
          list.splice(index, 1);
          this.setState({ list }, () => {
            message.success("删除成功");
          });
        });
      }
    });
  };
  render() {
    const { list, loading, hasMore } = this.state;
    return (
      <div className="project-list page">
        <ListAddButton text="新项目" onClick={this.goToEdit} />
        <div className="main-content">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!loading && hasMore}
            useWindow={false}
          >
            {/* 骨架 文章列表 */}
            {/* <Skeleton
              loading={loading}
              active
              title={{ width: 100 }}
              paragraph={{ rows: 5, width: "100%" }}
            > */}
              <Row gutter={15} className="row">
                {list.map((item, index) => (
                  <Col span={6} key={item._id}>
                    <ProjectItem
                      id={item._id}
                      index={index}
                      title={item.title}
                      cover={item.cover}
                      date={item.createdDate}
                      onEdit={this.goToEdit}
                      onDelete={this.handleDeletePost}
                    />
                  </Col>
                ))}
                {loading && hasMore && (
                  <div className="demo-loading-container">
                    <Spin />
                  </div>
                )}
              </Row>
            {/* </Skeleton> */}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default ProjectList;
