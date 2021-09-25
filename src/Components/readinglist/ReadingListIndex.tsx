import React from "react";
import { Button } from "reactstrap";

type ReadingListProps = {
  sessionToken: string | null;
  booktitle: string;
  bookauthor: string;
};

type ReadingListState = {};

class ReadingListIndex extends React.Component<
  ReadingListProps,
  ReadingListState
> {
  constructor(props: ReadingListProps) {
    super(props);
    this.state = {};
    this.addToReadingList = this.addToReadingList.bind(this);
  }

  async addToReadingList() {
    let defaultbookrating = "To Read";
    await fetch(`http://localhost:3000/readinglist/create`, {
      method: "POST",
      body: JSON.stringify({
        rlist: {
          booktitle: this.props.booktitle,
          bookauthor: this.props.bookauthor,
          status: defaultbookrating,
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
        alert(logData.message);
      })
      .catch((err) => {
        console.log("Exception Occurred");
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <Button
          type="submit"
          onClick={() => {
            this.addToReadingList();
          }}
        >
          Add to my reading list
        </Button>
      </>
    );
  }
}

export default ReadingListIndex;
