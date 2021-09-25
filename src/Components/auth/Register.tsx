import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


type RegisterProps = {
  updateToken: (newToken: string, role: string, firstname: string) => void;
};

type RegisterState = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
};

class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      username: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e: React.FormEvent) {
    console.log("HANDLE SUBMIT EVENT");

    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.firstname === "" ||
      this.state.lastname === "" ||
      this.state.username === ""
    ) {
      alert("All fields are required!");
    } else {
      e.preventDefault();
      await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        body: JSON.stringify({
          user: {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            role: "general",
          },
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
          alert(data.message);
        })
        .catch((err) => {
          console.log("Exception Occurred");
          console.log(err);
        });
    }
  }

  render() {
    return (
      
        
        <Box component='form' noValidate onSubmit={this.handleSubmit} sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}>
        <div><h1>Register</h1>
          </div>
            <div>
            <TextField variant="filled" required 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ firstname: e.target.value })
              }
              label="firstname"
              value={this.state.firstname}
            />
            <TextField variant="filled" required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ lastname: e.target.value })
              }
              label="lastname"
              value={this.state.lastname}
            />
            </div>
            <div>
            <TextField variant="filled" required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ username: e.target.value })
              }
              label="username"
              value={this.state.username}
            />
            <TextField variant="filled" required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ email: e.target.value })
              }
              label="email"
              value={this.state.email}
            />
            </div>
            <div>
            <TextField variant="filled" required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ password: e.target.value })
              }
              label="password"
              value={this.state.password}
            />
            </div>
            <div>
          <Button variant="contained" type="submit">Register</Button>
          </div>
        </Box>
    );
  }
}

export default Register;
