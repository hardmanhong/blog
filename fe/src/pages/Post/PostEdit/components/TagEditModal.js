import React, { PureComponent } from "react";
import propTypes from "prop-types";
import { Modal, Button, Input, Row, Col } from "antd";
import ColorPicker from "rc-color-picker";
import "rc-color-picker/assets/index.css";
import apis from "@/api/Tag";
class TagEditModal extends PureComponent {
  static propTypes = {
    visible: propTypes.bool,
    title: propTypes.string,
    onOk: propTypes.func,
    onCancel: propTypes.func
  };
  static defaultProps = {
    visible: false,
    title: "编辑书签",
    onOk: () => {},
    onCancel: () => {}
  };
  state = {
    loading: false,
    inputValue: "",
    color: ""
  };
  constructor(props) {
    super(props);
  }
  handleInputChange({ target }) {
    this.setState({
      inputValue: target.value
    });
  }
  handleOk() {
    apis
      .addTag({ name: this.state.inputValue, color: this.state.color })
      .then(res => {
        this.props.onOk();
      });
  }
  handleCancel() {
    this.props.onCancel();
  }
  changeHandler({ color }) {
    this.setState({
      color
    });
  }
  render() {
    console.log(this.props);
    const { visible, title } = this.props;
    return (
      <Modal
        visible={visible}
        title={title}
        onOk={() => {
          this.handleOk();
        }}
        onCancel={() => {
          this.handleCancel();
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              this.handleCancel();
            }}
          >
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={this.state.loading}
            onClick={() => {
              this.handleOk();
            }}
          >
            确认
          </Button>
        ]}
      >
        <Row type="flex" align="middle">
          <Col span={10}>
            <Input
              ref="input"
              onChange={e => {
                e.persist();
                this.handleInputChange(e);
              }}
              placeholder="标签"
              addonAfter={
                <ColorPicker
                  title="新标签"
                  animation="slide-up"
                  color={"#2f54eb"}
                  onChange={colors => {
                    this.changeHandler(colors);
                  }}
                />
              }
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default TagEditModal;
