import React from 'react';
import PropTypes from 'prop-types';
import { RedocStandalone } from 'redoc';
import theme from './theme';
import './static/main.css';

const App = ({ url }) => (
  <RedocStandalone
    specUrl={url}
    options={{
      theme,
    }}
  />
);

App.defaultProps = {
  url: 'http://localhost:5000/swagger/',
};

App.propTypes = {
  url: PropTypes.string,
};

export default App;
