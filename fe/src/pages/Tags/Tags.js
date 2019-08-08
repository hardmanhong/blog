import React, { Component } from "react";
import { Row, message } from "antd";
import ListAddButton from "@/components/ListAddButton/ListAddButton";
import UTag from "./components/UTag";
import TagEditModal from "@/components/TagEditModal/TagEditModal";
import "./Tags.scss";
import apis from "@/api/tag";
class Tags extends Component {
  state = {
    visibleNewTag: false,
    list: [],
    activeIndex: ""
  };
  componentDidMount() {
    this.getTagList();
  }
  getTagList() {
    apis.getTagList().then(res => {
      this.setState({
        list: res.data.list
      });
    });
  }
  handleOpenTagModal() {
    this.setState({
      visibleNewTag: true
    });
  }
  handleTagModalOk() {
    this.setState({
      visibleNewTag: false
    });
    message.success('新增成功');
    this.getTagList();
  }
  handleTagModalCancel() {
    this.setState({
      visibleNewTag: false
    });
  }
  handleOpenTagEdit(index) {
    this.setState({
      activeIndex: index
    });
  }
  handleCloseTagEdit() {
    this.setState({
      activeIndex: ""
    });
  }
  handleEditTag(index, { id, name, color }) {
    apis
      .editTag({
        id,
        name,
        color
      })
      .then(res => {
        this.state.list[index].name = name;
        this.state.list[index].color = color;
        this.setState(
          {
            list: this.state.list
          },
          () => {
            message.success("编辑成功");
            this.handleCloseTagEdit();
          }
        );
      });
  }
  handleDeleteTag(index, id) {
    apis.deleteTag(id).then(res => {
      this.state.list.splice(index, 1);
      this.setState(
        {
          list: this.state.list
        },
        () => {
          message.success("删除成功");
        }
      );
    });
  }
  render() {
    const { list, visibleNewTag, activeIndex } = this.state;
    return (
      <div className="pages-tags page">
        <Row className="header" type="flex" justify="end">
          <ListAddButton
            text="新标签"
            onClick={() => {
              this.handleOpenTagModal();
            }}
          />
          <TagEditModal
            title="添加标签"
            visible={visibleNewTag}
            onOk={() => {
              this.handleTagModalOk();
            }}
            onCancel={() => {
              this.handleTagModalCancel();
            }}
          />
        </Row>
        {list.map((item, index) => (
          <UTag
            key={item._id}
            color={item.color}
            value={item.name}
            isEdit={activeIndex === index}
            onOpenTag={() => {
              this.handleOpenTagEdit(index);
            }}
            onCloseTag={() => {
              this.handleCloseTagEdit();
            }}
            onEdit={(name, color) => {
              this.handleEditTag(index, { id: item._id, name, color });
            }}
            onDelete={() => {
              this.handleDeleteTag(index, item._id);
            }}
          />
        ))}
      </div>
    );
  }
}

export default Tags;
