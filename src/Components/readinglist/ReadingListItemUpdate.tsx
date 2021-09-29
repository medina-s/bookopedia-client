import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

type ReadingListItemUpdateProps = {
  bookname: string;
  bookauthor: string;
  status: string | null;
  itemid: string;
  toggle: (val: boolean, index: number) => void;
  sessionToken: string | null;
  fetchAllItems: () => void;
};

type ReadingListItemUpdateState = {
  status: string | null;
};

class ReadingListItemUpdate extends React.Component<
  ReadingListItemUpdateProps,
  ReadingListItemUpdateState
> {
  constructor(props: ReadingListItemUpdateProps) {
    super(props);
    this.state = {
      status: this.props.status,
    };
    this.editItem = this.editItem.bind(this);
  }

  async editItem(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`http://localhost:3000/readinglist/edit/${this.props.itemid}`, {
      method: "PUT",
      body: JSON.stringify({
        rlist: {
          booktitle: this.props.bookname,
          bookauthor: this.props.bookauthor,
          status: this.state.status,
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
        this.props.fetchAllItems();
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
        <ModalHeader>Edit Book Status</ModalHeader>
        <ModalBody>
        <Box component='form' onSubmit={this.editItem} sx={{
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
            <FormControl variant="standard" required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="status-standard-label">Status</InputLabel>
                <Select  autoWidth displayEmpty
                labelId="status-standard-label"
                  value={this.state.status}
                  onChange={(e) => {
                    this.setState({
                      status: e.target.value,
                    });
                  }}
                >
                  <MenuItem value={"To Read"}>To Read</MenuItem>
                  <MenuItem value={"Reading"}>Reading</MenuItem>
                  <MenuItem value={"Completed"}>Completed</MenuItem>
                </Select>
                </FormControl>
                </div>
            <div>
            <Button variant="outlined" type="submit">Update Status</Button>
            </div>
          </Box>
        </ModalBody>
      </Modal>
    );
  }
}

export default ReadingListItemUpdate;
