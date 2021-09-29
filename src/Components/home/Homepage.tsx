import React from "react";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import MasonryItem from "@mui/lab/MasonryItem";

type HomepageProps = {
  sessionToken: string | null;
  firstname: string | null;
};

type HomepageState = {
  itemData: any[];
};

class Homepage extends React.Component<HomepageProps, HomepageState> {
  constructor(props: HomepageProps) {
    super(props);
    this.state = {
      itemData: [
        {
          img: "/homepage-img-2.jpg",
          title: "books image 1",
        },
        {
          img: "/homepage-img-1.jpg",
          title: "books image 2",
        },
        {
          img: "/homepage-img-3.jpg",
          title: "books image 3",
        },
        {
          img: "/homepage-img-4.jpg",
          title: "books image 4",
        },
        {
          img: "/homepage-img-5.jpg",
          title: "books image 5",
        },
        {
          img: "/homepage-img-8.jpg",
          title: "books image 6",
        },
        {
          img: "/homepage-img-7.jpg",
          title: "books image 7",
        },
        {
          img: "/homepage-img-6.jpg",
          title: "books image 8",
        },
        {
          img: "/homepage-img-9.jpg",
          title: "books image 9",
        },
        {
          img: "/homepage-img-13.jpg",
          title: "books image 10",
        },
        {
          img: "/homepage-img-11.jpg",
          title: "books image 11",
        },
        {
          img: "/homepage-img-12.jpg",
          title: "books image 12",
        },
      ],
    };
  }

  render() {
    return (
      <Box
        display="flex"
        justifyContent="center"
        bgcolor="lightgreen"
        alignItems="center"
        sx={{ width: "auto", minHeight: "auto" }}
      >
        <div>
          <div
            className="Homepage"
            style={{ fontSize: "2em", color: "#fc766aff" }}
          >
            <b>Welcome, {this.props.firstname}!</b>
          </div>
          <Masonry columns={{ xs: 3, sm: 4 }} spacing={{ xs: 1, sm: 2, md: 3 }}>
            {this.state.itemData.map((item) => (
              <MasonryItem key={item.img}>
                <img
                  src={`${item.img}?w=auto&auto=format`}
                  srcSet={`${item.img}?w=auto&auto=format&dpr=2 2x`}
                  alt={item.title}
                  //loading="lazy"
                />
              </MasonryItem>
            ))}
          </Masonry>
        </div>
      </Box>
    );
  }
}

export default Homepage;
