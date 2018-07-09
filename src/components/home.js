import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button, Grid, Card, Image, Icon, Message } from 'semantic-ui-react'
import { fetchUser } from '../actions/user';
import { fetchRepos } from '../actions/repos';
import Modal from './modal';

export class Home extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      modalOpen: false
    };
  }

  handleChange = (e, data) => {
    this.setState({username: data.value})
  }

  searchUser = (e, data) => {
    const { username } = this.state;
    const { fetchUser } = this.props;
    let url = `https://api.github.com/users/${username}`;
    fetchUser(url);
    
  }

  openModal = () => {
    const { username } = this.state;
    this.setState({modalOpen: true });
    const { fetchRepos } = this.props;
    let url = `https://api.github.com/users/${username}/repos`;
    fetchRepos(url);

  }

  closeModal = () => {
    this.setState({modalOpen: false});
  }

  render() {
    const { modalOpen } = this.state;
    const { user: { fetching: fetchingUser, user: githubUser, error: userError }, repos: { fetching: loading, repos, error: reposError }} = this.props;
    const { 
      name, 
      company,
      email,
      followers,
      updated_at,
      avatar_url,
      public_repos
    } = githubUser;

    return (
      <Fragment>
        <Grid centered columns={3}>
          <Grid.Row centered columns={3}>
            <Input icon='search' placeholder='Search for user...' onChange={this.handleChange}/>
          </Grid.Row>
          <Grid.Row centered columns={3}>
            <Button onClick={this.searchUser}>Search</Button>
          </Grid.Row>
        </Grid>
        { fetchingUser &&
          <Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
              <Message.Header>Just one second</Message.Header>
              We are fetching that user for you.
            </Message.Content>
          </Message>
        }
        {!!Object.keys(githubUser).length &&
          <Grid centered columns={3}>
            <Grid.Row centered columns={3}>
              <Card>
                <Image src={avatar_url} />
                <Card.Content>
                  <Card.Header>{name}</Card.Header>
                  <Card.Meta>
                    <span>company: {company}</span>
                  </Card.Meta>
                  <Card.Meta>
                    <span>Email: {email}</span>
                  </Card.Meta>
                  <Card.Meta>
                    <span className='date'>Updated: {updated_at}</span>
                  </Card.Meta>
                  <Card.Description>Repos: <Button primary onClick={this.openModal}>See {public_repos} repos</Button></Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    {followers} Followers
                  </a>
                </Card.Content>
              </Card>
            </Grid.Row>
          </Grid>
        }
        <Modal 
          open={modalOpen}
          loading={loading}
          repos={repos}
          closeModal={this.closeModal}
        />
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
