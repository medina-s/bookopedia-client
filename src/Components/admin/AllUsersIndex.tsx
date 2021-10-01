import React from "react";

import Button from '@mui/material/Button'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import APIURL from '../../helpers/environment'

type AllUsersIndexProps = {
  sessionToken: string | null;
};

type AllUsersIndexState = {
  allusers: any[];
};

class AllUsersIndex extends React.Component<
  AllUsersIndexProps,
  AllUsersIndexState
> {
  constructor(props: AllUsersIndexProps) {
    super(props);
    this.state = {
      allusers: [],
    };

    this.deleteUser = this.deleteUser.bind(this);
    this.fetchAllUsers = this.fetchAllUsers.bind(this);
  }

  async fetchAllUsers() {
    await fetch(`${APIURL}/auth/u/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          allusers: data,
        });
      })
      .catch((err) => {
        console.log("Exception Occurred");
        console.log(err);
      });
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  async deleteUser(userid: string) {
    await fetch(`${APIURL}/auth/delete/u/${userid}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((response) => response.json())
      .then((logData) => {
        console.log(logData);
        this.fetchAllUsers();
        alert(logData.message);
      })
      .catch((err) => {
        console.log("Exception Occurred");
        console.log(err);
      });
  }

  render() {
    let protectedView;
    if (this.props.sessionToken === localStorage.getItem("sessionToken")) {
      protectedView = true;
    } else {
      protectedView = false;
    }
    return (
      <div>
        {protectedView ? (
          <>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell></TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>

              
                {this.state.allusers.map((user) => {
                  return (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
               
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell><Button variant='outlined'
                          type="submit"
                          color="error"
                          onClick={() => {
                            this.deleteUser(user.id);
                          }}
                        >Delete User
                        </Button>
                        </TableCell>
                    
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table></TableContainer>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default AllUsersIndex;
