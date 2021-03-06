import React, { Component } from "react";
import { Input, Row, Col, Tag, Icon, Button, Skeleton, message } from "antd";
import MarkdownEditor from "@/components/MarkdownEditor/MarkdownEditor";
import TagEditModal from "@/components/TagEditModal/TagEditModal";
import PageEditNavbar from "@/components/PageEditNavbar/PageEditNavbar";
import "./PostEdit.scss";
import apisTag from "@/api/tag";
import apisPost from "@/api/post";

class PostEdit extends Component {
  constructor(props) {
    super(props);
    this.titleInput = null;
  }
  state = {
    loading: false,
    visibleNewTag: false,
    tagList: [],
    checkTag: {},
    post: {
      title: "",
      tag: [],
      markdown: "",
      html: ""
    }
  };
  async getPageData() {
    await this.getTagList();
    if (this.props.urlParams.id) {
      this.getPostItem();
    }
  }
  getTagList() {
    return apisTag.getTagList().then(res => {
      this.setState({
        tagList: res.data.list
      });
    });
  }
  getPostItem() {
    this.setState({
      loading: true
    });
    apisPost.getPostItem(this.props.urlParams.id).then(res => {
      const checkTag = this.state.checkTag;
      res.data.tag.forEach(tag => {
        checkTag[tag._id] = true;
      });
      this.setState({
        post: res.data,
        checkTag,
        loading: false
      });
    });
  }
  componentDidMount() {
    this.getPageData();
  }
  createNewTag() {
    this.setState({
      visibleNewTag: true
    });
  }
  handleTagModalOk(id) {
    const checkTag = this.state.checkTag;
    checkTag[id] = true;
    this.setState({
      visibleNewTag: false,
      checkTag
    });
    this.getTagList();
  }
  handleTagModalCancel() {
    this.setState({
      visibleNewTag: false
    });
  }
  handleEditorChange = ({ text, html }) => {
    const post = this.state.post;
    post.markdown = text;
    post.html = html;
    this.setState({
      post
    });
  };
  handleCheckTag(id) {
    const checkTag = this.state.checkTag;
    checkTag[id] ? delete checkTag[id] : (checkTag[id] = true);
    this.setState({
      checkTag
    });
  }
  handleChangeInput(e) {
    const post = this.state.post;
    post.title = e.target.value;
    this.setState({
      post
    });
  }
  savePost(status, message) {
    const post = this.state.post;
    post.id = this.props.urlParams.id;
    post.tag = Object.keys(this.state.checkTag);
    post.status = status;
    apisPost.editPost(post).then(res => {
      message.success(message);
      this.props.historyPush({
        pathname: "/post"
      });
    });
  }
  handleSaveDraft() {
    this.savePost(1, "已保存草稿");
  }
  handlePublish() {
    this.savePost(2, "发布成功");
  }
  render() {
    console.log("PostEdit render");
    const { tagList, checkTag, post, loading } = this.state;
    const renderTag = tagList => {
      return tagList.map(tag => (
        <Tag.CheckableTag
          key={tag._id}
          checked={checkTag[tag._id]}
          onChange={() => {
            this.handleCheckTag(tag._id);
          }}
          className="tag"
        >
          {tag.name}
        </Tag.CheckableTag>
      ));
    };
    return (
      <div className="post-edit page">
        <PageEditNavbar>
          <Button
            style={{ marginRight: "8px" }}
            onClick={() => {
              this.handleSaveDraft();
            }}
          >
            存草稿
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.handlePublish();
            }}
          >
            发布
          </Button>
        </PageEditNavbar>
        {/* <Row type="flex" justify="end">
          <Col>
            
          </Col>
        </Row> */}
        <div className="main-content">
          <Row>
            <Col span={12}>
              <Skeleton loading={loading} active paragraph={false}>
                <Input
                  value={post.title}
                  placeholder="标题"
                  ref={element => {
                    if (element) this.titleInput = element;
                  }}
                  onChange={e => {
                    e.persist();
                    this.handleChangeInput(e);
                  }}
                />
              </Skeleton>
            </Col>
          </Row>
          <Row className="tags" type="flex">
            <Skeleton loading={loading} active paragraph={false}>
              <Col>标签：</Col>
              <Col style={{ flex: 1 }}>
                {renderTag(tagList)}
                <Tag
                  onClick={() => {
                    this.createNewTag();
                  }}
                  className="tag"
                  style={{
                    background: "#fff",
                    borderStyle: "dashed",
                    marginBottom: "8px"
                  }}
                >
                  <Icon type="plus" /> 新标签
                </Tag>
                <TagEditModal
                  visible={this.state.visibleNewTag}
                  onOk={tagId => {
                    this.handleTagModalOk(tagId);
                  }}
                  onCancel={() => {
                    this.handleTagModalCancel();
                  }}
                />
              </Col>
            </Skeleton>
          </Row>
          <Row className="editor">
            {loading ? (
              <React.Fragment>
                <Col span={11}>
                  <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 12, width: "100%" }}
                  />
                </Col>
                <Col span={11} push={2}>
                  <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 12, width: "100%" }}
                  />
                </Col>
              </React.Fragment>
            ) : (
              <MarkdownEditor
                value={post.markdown}
                onChange={this.handleEditorChange}
              />
            )}
          </Row>
        </div>
      </div>
    );
  }
}

export default PostEdit;
