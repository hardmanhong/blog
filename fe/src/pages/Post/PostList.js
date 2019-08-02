import React, { Component } from "react";
import { Radio, Row, Col, Button, Menu, Icon, Dropdown } from "antd";
import ListAddButton from "../../components/ListAddButton";
class PostList extends Component {
  handleMenuClick() {}
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
    const RadioButtonRender = buttons =>
      buttons.map(button => {
        return (
          <Radio.Button key={button.value} value={button.value}>
            {button.text}
          </Radio.Button>
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
    return (
      <div className="post-list">
        <Row>
          <Col span={10}>
            <Radio.Group defaultValue="all">
              {RadioButtonRender(buttons)}
            </Radio.Group>
          </Col>
          <Col span={14}>
            <Row type="flex" justify="end" align="middle">
              {/* <Dropdown  overlay={menu}>
                <Button>
                  排序 <Icon type="down" />
                </Button>
              </Dropdown> */}
              <Col>
                <Button type="link" icon="appstore" />
                <Button type="link" icon="menu" />
              </Col>
              <Col offset={2}>
                <ListAddButton text="新文章" onClick={() => {}} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PostList;
