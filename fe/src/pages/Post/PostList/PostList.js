import React, { Component } from "react";
import {
  Radio,
  Row,
  Col,
  Button,
  Menu,
  Icon,
  Dropdown,
  Modal,
  message
} from "antd";
import ListAddButton from "@/components/ListAddButton";
import "./PostList.scss";
import PostItem from "./components/PostItem";
import { spliceUrlParams } from "@/utils";
import postApis from "@/api/post";
class PostList extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    activeStatus: "all",
    cateStatus: "menu",
    list: []
  };
  componentDidMount() {
    this.getPostList();
  }
  goToEdit(id) {
    this.props.history.push({
      pathname: "/post/edit",
      search: spliceUrlParams({ id })
    });
  }
  getPostList() {
    postApis.getPostList().then(res => {
      this.setState({
        list: res.data.list
      });
    });
  }
  handleMenuClick() {}
  handleCateClick(cateStatus) {
    this.setState({
      cateStatus
    });
  }
  handleDeletePost(id, index) {
    const that = this;
    Modal.confirm({
      title: "确定删除该文章吗？",
      content: "删除后可在垃圾桶找回",
      onOk() {
        postApis.deletePost(id).then(res => {
          that.state.list.splice(index, 1);
          that.setState(
            {
              list: that.state.list
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
    const { list } = this.state;
    return (
      <div className="post-list">
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
        <div className="fragment">
          <p className="date">本月</p>
          {list.map((item, index) => (
            <PostItem
              key={item._id}
              title={item.title}
              onEdit={() => {
                this.goToEdit(item._id);
              }}
              onDelete={() => {
                this.handleDeletePost(item._id, index);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PostList;
