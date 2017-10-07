import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './Loading.css';

class Loading extends Component {
  render() {
    return (
      <div id="loading">
        <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
      </div>
    );
  }
}

export default Loading;
