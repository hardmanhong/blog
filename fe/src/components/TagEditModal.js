import React, { PureComponent } from "react";
import propTypes from "prop-types";
import { Modal, Button, Input, Row, Col, message } from "antd";
import ColorPicker from "rc-color-picker";
import "rc-color-picker/assets/index.css";
import apis from "@/api/tag";
class TagEditModal extends PureComponent {
  static propTypes = {
    visible: propTypes.bool,
    title: propTypes.string,
    onOk: propTypes.func,
    onCancel: propTypes.func
  };
  static defaultProps = {
    visible: false,
    title: "新增标签",
    onOk: () => {},
    onCancel: () => {}
  };
  state = {
    loading: false,
    inputValue: "",
    color: "#2f54eb"
  };
  handleInputChange({ target }) {
    this.setState({
      inputValue: target.value
    });
  }
  handleOk() {
    apis
      .createTag({ name: this.state.inputValue, color: this.state.color })
      .then(res => {
        this.setState({
          inputValue: "",
          color: "#2f54eb"
        });
        this.props.onOk(res.data);
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
    const { inputValue } = this.state;
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
              value={inputValue}
              ref={element => {
                if (element) element.focus();
              }}
              onChange={e => {
                e.persist();
                this.handleInputChange(e);
              }}
              placeholder="标签"
              addonAfter={
                <ColorPicker
                  animation="slide-up"
                  color={this.state.color}
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
