import React from "react";
import { Button, Table } from "reactstrap";
import ReviewUpdate from "./ReviewUpdate";

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
    await fetch(`http://localhost:3000/review/u/all`, {
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
    await fetch(`http://localhost:3000/review/delete/${reviewid}`, {
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
            <Table striped>
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Book Author</th>
                  <th>Review</th>
                  <th>Rating</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.allreviews.map((review, index) => {
                  return (
                    <tr key="index">
                      <td>{review.booktitle}</td>
                      <td>{review.bookauthor}</td>
                      <td>{review.reviewtext}</td>
                      <td>{review.rating}</td>
                      <td>
                        <Button
                          type="submit"
                          color="warning"
                          onClick={() => {
                            this.toggle(true, index);
                          }}
                        >
                          Edit Review
                        </Button>
                        <Button
                          type="submit"
                          color="danger"
                          onClick={() => {
                            this.deleteReview(review.id);
                          }}
                        >
                          Delete Review
                        </Button>
                      </td>{" "}
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

export default MyReviewIndex;
