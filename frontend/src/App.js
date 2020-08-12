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
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
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

  renderMessage(message) {
    return (
      <li key={message.id} className="message">
        <div className="author">{message.author || 'anonymous'}</div>
        <div className="text">{message.text}</div>
        <div className="timestamp">{new Date(message.created).toGMTString()}</div>
      </li>
    );
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  sendMessage() {
    fetch('http://localhost:8080/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "text": this.state.message })
    }).then(() => this.setState({ message: '' }));
  }

  render() {
    return (
      <div className="App">
        <div className="chat-window">
          <div>
            <ul className="message-list">
              {this.state.messages.map(this.renderMessage)}
            </ul>
          </div>
          <div>
            <input className="message-input" type="text" value={this.state.message} onChange={this.handleChange} />
            <button onClick={this.sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
