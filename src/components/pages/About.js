import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const About = (props) => {
  return (
    <Fragment>
      <h1>About This App</h1>
      <p>App to search GitHub users</p>
      <p>Version 1.0.0</p>
    </Fragment>
  );
};

About.propTypes = {};

export default About;
