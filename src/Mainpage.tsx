import React from 'react';
import './App.css';
import Homepage from './Components/home/Homepage';
import Nav from './Components/home/Sitebar';
import BookInfoIndex from './Components/bookinfo/BookInfoIndex';
import MyReviewIndex from './Components/review/MyReviewIndex';
import MyReadingListIndex from './Components/readinglist/MyReadingListIndex';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Mainpage: React.FunctionComponent = () => {
    return (
        <React.Fragment>
        <Router>
            <Nav />
            <Switch>
                <Route exact path="/" component={ Homepage } />
                <Route exact path="/bookinfo" component={BookInfoIndex  } />
                <Route exact path="/myreviews" component={ MyReviewIndex } />
                <Route exact path="/myreadinglist" component={ MyReadingListIndex } />
            </Switch>
        </Router>
    </React.Fragment>
    );
  }

export default Mainpage;
