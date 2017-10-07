import React, { Component } from 'react';
import { Button, Collapse, Media } from 'reactstrap';
import './HackerNewsComments.css';

class HackerNewsComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      comments: null,
    };

    this.isLoadedComments = false;

    this.toggle = this.toggle.bind(this);
  }
      
  toggle() {
    this.setState({
      collapse: !this.state.collapse,
    });

    if (!this.isLoadedComments) {
      this.loadComments();
      this.isLoadedComments = true;
    }
  }
      
  async loadComments() {
    if (!this.props.topstory.hasOwnProperty('kids')){
      return;
    }

    let comments = [];

    for (let kidsIndex = 0; kidsIndex < this.props.topstory.kids.length; kidsIndex++) {
      let comment = fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.topstory.kids[kidsIndex]}.json`, {method: 'get'});
          
      comments.push(comment);
    }
    
    comments = await Promise.all(comments);
        
    for (let commentsIndex = 0; commentsIndex < comments.length; commentsIndex++) {
      comments[commentsIndex] = comments[commentsIndex].json();
    }
        
    comments = await Promise.all(comments);
    
    this.setState({
      comments: comments
    });
  }

  render() {
    return (
      <div>
        <Button color="link" onClick={this.toggle}>
          <small className="text-muted">
            {this.props.topstory.score} {this.props.topstory.score > 1 ? 'points' : 'point'} | {this.props.topstory.time} | {this.props.topstory.descendants} {this.props.topstory.descendants > 1 ? 'comments' : 'comment'}
          </small>
        </Button>

        <Collapse isOpen={this.state.collapse}>
          <Media list>
          {
            this.state.comments === null ?
              ''
            :
              this.state.comments.map((comment, index) =>
                <Media tag="li" key={index}>
                  <Media body>
                    <small className="text-muted">{comment.by} {comment.time}</small><br/>
                    <div dangerouslySetInnerHTML={{__html: comment.text}}/>
                  </Media>
                </Media>
              )
          }
          </Media>
        </Collapse>
      </div>
    );
  }
}

export default HackerNewsComments;
