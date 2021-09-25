import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

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
      <div className="Register">
        <h1>Register</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="firstname">First Name</Label>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ firstname: e.target.value })
              }
              name="firstname"
              value={this.state.firstname}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ lastname: e.target.value })
              }
              name="lastname"
              value={this.state.lastname}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ username: e.target.value })
              }
              name="username"
              value={this.state.username}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ email: e.target.value })
              }
              name="email"
              value={this.state.email}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ password: e.target.value })
              }
              name="password"
              value={this.state.password}
            />
          </FormGroup>
          <Button type="submit">Register</Button>
        </Form>
      </div>
    );
  }
}

export default Register;
