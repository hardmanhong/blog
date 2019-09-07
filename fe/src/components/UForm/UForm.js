import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button } from "antd";
import moment from "moment";
import style from "./UForm.module.scss";
const picker = {
  TimePicker: true,
  PickerWrapper: true
};

const renderFormItem = ({ formData, item, getFieldDecorator }) => {
  const { label, key, required, component, options = {}, rules, render } = item;
  return render ? (
    render(formData[key])
  ) : (
    <Form.Item key={key} label={label}>
      {getFieldDecorator(key, {
        ...options,
        initialValue: formData[key]
          ? picker[component.type.name]
            ? moment(formData[key])
            : formData[key]
          : null,
        rules: rules || [{ required, message: `${label}不能为空` }]
      })(component || <Input />)}
    </Form.Item>
  );
};
class UForm extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit, formItems } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const moments = {};
        for (let key in values) {
          let value = values[key];
          if (value.constructor.name === "Moment") {
            const moment = formItems.find(item=> item.key === key)
            const type = moment.type;
            value = value.format(type);
            moments[key] = value;
          }
        }
        onSubmit({...values,...moments});
      }
    });
  };

  handleReset = () => {
    const { form, formItems, onReset } = this.props;
    form.resetFields();
    // 清空
    // formItems.forEach(item => {
    //   form.setFieldsValue({
    //     [item.key]: null
    //   });
    // });
    onReset();
  };
  render() {
    const {
      formData,
      formItems,
      formItemLayout,
      form: { getFieldDecorator }
    } = this.props;
    console.log("UForm render");
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {formItems.map(item =>
          renderFormItem({ formData, item, getFieldDecorator })
        )}
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button className={style.clear} onClick={this.handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

UForm.propTypes = {
  formData: PropTypes.object,
  formItems: PropTypes.array.isRequired,
  formItemLayout: PropTypes.object,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func
};
UForm.defaultProps = {
  formItemLayout: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 }
    }
  }
};
export default Form.create()(UForm);
