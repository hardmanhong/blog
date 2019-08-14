import React, { PureComponent } from "react";
import HelpPage from "@/components/HelpPage/HelpPage";
class NotFound extends PureComponent {
  backHome = () => {
    this.props.history.replace("/");
  };
  render() {
    return (
      <HelpPage
        title="404"
        content="抱歉，访问的页面消失在云里..."
        buttonText='回首页'
        onClick={this.backHome}
      />
    );
  }
}

NotFound.propTypes = {};

export default NotFound;
