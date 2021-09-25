import React from "react";
import ReadingListItemUpdate from "./ReadingListItemUpdate";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'


type MyReadingListState = {
  allitems: any[];
  toggle: boolean;
  updatedstatus: string;
  indexstate: number
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
      indexstate: 0
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
        console.log(this.state.allitems)
        console.log(this.state.allitems[0].booktitle)

      })
      .catch((err) => {
        console.log("Exception Occurred");
        console.log(err);
      });
  }

  componentDidMount() {
    this.fetchAllItems();
  }

  toggle(val: boolean, index: number) {
    this.setState({ toggle: val,  indexstate: index});
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
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Book Title</TableCell>
            <TableCell>Book Author</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
              
        <TableBody>
                {this.state.allitems.map((item, index) => {
                  return (
                    <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                    
                    <TableCell component="th" scope="row">
                {item.booktitle}
              </TableCell>
              <TableCell>{item.bookauthor}</TableCell>
              <TableCell>{item.status}</TableCell>
              
                      <TableCell>
                        <div>
                        <Button
                        variant="outlined"
                          type="submit"
                          color="warning"
                          onClick={() => {
                            this.toggle(true, index);
                          }}
                        >
                          Edit Status
                        </Button>
                        {" "}
                        <Button
                        variant="outlined"
                          type="submit"
                          color="error"
                          onClick={() => {
                            this.deleteItem(item.id);
                          }}
                        >
                          Delete Book
                        </Button>
                        </div>
                      </TableCell>
                      {this.state.toggle ? (
                        
                        <ReadingListItemUpdate
                          bookname={this.state.allitems[this.state.indexstate].booktitle}
                          bookauthor={this.state.allitems[this.state.indexstate].bookauthor}
                          status={this.state.allitems[this.state.indexstate].status}
                          itemid={this.state.allitems[this.state.indexstate].id}
                          toggle={this.toggle}
                          sessionToken={this.props.sessionToken}
                          fetchAllItems={this.fetchAllItems}
                        />
                      ) : (
                        <></>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default MyReadingListIndex;
