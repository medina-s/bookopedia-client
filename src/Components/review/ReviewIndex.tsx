import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";
import ReadingListIndex from "../readinglist/ReadingListIndex";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import APIURL from '../../helpers/environment';




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
      rating: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (this.state.reviewtext === "" || this.state.rating === null) {
      alert("Cannot submit empty form!");
    } else {
      await fetch(`${APIURL}/review/create`, {
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
            <Box component='form' onSubmit={this.handleSubmit} sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}>

           <div>
                <TextField variant="filled" required
                  multiline
                  maxRows={4}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ reviewtext: e.target.value })
                  }
                  label="Review"
                  value={this.state.reviewtext}
                />
                </div>
                <div>
                <FormControl variant="filled" required sx={{ m: 1, minWidth: 120 }}>
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
              <Button  variant="contained" type="submit">Add Review</Button>
              </div>
            </Box>
            All reviews:
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Review</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
            {this.props.allreviews.map((review) => {
              return (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {review.reviewtext}
              </TableCell>
              <TableCell>{review.rating}</TableCell>
                   
            </TableRow>
              );
            })}
            </TableBody></Table> </TableContainer>
          </>
        ) : (
          <>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Review</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
            {this.props.allreviews.map((review) => {
              return (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {review.reviewtext}
              </TableCell>
              <TableCell>{review.rating}</TableCell>
                   
            </TableRow>
              );
            })}
            </TableBody></Table> </TableContainer>
          </>
        )}
      </div>
    );
  }
}

export default ReviewIndex;
