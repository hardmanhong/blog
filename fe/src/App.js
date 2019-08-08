import React, { Component } from "react";
import { HashRouter} from "react-router-dom";
import RouterRender from '@/components/RouterRender/RouterRender';
class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <HashRouter>
        <RouterRender/>
      </HashRouter>
    );
  }
}

export default App;
