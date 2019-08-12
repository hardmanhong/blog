import React, { Component } from "react";
import {
  Row,
  Col,
  Menu,
  Icon,
  Modal,
  message,
  Skeleton,
  Pagination
} from "antd";
import ListAddButton from "@/components/ListAddButton/ListAddButton";
import "./PostList.scss";
import PostItem from "./components/PostItem";
import postApis from "@/api/post";
class PostList extends Component {
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
    this.getPostList();
  }
  handlePageChange(page, pageSize) {
    console.log(page, pageSize);
    this.pageParams.pageNumber = page;
    this.getPostList();
  }
  goToEdit(id, title) {
    this.props.historyPush({
      pathname: "/post/edit",
      search: { id, title }
    });
  }
  getPostList() {
    this.setState({
      loading: true
    });
    postApis.getPostList(this.pageParams).then(res => {
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
        postApis.deletePost(id).then(res => {
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
        value: "all"
      },
      {
        text: "草稿",
        value: "drafts"
      },
      {
        text: "已发布",
        value: "published"
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
          >
            {button.text}
          </span>
        );
      });
    const menu = (
      <Menu
        onClick={() => {
          this.handleMenuClick();
        }}
      >
        <Menu.Item key="1">日期</Menu.Item>
        <Menu.Item key="2">热度</Menu.Item>
      </Menu>
    );
    const { count, list, loading } = this.state;
    console.log("PostList render");

    return (
      <div className="post-list page">
        <Row className="header">
          <Col span={10}>{StatusButtonRender(buttons)}</Col>
          <Col span={14}>
            <Row type="flex" justify="end" align="middle">
              {/* <Dropdown  overlay={menu}>
                <Button>
                  排序 <Icon type="down" />
                </Button>
              </Dropdown> */}
              <Col>
                <Icon
                  className={`icon ${
                    this.state.cateStatus === "appstore" ? "active" : ""
                  }`}
                  type="appstore"
                  onClick={() => {
                    this.handleCateClick("appstore");
                  }}
                />
                <Icon
                  className={`icon ${
                    this.state.cateStatus === "menu" ? "active" : ""
                  }`}
                  type="menu"
                  onClick={() => {
                    this.handleCateClick("menu");
                  }}
                />
              </Col>
              <Col offset={2}>
                <ListAddButton
                  text="新文章"
                  onClick={() => {
                    this.goToEdit();
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="fragment main-content">
          {/* 骨架 文章列表 */}
          <Skeleton
            loading={loading}
            active
            title={{ width: 100 }}
            paragraph={{ rows: 5, width: "100%" }}
          >
            {Object.keys(list).map(date => (
              <React.Fragment key={date}>
                <p className="date">{date}</p>
                {list[date].map((item, index) => (
                  <PostItem
                    key={item._id}
                    title={item.title}
                    tag={item.tag}
                    createdDate={item.createdDate}
                    onEdit={() => {
                      this.goToEdit(item._id, item.title);
                    }}
                    onDelete={() => {
                      this.handleDeletePost(item._id, index, date);
                    }}
                  />
                ))}
              </React.Fragment>
            ))}
          </Skeleton>
        </div>
        <Pagination
          className="pagination"
          size="small"
          total={count}
          onChange={(page, pageSize) => {
            this.handlePageChange(page, pageSize);
          }}
        />
      </div>
    );
  }
}

export default PostList;
