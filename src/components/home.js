import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button, Grid, Card, Image, Icon, Message } from 'semantic-ui-react'
import { fetchUser } from '../actions/user';
import { fetchRepos } from '../actions/repos';

export class Home extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
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

  render() {
    const { username } = this.state;
    // const { user: { fetching: fetchingUser, user: githubUser }} = this.props;
    const fetchingUser = false;
    const githubUser = {
  "login": "andela-jkithome",
  "id": 13940216,
  "node_id": "MDQ6VXNlcjEzOTQwMjE2",
  "avatar_url": "https://avatars0.githubusercontent.com/u/13940216?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/andela-jkithome",
  "html_url": "https://github.com/andela-jkithome",
  "followers_url": "https://api.github.com/users/andela-jkithome/followers",
  "following_url": "https://api.github.com/users/andela-jkithome/following{/other_user}",
  "gists_url": "https://api.github.com/users/andela-jkithome/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/andela-jkithome/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/andela-jkithome/subscriptions",
  "organizations_url": "https://api.github.com/users/andela-jkithome/orgs",
  "repos_url": "https://api.github.com/users/andela-jkithome/repos",
  "events_url": "https://api.github.com/users/andela-jkithome/events{/privacy}",
  "received_events_url": "https://api.github.com/users/andela-jkithome/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Jeremy Kithome",
  "company": "Andela",
  "blog": "",
  "location": "Nairobi",
  "email": null,
  "hireable": null,
  "bio": null,
  "public_repos": 35,
  "public_gists": 0,
  "followers": 39,
  "following": 15,
  "created_at": "2015-08-24T07:15:20Z",
  "updated_at": "2018-05-09T19:09:50Z"
}
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
        {Object.keys(githubUser).length &&
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
                  <Card.Description>Repos: <Button primary>See {public_repos} repos</Button></Card.Description>
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
