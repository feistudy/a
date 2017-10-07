import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import HackerNewsComments from '../HackerNewsComments/HackerNewsComments';
import Loading from '../Loading/Loading';
import './HackerNews.css';

class HackerNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topstories: null,
      isLoadingMore: false,
    };

    this.topstoriesID = null;
    this.showedTopstories = 0;

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    this.loadTopstories();
  }
  
  async handleScroll(event) {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      if (this.showedTopstories < this.topstoriesID.length && !this.state.isLoadingMore) {
        this.setState({
          isLoadingMore: true,
        });

        await this.loadMoreTopstories();

        this.setState({
          isLoadingMore: false,
        });
      }
    }
  }

  async loadTopstories() {
    let topstoriesIDResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', {method: 'get'});
    let topstoriesID = await topstoriesIDResponse.json();
    this.topstoriesID = topstoriesID;

    this.loadMoreTopstories();
  }

  async loadMoreTopstories() {
    let topstories = [];
    let count = 0;
    
    for (let topstoriesIndex = this.showedTopstories; topstoriesIndex < this.topstoriesID.length; topstoriesIndex++) {
      let topstory = fetch(`https://hacker-news.firebaseio.com/v0/item/${this.topstoriesID[topstoriesIndex]}.json`, {method: 'get'});

      topstories.push(topstory);
      count++;

      if (count === 30) {
        break;
      }
    }

    topstories = await Promise.all(topstories);

    for (let topstoriesIndex = 0; topstoriesIndex < topstories.length; topstoriesIndex++) {
      topstories[topstoriesIndex] = topstories[topstoriesIndex].json();
    }

    topstories = await Promise.all(topstories);

    this.showedTopstories += count;

    if (this.state.topstories == null) {
      this.setState({
        topstories: topstories,
      });
    } else {
      this.setState({
        topstories: this.state.topstories.concat(topstories),
      });
    }
  }

  render() {
    if (this.state.topstories === null) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        <h2>Hacker News</h2>
        <hr/>
        {
          this.state.topstories.map((topstory, index) =>
            <div key={index}>
            <h6><a id="title" href={topstory.url} target="_blank">{topstory.title}</a></h6>
              <HackerNewsComments topstory={topstory} />
              <hr/>
            </div>
          )
        }
        {
          this.state.isLoadingMore ? <Loading /> : <div></div>
        }
      </div>
    );
  }
}

export default HackerNews;
