import React from "react";
import ReviewUpdate from "./ReviewUpdate";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import APIURL from '../../helpers/environment';


type MyReviewIndexState = {
  allreviews: any[];
  toggle: boolean;
  updatedreviewtext: string;
  updatedrating: string;
  indexstate: number
};

type MyReviewIndexProps = {
  sessionToken: string | null;
};

class MyReviewIndex extends React.Component<
  MyReviewIndexProps,
  MyReviewIndexState
> {
  constructor(props: MyReviewIndexProps) {
    super(props);
    this.state = {
      allreviews: [],
      toggle: false,
      updatedreviewtext: "",
      updatedrating: "",
      indexstate: 0
    };

    this.deleteReview = this.deleteReview.bind(this);
    this.fetchAllreviews = this.fetchAllreviews.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  async fetchAllreviews() {
    await fetch(`${APIURL}/review/u/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          allreviews: data,
        });
      })
      .catch((err) => {
        console.log("Exception Occurred");
        console.log(err);
      });
  }

  componentDidMount() {
    this.fetchAllreviews();
  }

  toggle(val: boolean, index: number) {
    this.setState({ toggle: val, indexstate: index });
  }

  async deleteReview(reviewid: string) {
    await fetch(`${APIURL}/review/delete/${reviewid}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((response) => response.json())
      .then((logData) => {
        console.log(logData);
        this.fetchAllreviews();
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
        My Reviews
        {protectedView ? (
          <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Book Title</TableCell>
            <TableCell>Book Author</TableCell>
            <TableCell>Review</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
              
        <TableBody>
                {this.state.allreviews.map((review, index) => {
                  return (
                    <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {review.booktitle}
              </TableCell>
              <TableCell>{review.bookauthor}</TableCell>
              <TableCell>{review.reviewtext}</TableCell>
              <TableCell>{review.rating}</TableCell>
                      
                      <TableCell>
                        <div>
                        <Button variant="outlined"
                          type="submit"
                          color="warning"
                          onClick={() => {
                            this.toggle(true, index);
                          }}
                        >
                          Edit Review
                        </Button>
                        {" "}
                        <Button variant="outlined"
                          type="submit"
                          color="error"
                          onClick={() => {
                            this.deleteReview(review.id);
                          }}
                        >
                          Delete Review
                        </Button>
                        </div>
                      </TableCell>
                      {this.state.toggle ? (
                        <ReviewUpdate
                          bookname={this.state.allreviews[this.state.indexstate].booktitle}
                          bookauthor={this.state.allreviews[this.state.indexstate].bookauthor}
                          reviewtext={this.state.allreviews[this.state.indexstate].reviewtext}
                          rating={this.state.allreviews[this.state.indexstate].rating}
                          reviewid={this.state.allreviews[this.state.indexstate].id}
                          toggle={this.toggle}
                          sessionToken={this.props.sessionToken}
                          fetchAllReviews={this.fetchAllreviews}
                        />
                      ) : (
                        <></>
                      )}
                    </TableRow>
                  );
                })}{" "}
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

export default MyReviewIndex;
