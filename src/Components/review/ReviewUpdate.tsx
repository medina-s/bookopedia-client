import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

type ReviewUpdateProps = {
  bookname: string;
  bookauthor: string;
  reviewtext: string;
  rating: string | null;
  reviewid: string;
  toggle: (val: boolean, index: number) => void;
  sessionToken: string | null;
  fetchAllReviews: () => void;
};

type ReviewUpdateState = {
  reviewtext: string;
  rating: string | null;
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

  async editReview(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`http://localhost:3000/review/edit/${this.props.reviewid}`, {
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
        this.props.toggle(false, 0);
        alert(logData.message);
      })
      .catch((err) => {
        console.log("Exception Occurred");
        console.log(err);
      });
  }

  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader>Edit Review</ModalHeader>
        <ModalBody>
        <Box component='form' onSubmit={this.editReview} sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}>
          
            <div>
            <TextField variant="standard"
                  disabled
                  label="Book Title"
                  value={this.props.bookname}
                />
              <TextField variant="standard"
                  disabled
                  label="Book Author"
                  value={this.props.bookauthor}
                />
                </div>
                <div>
            <TextField variant="standard" required
                  multiline
                  maxRows={4}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ reviewtext: e.target.value })
                  }
                  label="Review"
                  value={this.state.reviewtext}
                />
          <FormControl variant="standard" required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="rating-standard-label">Rating</InputLabel>
                <Select  autoWidth displayEmpty
                labelId="rating-standard-label"
                  value={this.state.rating}
                  onChange={(e) => {
                    this.setState({
                      rating: e.target.value,
                    });
                  }}
                >
                  <MenuItem value={"1"}>1</MenuItem>
                  <MenuItem value={"2"}>2</MenuItem>
                  <MenuItem value={"3"}>3</MenuItem>
                  <MenuItem value={"4"}>4</MenuItem>
                  <MenuItem value={"5"}>5</MenuItem>
                </Select>
                </FormControl>
            </div>
            <div>
            <Button variant="outlined" type="submit">Update Review</Button>
            </div>
          </Box>
        </ModalBody>
      </Modal>
    );
  }
}

export default ReviewUpdate;
