import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const RedocLayout = (url, domNode) =>
  ReactDOM.render(<App url={url} />, domNode);

module.exports = RedocLayout;
