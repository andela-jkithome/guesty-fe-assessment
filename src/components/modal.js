import React, { Component, Fragment } from 'react';
import { Modal, Table, Button, Icon, Message, Select } from 'semantic-ui-react';

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      order: 'name',
    };
  }

  changeOrder = (e, data) => {
    console.log('Change order called with:', data.value);
    this.setState({order: data.value})
  }

  render() {
    const {open, loading, repos, closeModal } = this.props;
    const { order } = this.state;
    const options = [
      { key: 'name', value: 'name', text: 'Name' },
      { key: 'forks', value: 'forks_count', text: 'Forks Count' }, 
      { key: 'watchers', value: 'watchers', text: 'watchers' } 
    ];

    return (
      <Fragment>
        {loading ?
          <Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
              <Message.Header>Just one second</Message.Header>
              We are fetching the repos for you.
            </Message.Content>
          </Message>:
          <Modal
            open={open}
            onClose={closeModal}
            size='small'
          >
            <Modal.Header>Repos</Modal.Header>
            <Modal.Content>
              <Select onChange={this.changeOrder} placeholder='Sort Table By..' options={options} />
               <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Url</Table.HeaderCell>
                    <Table.HeaderCell>Forks Count</Table.HeaderCell>
                    <Table.HeaderCell>Watchers Count</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {repos.sort((a,b) => {
                    if(order === 'name') {
                      let nameA = a.name.toUpperCase(); // ignore upper and lowercase
                      let nameB = b.name.toUpperCase(); // ignore upper and lowercase
                      if (nameA < nameB) {
                        return -1;
                      }
                      if (nameA > nameB) {
                        return 1;
                      }

                      // names must be equal
                      return 0;
                    } else if(order === 'forks_count') {
                      return a.forks_count - b.forks_count;
                    } else {
                      return a.watchers - b.watchers;
                    }
                  }).map(repo => {
                    const { name, description, url, forks_count, watchers } = repo;
                    return (
                      <Table.Row>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{description}</Table.Cell>
                        <Table.Cell>{url}</Table.Cell>
                        <Table.Cell>{forks_count}</Table.Cell>
                        <Table.Cell>{watchers}</Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={closeModal} inverted>
                <Icon name='checkmark' />
              </Button>
            </Modal.Actions>
          </Modal>
        }
      </Fragment>
    );
  }
}
