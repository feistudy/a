import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import { Container, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Row } from 'reactstrap';
import Menu from './Menu/Menu';
import Home from './Home/Home';
import HackerNews from './HackerNews/HackerNews';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu />

          <Container id="body">
            <Row id="content">
              <Col>
              <Route exact path="/" component={Home}/>
              <Route path="/hacker-news" component={HackerNews}/>
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
