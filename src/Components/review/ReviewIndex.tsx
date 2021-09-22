import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

type ReviewIndexProps = {
  allreviews: any[];
  toggle: boolean;
  sessionToken: string | null;
  bookname: string;
  bookauthor: string;
};

type ReviewIndexState = {
  id: string;
  booktitle: string;
  bookauthor: string;
  reviewtext: string;
  rating: string;
};

class ReviewIndex extends React.Component<ReviewIndexProps, ReviewIndexState> {
  constructor(props: ReviewIndexProps) {
    super(props);
    this.state = {
      id: "",
      booktitle: "",
      bookauthor: "",
      reviewtext: "",
      rating: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch(`http://localhost:3000/review/create`, {
      method: "POST",
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
        alert("Review has been successfully created!");
      });
  }

  render() {
    let protectedView;
    if (
      this.props.sessionToken === localStorage.getItem("sessionToken") &&
      this.props.toggle === true
    ) {
      protectedView = true;
    } else {
      protectedView = false;
    }

    return (
      <div className="ReviewIndex">
        {protectedView ? (
          <>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor="review">Review</Label>
                <Input
                  type="textarea"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ reviewtext: e.target.value })
                  }
                  name="reviewtext"
                  value={this.state.reviewtext}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="rating">Rating</Label>
                {/* <Dropdown isOpen={} toggle={onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ rating: e.target.value })}>
                  <DropdownToggle caret>Dropdown</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem>Some Action</DropdownItem>
                    <DropdownItem text>Dropdown Item Text</DropdownItem>
                    <DropdownItem disabled>Action (disabled)</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Foo Action</DropdownItem>
                    <DropdownItem>Bar Action</DropdownItem>
                    <DropdownItem>Quo Action</DropdownItem>
                  </DropdownMenu>
                </Dropdown> */}
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ rating: e.target.value })
                  }
                  name="rating"
                  value={this.state.rating}
                />
              </FormGroup>
              <Button type="submit">Add Review</Button>
            </Form>

            {this.props.allreviews.map((review) => {
              return (
                <tr>
                  <td>
                    <li>
                      {review.reviewtext} -- {review.rating}
                    </li>
                  </td>
                </tr>
              );
            })}
          </>
        ) : (
          <>
            {this.props.allreviews.map((review) => {
              return (
                <tr>
                  <td>
                    <li>
                      {review.reviewtext} -- {review.rating}
                    </li>
                  </td>
                </tr>
              );
            })}
          </>
        )}
      </div>
    );
  }
}

export default ReviewIndex;
