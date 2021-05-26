import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import UsersList from './components/UsersList';
export default class App extends Component {
  state = {
    users: [],
    page: 0,
    isLoading: false,
    errorMsg: '',
  };
  componentDidMount() {
    this.loadUsers();
  }
  loadUsers = () => {
    this.setState({ isLoading: true });
    const { page } = this.state;
    axios
      .get(`https://randomuser.me/api/?pages=${page}&results=10`)
      .then((response) => {
        //this.setState({ users: response.data.results, errorMsg: '' });
        this.setState((prevState) => ({
          users: [...prevState.users, ...response.data.results],
          errorMsg: '',
        }));
      })
      .catch((error) => {
        this.setState({ errorMsg: 'Something went wrong!!!' });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) this.loadUsers();
  }

  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { users, isLoading, errorMsg } = this.state;

    return (
      <div className="main-section">
        <Header />
        {isLoading && <p className="loading">Loading............</p>}
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <UsersList users={users} />
        <div className="load-more">
          <button onClick={this.loadMore} className="btn-grad">
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      </div>
    );
  }
}
