import React from "react";
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import MasonryItem from '@mui/lab/MasonryItem';
import Grid from '@mui/material/Grid'

type HomepageProps = {
  sessionToken: string | null;
  firstname: string | null;
};

class Homepage extends React.Component<HomepageProps, {}> {
  render() {
    return (
      
  <Box display="flex" justifyContent="center" bgcolor="lightgreen" alignItems="center" sx={{ width: "auto", minHeight: "auto" }}>
    <div>
      <div className="Homepage" style={{fontSize: '2em', color: '#fc766aff'}}><b>Welcome, {this.props.firstname}!</b></div>
      <Masonry columns={{ xs: 3, sm: 4 }} spacing={{ xs: 1, sm: 2, md: 3 }}>
        {itemData.map((item) => (
          <MasonryItem key={item.img}>
            <img
              src={`${item.img}?w=auto&auto=format`}
              srcSet={`${item.img}?w=auto&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </MasonryItem>
        ))}
      </Masonry>
      </div>
    </Box>
    
    
    )
  }
}
const itemData = [
  {
    img: '/homepage-img-2.jpg',
    title: 'Fern',
  },
  {
    img: '/homepage-img-1.jpg',
    title: 'Snacks',
  },
  {
    img: '/homepage-img-3.jpg',
    title: 'Mushrooms',
  },
  {
    img: '/homepage-img-4.jpg',
    title: 'Tower',
  },
  {
    img: '/homepage-img-5.jpg',
    title: 'Sea star',
  },
  {
    img: '/homepage-img-8.jpg',
    title: 'Honey',
  },
  {
    img: '/homepage-img-7.jpg',
    title: 'Basketball',
  },
  {
    img: '/homepage-img-6.jpg',
    title: 'Breakfast',
  },
  {
    img: '/homepage-img-9.jpg',
    title: 'Tree',
  },
  {
    img: '/homepage-img-13.jpg',
    title: 'Burger',
  },
  {
    img: '/homepage-img-11.jpg',
    title: 'Camera',
  },
  {
    img: '/homepage-img-12.jpg',
    title: 'Coffee',
  },
];

export default Homepage;
