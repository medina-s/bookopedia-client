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
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

type ReadingListItemUpdateProps = {
  bookname: string;
  bookauthor: string;
  status: string | null;
  itemid: string;
  toggle: (val: boolean) => void;
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
        this.props.toggle(false);
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
          <Form onSubmit={this.editItem}>
            <FormGroup check disabled>
              <Label htmlFor="readinglist">Book Title</Label>
              <Input name="bookname" value={this.props.bookname} disabled />
            </FormGroup>
            <FormGroup check disabled>
              <Label htmlFor="readinglist">Book Author</Label>
              <Input name="bookauthor" value={this.props.bookauthor} disabled />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="readinglist">Status</Label>
              <UncontrolledDropdown>
                <DropdownToggle caret>
                  <>{this.state.status}</>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Status</DropdownItem>

                  <DropdownItem
                    dropDownValue="To Read"
                    onClick={(e) => {
                      this.setState({
                        status: e.currentTarget.getAttribute("dropDownValue"),
                      });
                    }}
                  >
                    To Read
                  </DropdownItem>
                  <DropdownItem
                    dropDownValue="Reading"
                    onClick={(e) => {
                      this.setState({
                        status: e.currentTarget.getAttribute("dropDownValue"),
                      });
                    }}
                  >
                    Reading
                  </DropdownItem>
                  <DropdownItem
                    dropDownValue="Completed"
                    onClick={(e) => {
                      this.setState({
                        status: e.currentTarget.getAttribute("dropDownValue"),
                      });
                    }}
                  >
                    Completed
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </FormGroup>
            <Button type="submit">Update Status</Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default ReadingListItemUpdate;
