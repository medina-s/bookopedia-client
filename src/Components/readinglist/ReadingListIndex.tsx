import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

type ReadingListProps = {
  sessionToken: string | null,
  booktitle: string,
  bookauthor: string
};

type ReadingListState = {
  
};

class ReadingListIndex extends React.Component<ReadingListProps, ReadingListState> {
  constructor(props: ReadingListProps) {
    super(props);
    this.state = {
      
    };
    this.addToReadingList = this.addToReadingList.bind(this);
  }

  addToReadingList(){
      let defaultbookrating = "To Read"
    fetch(`http://localhost:3000/readinglist/create`, {
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
      });
  }

  render() {

    return (<>
    <Button type="submit" onClick={() => {
                          this.addToReadingList();
                        }}>Add to my reading list</Button>
    </>)
      
  }
}

export default ReadingListIndex;
