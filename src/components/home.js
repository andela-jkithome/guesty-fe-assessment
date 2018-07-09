import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../actions/user';
import { fetchRepos } from '../actions/repos';

export class Home extends Component {

  render() {

    return (
      <Fragment>
        Testing application!
      </Fragment>
    );
  }
}

function mapStateToProps({ user, repos }) {
  return {
    user,
    repos,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchUser,
      fetchRepos,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
