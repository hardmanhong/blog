import React, { PureComponent } from "react";
import HelpPage from "@/components/HelpPage/HelpPage";
class NotAuth extends PureComponent {
  back = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <HelpPage
        title="401"
        content="抱歉，访问的页面未授权..."
        buttonText="返回"
        onClick={this.back}
      />
    );
  }
}
export default NotAuth;
