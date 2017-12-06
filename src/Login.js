import React, { Component } from 'react'
import { saveData, getData } from './function/function';
import axios from 'axios';
import styled from 'styled-components';

const baseUrl = 'http://localhost:3352';

const CardStyle = styled.div`
background-color: #FFF;
box-sizing: border-box;
padding: 20px;
display: flex;
flex-wrap: wrap;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 300px;
box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19);

:hover {
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2), 0 2px 10px 0 rgba(0,0,0,0.19);
}

:active {
  box-shadow: none;
}

h1:first-child {
  width: 100%;
  text-align: center;
}
;
button[type="submit"] {
  width: 100%
}
`;

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: getData("username"),
      password: getData("password"),
      remember: getData("remember") === "true"
    }
    this.onStateChange = this.onStateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onStateChange(key, newValue) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState[key] = newValue;
      return newState;
    });
  };

  onSubmit(e) {
    //Do something
    e.preventDefault();
    //Do Ajax request
    const { username, password, remember } = this.state;
    axios.post(`${baseUrl}/login`, {
      username: username,
      password: password
    }, {
      header: {
        crossOrigin: true
      }
    }).then(() => {
      this.setState({
        username: '',
        password: ''
      });
      saveData("username", username);
      saveData("password", password);
      saveData("remember", String(remember));
    }).catch((e) => {
      console.log(e);
      alert("Login failed");
    })
    return false;
  }

  render() {
    const { username, password, remember } = this.state;
    return (
      <CardStyle>
        <h1>Sign in</h1>
        <form
          style={{maxWidth: '500px',aligment: 'center'}}
          onSubmit={this.onSubmit}
        >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter username"
              value={username}
              onChange={(e) => this.onStateChange("username", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => this.onStateChange("password", e.target.value)}
              required
            />
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                onChange={(e) => {
                  this.onStateChange("remember", e.target.checked)
                }}
                defaultChecked={remember}
              />
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </CardStyle>
    );
  }
}
