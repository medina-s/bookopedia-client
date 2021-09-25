import React from "react";
import { Form, FormGroup, Label, Input, Table } from "reactstrap";
import ReviewIndex from "../review/ReviewIndex";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type BookInfoIndexState = {
  booknameinput: string;
  bookauthorinput: string;
  bookname: string;
  booksubtitle: string;
  bookauthor: string;
  bookdesc: string;
  bookimgurl: string;
  bookpublisher: string;
  bookpublishdate: string;
  toggle: boolean;
  allreviews: any[];
};

type BookInfoIndexProps = {
  sessionToken: string | null;
};

class BookInfoIndex extends React.Component<
  BookInfoIndexProps,
  BookInfoIndexState
> {
  constructor(props: BookInfoIndexProps) {
    super(props);
    this.state = {
      booknameinput: "",
      bookauthorinput: "",
      bookname: "",
      booksubtitle: "",
      bookauthor: "",
      bookdesc: "",
      bookimgurl: "",
      bookpublisher: "",
      bookpublishdate: "",
      toggle: false,
      allreviews: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchBooksAPI = this.fetchBooksAPI.bind(this);
    this.fetchReviewDB = this.fetchReviewDB.bind(this);
  }

  async fetchBooksAPI() {
    console.log("HANDLE fetchBooksAPi EVENT");

    await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${this.state.booknameinput}+inauthor:${this.state.bookauthorinput}&filter=partial`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          bookname: res.items[0].volumeInfo.title,
          booksubtitle: res.items[0].volumeInfo.subtitle,
          bookauthor: res.items[0].volumeInfo.authors[0],
          bookdesc: res.items[0].volumeInfo.description,
          bookimgurl: res.items[0].volumeInfo.imageLinks.thumbnail,
          bookpublisher: res.items[0].volumeInfo.publisher,
          bookpublishdate: res.items[0].volumeInfo.publishedDate,
          toggle: true,
        });
      })
      .then((res) => {
        fetch(
          `http://localhost:3000/review/all/${this.state.bookname}/${this.state.bookauthor}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("ALL DATA!");
            console.log(data);
            this.setState({
              allreviews: data,
            });
            console.log("ALL REVIEWS");
            console.log(this.state.allreviews);
          });
      })
      .catch((err) => {
        console.log("Exception Occurred");
        console.log(err);
        this.setState({
          bookname: "Book Not Found!",
          booksubtitle: "",
          bookauthor: "",
          bookdesc: "",
          bookimgurl: "",
          bookpublisher: "",
          bookpublishdate: "",
          toggle: true,
        });
      });
  }

  async fetchReviewDB() {
    console.log("HANDLE fetchDBReview EVENT");

    await fetch(
      `http://localhost:3000/review/all/${this.state.bookname}/${this.state.bookauthor}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("ALL DATA!");
        console.log(data);
        this.setState({
          allreviews: data,
        });
        console.log("ALL REVIEWS");
        console.log(this.state.allreviews);
      })
      .catch((err) => {
        console.log("Exception Occurred");
        console.log(err);
      });
    console.log("ALL REVIEWS");
    console.log(this.state.allreviews);
  }

  handleSubmit(e: React.FormEvent) {
    console.log("HANDLE SUBMIT EVENT");

    e.preventDefault();

    if (this.state.booknameinput === "" || this.state.bookauthorinput === "") {
      alert("Cannot submit empty form!");
    } else {
      this.fetchBooksAPI();
    }
  }

  render() {
    return (
      <div className="BookInfoIndex">
        <h1>Book Search</h1>
        <Box component='form' onSubmit={this.handleSubmit} sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}>
        <div>
            <TextField variant="filled" required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ booknameinput: e.target.value })
              }
              label="Book Name"
              value={this.state.booknameinput}
            />
            <TextField variant="filled" required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ bookauthorinput: e.target.value })
              }
              label="Book Author"
              value={this.state.bookauthorinput}
            />
            </div>
            <div>
          <Button variant="contained" type="submit">Search</Button>
          </div>
        </Box>
        {<img src={this.state.bookimgurl} alt="" />}
        <Table striped>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Book Subtitle</th>
              <th>Book Author</th>
              <th>Description</th>
              <th>Publisher</th>
              <th>Publishing Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.bookname}</td>
              <td>{this.state.booksubtitle}</td>
              <td>{this.state.bookauthor}</td>
              <td>{this.state.bookdesc}</td>
              <td>{this.state.bookpublisher}</td>
              <td>{this.state.bookpublishdate}</td>
            </tr>
          </tbody>
        </Table>

        <ReviewIndex
          allreviews={this.state.allreviews}
          toggle={this.state.toggle}
          sessionToken={this.props.sessionToken}
          bookname={this.state.bookname}
          bookauthor={this.state.bookauthor}
          fetchReviewsDB={this.fetchReviewDB}
        />
      </div>
    );
  }
}

export default BookInfoIndex;
