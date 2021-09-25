import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown, 
  Table
} from "reactstrap";
import ReadingListIndex from "../readinglist/ReadingListIndex";

type ReviewIndexProps = {
  allreviews: any[];
  toggle: boolean;
  sessionToken: string | null;
  bookname: string;
  bookauthor: string;
  fetchReviewsDB: () => void;
};

type ReviewIndexState = {
  id: string;
  booktitle: string;
  bookauthor: string;
  reviewtext: string;
  rating: string | null;
};

class ReviewIndex extends React.Component<ReviewIndexProps, ReviewIndexState> {
  constructor(props: ReviewIndexProps) {
    super(props);
    this.state = {
      id: "",
      booktitle: "",
      bookauthor: "",
      reviewtext: "",
      rating: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (this.state.reviewtext === "" || this.state.rating === null) {
      alert("Cannot submit empty form!");
    } else {
      await fetch(`http://localhost:3000/review/create`, {
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
          this.props.fetchReviewsDB();
          alert(logData.message);
        })
        .catch((err) => {
          console.log("Exception Occurred");
          console.log(err);
        });
    }
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
            <ReadingListIndex
              booktitle={this.props.bookname}
              bookauthor={this.props.bookauthor}
              sessionToken={this.props.sessionToken}
            />
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
                <UncontrolledDropdown>
                  <DropdownToggle caret>
                    <>{this.state.rating}</>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Rating</DropdownItem>

                    <DropdownItem
                      dropDownValue="1"
                      onClick={(e) => {
                        this.setState({
                          rating: e.currentTarget.getAttribute("dropDownValue"),
                        });
                      }}
                    >
                      1
                    </DropdownItem>
                    <DropdownItem
                      dropDownValue="2"
                      onClick={(e) => {
                        this.setState({
                          rating: e.currentTarget.getAttribute("dropDownValue"),
                        });
                      }}
                    >
                      2
                    </DropdownItem>
                    <DropdownItem
                      dropDownValue="3"
                      onClick={(e) => {
                        this.setState({
                          rating: e.currentTarget.getAttribute("dropDownValue"),
                        });
                      }}
                    >
                      3
                    </DropdownItem>
                    <DropdownItem
                      dropDownValue="4"
                      onClick={(e) => {
                        this.setState({
                          rating: e.currentTarget.getAttribute("dropDownValue"),
                        });
                      }}
                    >
                      4
                    </DropdownItem>
                    <DropdownItem
                      dropDownValue="5"
                      onClick={(e) => {
                        this.setState({
                          rating: e.currentTarget.getAttribute("dropDownValue"),
                        });
                      }}
                    >
                      5
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </FormGroup>
              <Button type="submit">Add Review</Button>
            </Form>
            All reviews:
            <Table striped>
            <thead>
                <tr>
                    <th>Review</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
            
            {this.props.allreviews.map((review) => {
              return (
                <tr>
                    <td>{review.reviewtext}</td>
                    <td>{review.rating}</td>
            </tr>
              );
            })}
            </tbody></Table>
          </>
        ) : (
          <>
            <Table striped>
            <thead>
                <tr>
                    <th>Review</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
            
            {this.props.allreviews.map((review) => {
              return (
                <tr>
                    <td>{review.reviewtext}</td>
                    <td>{review.rating}</td>
            </tr>
              );
            })}
            </tbody></Table>
          </>
        )}
      </div>
    );
  }
}

export default ReviewIndex;
