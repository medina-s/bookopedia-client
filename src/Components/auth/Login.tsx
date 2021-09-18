import React from 'react';
import { MainpageState } from '../../Mainpage';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

type LoginProps = {
  updateToken(props: MainpageState): void
}

type LoginState = {
    email: string,
    password: string
}

class Login extends React.Component<LoginProps, LoginState>{
    constructor(props: LoginProps){
        super(props)
        this.state = {
            email: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e:React.FormEvent){
        console.log("HANDLE SUBMIT EVENT")
    
        e.preventDefault();
        fetch("http://localhost:3000/auth/login", {
                method: 'POST',
                body: JSON.stringify({user:{email: this.state.email, password: this.state.password}}),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(
                (response) => response.json()
            ).then ((data) => {
                this.props.updateToken({sessionToken: data.sessionToken, newToken: data.sessionToken})
            })
            
    }

  render()  {
    return (
      <div className="Login">
      <h1>Login</h1>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({email: e.target.value})} name="email" value={this.state.email}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({password: e.target.value})}name="password" value={this.state.password} />
                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
  </div>
  );
  }
  
  }

export default Login;
