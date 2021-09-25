import React from "react";
import { Button, Table } from "reactstrap";
import ReadingListItemUpdate from "./ReadingListItemUpdate";

type MyReadingListState = {
  allitems: any[];
  toggle: boolean;
  updatedstatus: string;
};

type MyReadingListProps = {
  sessionToken: string | null;
};

class MyReadingListIndex extends React.Component<
  MyReadingListProps,
  MyReadingListState
> {
  constructor(props: MyReadingListProps) {
    super(props);
    this.state = {
      allitems: [],
      toggle: false,
      updatedstatus: "",
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.fetchAllItems = this.fetchAllItems.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  async fetchAllItems() {
    await fetch(`http://localhost:3000/readinglist/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          allitems: data,
        });
      })
      .catch((err) => {
        console.log("Exception Occurred");
        console.log(err);
      });
  }

  componentDidMount() {
    this.fetchAllItems();
  }

  toggle(val: boolean) {
    this.setState({ toggle: val });
  }

  async deleteItem(itemid: string) {
    await fetch(`http://localhost:3000/readinglist/delete/${itemid}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((response) => response.json())
      .then((logData) => {
        console.log(logData);
        this.fetchAllItems();
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
        My Reading List
        {protectedView ? (
          <>
            <Table striped>
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Book Author</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.allitems.map((item) => {
                  return (
                    <tr>
                      <td>{item.booktitle}</td>
                      <td>{item.bookauthor}</td>
                      <td>{item.status}</td>
                      <td>
                        <Button
                          type="submit"
                          color="warning"
                          onClick={() => {
                            this.toggle(true);
                          }}
                        >
                          Edit Status
                        </Button>
                        <Button
                          type="submit"
                          color="danger"
                          onClick={() => {
                            this.deleteItem(item.id);
                          }}
                        >
                          Delete Book
                        </Button>
                      </td>
                      {this.state.toggle ? (
                        <ReadingListItemUpdate
                          bookname={item.booktitle}
                          bookauthor={item.bookauthor}
                          status={item.status}
                          itemid={item.id}
                          toggle={this.toggle}
                          sessionToken={this.props.sessionToken}
                          fetchAllItems={this.fetchAllItems}
                        />
                      ) : (
                        <></>
                      )}
                    </tr>
                  );
                })}{" "}
              </tbody>
            </Table>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default MyReadingListIndex;
