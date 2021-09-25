import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import ReviewIndex from "../review/ReviewIndex";

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
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="bookname">Book Name</Label>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ booknameinput: e.target.value })
              }
              name="bookname"
              value={this.state.booknameinput}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="bookauthor">Book Author</Label>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ bookauthorinput: e.target.value })
              }
              name="bookauthor"
              value={this.state.bookauthorinput}
            />
          </FormGroup>
          <Button type="submit">Search</Button>
        </Form>
        {<img src={this.state.bookimgurl} alt="" />}
        {[
          this.state.bookname,
          this.state.booksubtitle,
          this.state.bookauthor,
          this.state.bookdesc,
        ]}
        {[this.state.bookpublisher, this.state.bookpublishdate]}

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
