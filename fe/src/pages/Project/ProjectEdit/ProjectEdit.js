import React, { Component } from "react";
import { Input, Row, Col, Icon, Button, Skeleton, message, Upload } from "antd";
import MarkdownEditor from "@/components/MarkdownEditor/MarkdownEditor";
import PageEditNavbar from "@/components/PageEditNavbar/PageEditNavbar";
import "./ProjectEdit.scss";
import api from "@/api/project";
import { upload } from "@/filters";
class ProjectEdit extends Component {
  constructor(props) {
    super(props);
    this.titleInput = null;
  }
  state = {
    loading: false,
    uploadLoading: false,
    project: {
      title: "",
      cover: "",
      markdown: "",
      html: ""
    }
  };
  async getPageData() {
    if (this.props.urlParams.id) {
      this.getPostItem();
    }
  }

  getPostItem() {
    this.setState({
      loading: true
    });
    api.getProjectItem(this.props.urlParams.id).then(res => {
      this.setState({
        project: res.data,
        loading: false
      });
    });
  }
  componentDidMount() {
    this.getPageData();
  }

  handleChangeInput(e) {
    const project = this.state.project;
    project.title = e.target.value;
    this.setState({
      project
    });
  }
  savePost(message) {
    const project = this.state.project;
    project.id = this.props.urlParams.id;
    api.editProject(project).then(res => {
      message.success(message);
      this.props.historyPush({
        pathname: "/project"
      });
    });
  }
  handleEditorChange = ({ text, html }) => {
    const project = this.state.project;
    project.markdown = text;
    project.html = html;
    this.setState({
      project
    });
  };
  handlePublish() {
    this.savePost("保存成功");
  }
  handleChange = ({ file }) => {
    if (file.status === "uploading") {
      this.setState({ uploadLoading: true });
      return;
    }
    if (file.status === "done") {
      if (file.response.code === 200) {
        console.log("response", file.response);
        const project = this.state.project;
        project.cover = file.response.data;
      } else {
        message.error(file.response.message || "上传失败");
      }
      const project = this.state.project;
      project.cover = file.response.data;
      this.setState({
        project,
        uploadLoading: false
      });
    }
    if (file.status === "error") {
      this.setState({
        uploadLoading: false
      });
    }
  };
  beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只能上传 JPG/PNG 格式的文件!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("文件大小超过2M");
    }
    return isJpgOrPng && isLt2M;
  }
  render() {
    console.log("ProjectEdit render");
    const { project, loading, uploadLoading } = this.state;
    return (
      <div className="project-edit page">
        <PageEditNavbar>
          <Button
            type="primary"
            onClick={() => {
              this.handlePublish();
            }}
          >
            保存
          </Button>
        </PageEditNavbar>
        <div className="main-content">
          <Row>
            <Col span={12}>
              <Skeleton loading={loading} active paragraph={false}>
                <Input
                  value={project.title}
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
          <Row className="upload">
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={process.env.REACT_APP_WEB_URL + "api/upload"}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {project.cover ? (
                <img
                  src={upload(project.cover)}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                <>
                  <Icon type={uploadLoading ? "loading" : "plus"} />
                  <div className="ant-upload-text">封面</div>
                </>
              )}
            </Upload>
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
                value={project.markdown}
                onChange={this.handleEditorChange}
              />
            )}
          </Row>
        </div>
      </div>
    );
  }
}

export default ProjectEdit;
