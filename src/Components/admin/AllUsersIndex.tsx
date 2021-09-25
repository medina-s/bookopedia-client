import React from "react";
import { Button, Table } from "reactstrap";

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
    await fetch(`http://localhost:3000/auth/u/all`, {
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
    await fetch(`http://localhost:3000/auth/delete/u/${userid}`, {
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
            <Table striped>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.allusers.map((user) => {
                  return (
                    <tr>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>
                        <Button
                          type="submit"
                          color="danger"
                          onClick={() => {
                            this.deleteUser(user.id);
                          }}
                        >
                          Delete User
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>{" "}
            </Table>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default AllUsersIndex;
