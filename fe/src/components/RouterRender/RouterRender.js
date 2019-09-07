import React, { PureComponent } from "react";
import { Switch } from "react-router-dom";
import PropTypes from 'prop-types';
class RouterRender extends PureComponent {
  static propTypes = {
    routes: PropTypes.array
  };
  render() {
    const {routes} = this.props;
    return (
      <Switch>{routes}</Switch>

    )
  }
}

export default RouterRender;
