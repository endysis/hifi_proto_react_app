import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let standardTextColor = '#fff';
let standardStyle = {
  color: standardTextColor
}

class Aggregate extends Component {
  render(){
    return (
      <div style={{...standardStyle, width: "40%", display: 'inline-block'}}>
          <h2 style={{color: standardTextColor}}>Playlist text</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={standardStyle}>
          <img/>
          <input type="text"/>
          Filter
      </div>
    )
  }
}

class Playlist extends Component {
  render(){
    return (
    <div style = {{...standardStyle, display: 'inline-block',width: "25"}}>
        <img />
        <h3>Playlist Name</h3>
        <ul><li>Song 0</li><li>Song 1</li><li>Song 2</li></ul>
      </div>
    )

  }
}

class App extends Component {
  render() {
    return (
      <div style={{color: standardTextColor}} className="App">
      <h1>The title</h1>
        <Aggregate/>
        <Aggregate/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
      </div>
    );
  }
}

export default App;
