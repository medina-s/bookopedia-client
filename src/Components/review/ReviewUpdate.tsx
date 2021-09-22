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

type ReviewUpdateProps = {
  bookname: string;
  bookauthor: string;
  reviewtext: string;
  rating: string;
  reviewid: string;
  toggle: (val: boolean) => void;
  sessionToken: string | null;
  fetchAllReviews: () => void;
};

type ReviewUpdateState = {
  reviewtext: string;
  rating: string;
};

class ReviewUpdate extends React.Component<
  ReviewUpdateProps,
  ReviewUpdateState
> {
  constructor(props: ReviewUpdateProps) {
    super(props);
    this.state = {
      reviewtext: this.props.reviewtext,
      rating: this.props.rating,
    };
    this.editReview = this.editReview.bind(this);
  }

  editReview(e: React.FormEvent) {
    e.preventDefault();
    fetch(`http://localhost:3000/review/edit/${this.props.reviewid}`, {
      method: "PUT",
      body: JSON.stringify({
        review: {
          booktitle: this.props.bookname,
          bookauthor: this.props.bookauthor,
          reviewtext: this.state.reviewtext,
          rating: this.state.rating,
        },
      }),
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        this.props.fetchAllReviews();
        this.props.toggle(false);
        alert("Review has been successfully updated!");
      });
  }

  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader>Edit Review</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.editReview}>
            <FormGroup check disabled>
              <Label htmlFor="review">Book Title</Label>
              <Input name="bookname" value={this.props.bookname} disabled />
            </FormGroup>
            <FormGroup check disabled>
              <Label htmlFor="review">Book Author</Label>
              <Input name="bookauthor" value={this.props.bookauthor} disabled />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="review">Review</Label>
              <Input
                type="textarea"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({
                    reviewtext: e.target.value,
                  })
                }
                name="reviewtext"
                value={this.state.reviewtext}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="rating">Rating</Label>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({
                    rating: e.target.value,
                  })
                }
                name="rating"
                value={this.state.rating}
              />
            </FormGroup>
            <Button type="submit">Update Review</Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default ReviewUpdate;
