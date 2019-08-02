import React, { PureComponent } from "react";
import propTypes from "prop-types";
import { Tooltip, Popconfirm,message, Button, Col, Input, Icon } from "antd";
import ColorPicker from "rc-color-picker";
import "./Utag.scss";
class UTag extends PureComponent {
  static propTypes = {
    closable: propTypes.bool,
    isEdit:propTypes.bool,
    color: propTypes.string,
    value: propTypes.string,
    onEdit:propTypes.func,
    onDelete:propTypes.func,
    onOpenTag:propTypes.func,
  };
  static defaultProps = {
    closable: true,
    isEdit:false,
    color: "#fafafa",
    value: "test",
    onEdit: ()=>{},
    onDelete: ()=>{},
    onOpenTag: ()=>{},
  };
  state = {
    color:this.props.color,
  };
  constructor(props){
    super(props);
    this.textInput = null;
  }
  handleEditTag() {
    this.props.onOpenTag();
  }
  changeHandler({ color }) {
    this.setState({
      color
    })
  }
  handleCheckEdit() {
    console.log(this.textInput.input.value)
    this.props.onEdit(this.textInput.input.value,this.state.color);
  }

  render() {
    const {color } = this.state;
    const {isEdit,value,onDelete,onCloseTag } = this.props;
    return (
      <div className="component-utag">
        {isEdit ? (
          <div className="edit">
            <Tooltip
              overlayClassName="confirm-tooltip-overlay"
              visible={isEdit}
              arrowPointAtCenter
              placement="bottom"
              title={
                <React.Fragment>
                  <Button
                    className="button close"
                    type="danger"
                    size="small"
                    onClick={() => {
                      onCloseTag();
                    }}
                  >
                    取消
                  </Button>
                  <Button
                    className="button check"
                    type="primary"
                    size="small"
                    onClick={() => {
                      this.handleCheckEdit();
                    }}
                  >
                    确定
                  </Button>
                </React.Fragment>
              }
              
            >
              <Input
                ref={element=>{if(element) {element.focus();this.textInput = element;}}}
                defaultValue={value}
                placeholder="标签"
                addonAfter={
                  <ColorPicker
                    title="新标签"
                    animation="slide-up"
                    color={color}
                    onChange={colors => {
                      this.changeHandler(colors);
                    }}
                  />
                }
              />
            </Tooltip>
          </div>
        ) : (
          <div className="tag" style={{ background: color }}>
            <span
              className="text"
              onDoubleClick={() => {
                this.handleEditTag();
              }}
            >
              {value}
            </span>
            <Popconfirm
              title="确定删除该标签吗？"
              onConfirm={()=>{onDelete()}}
              okText="删除"
              cancelText="等等"
            >
              <Icon type="close" className="icon" />
            </Popconfirm>
          </div>
        )}
      </div>
    );
  }
}

export default UTag;
