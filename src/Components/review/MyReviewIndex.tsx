import React from "react";
import { Button, Table } from "reactstrap";
import ReviewUpdate from "./ReviewUpdate";

type MyReviewIndexState = {
  allreviews: any[];
  toggle: boolean;
  updatedreviewtext: string;
  updatedrating: string;
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

  toggle(val: boolean) {
    this.setState({ toggle: val });
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
                {this.state.allreviews.map((review) => {
                  return (
                    <tr>
                      <td>{review.booktitle}</td>
                      <td>{review.bookauthor}</td>
                      <td>{review.reviewtext}</td>
                      <td>{review.rating}</td>
                      <td>
                        <Button
                          type="submit"
                          color="warning"
                          onClick={() => {
                            this.toggle(true);
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
                          bookname={review.booktitle}
                          bookauthor={review.bookauthor}
                          reviewtext={review.reviewtext}
                          rating={review.rating}
                          reviewid={review.id}
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
