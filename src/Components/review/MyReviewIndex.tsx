import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
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

  fetchAllreviews() {
    fetch(`http://localhost:3000/review/u/all`, {
      method: "GET",
      //body: JSON.stringify({user:{email: this.state.email, password: this.state.password}}),
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
      });
  }

  componentDidMount() {
    this.fetchAllreviews();
  }

  toggle(val: boolean) {
    this.setState({ toggle: val });
  }

  deleteReview(reviewid: string) {
    fetch(`http://localhost:3000/review/delete/${reviewid}`, {
      method: "DELETE",
      //body: JSON.stringify({user:{email: this.state.email, password: this.state.password}}),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((response) => response.json())
      .then((logData) => {
        console.log(logData);
      this.fetchAllreviews();
      alert(logData.message);});
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
            {this.state.allreviews.map((review) => {
              return (
                <tr>
                  <td>
                    <li>
                      {review.booktitle} -- {review.bookauthor} --{" "}
                      {review.reviewtext} -- {review.rating}
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
                    </li>
                  </td>
                </tr>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default MyReviewIndex;
