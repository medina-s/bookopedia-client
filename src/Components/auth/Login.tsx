import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type LoginProps = {
  updateToken: (newToken: string, role: string, firstname: string) => void;
};

type LoginState = {
  email: string;
  password: string;
};

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e: React.FormEvent) {
    console.log("HANDLE SUBMIT EVENT");

    if (this.state.email === "" || this.state.password === "") {
      alert("All fields are required!");
    } else {
      e.preventDefault();
      await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify({
          user: { email: this.state.email, password: this.state.password },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.props.updateToken(
            data.sessionToken,
            data.user.role,
            data.user.firstname
          );
          console.log(data);
        })
        .catch((err) => {
          console.log("Exception Occurred");
          console.log(err);
        });
    }
  }

  render() {
    return (
      
        <Box component='form' onSubmit={this.handleSubmit} sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}>
        <div>
        <h1>Login</h1>
        </div>
            <div>
            
            <TextField variant="filled" required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ email: e.target.value })
              }
              label="E-mail"
              value={this.state.email}
            />
            </div>
            <div>
            <TextField variant="filled" required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ password: e.target.value })
              }
              label="Password"
              value={this.state.password}
            />
            </div>
            <div>
          <Button variant="contained" type="submit">Login</Button>
          </div>
        </Box>
    );
  }
}

export default Login;
