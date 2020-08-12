import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      cutoffId: -1
    }
    this.fetchNewMessages = this.fetchNewMessages.bind(this);
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages() {
    fetch('http://localhost:8080/messages')
      .then(response => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          this.setState({
            messages: data,
            cutoffId: data[data.length - 1].id
          });
        }
      })
      .then(setInterval(this.fetchNewMessages, 5000));
  }

  fetchNewMessages() {
    fetch(`http://localhost:8080/messages?cutoffId=${this.state.cutoffId}`)
    .then(response => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        this.setState({
          messages: this.state.messages.concat(data),
          cutoffId: data[data.length - 1].id
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
