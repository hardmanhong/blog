import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Icon, Input, Button, Checkbox, Col } from "antd";
import "./Login.scss";
import api from "@/api/user";

class Login extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        api.login({ username, password }).then(res => {
          window.sessionStorage.setItem('token',res.data.token || '');
          window.sessionStorage.setItem('username',res.data.username || '');
          this.props.history.replace('/');
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="component-login">
        <div className="login-card">
          <h2>Hong's Blog Admin</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入用户名!" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码!" }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(
                <Checkbox>
                  <span style={{ color: "#fff" }}>记住我</span>
                </Checkbox>
              )}
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Col>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {};

export default Form.create({ name: "normal_login" })(Login);
