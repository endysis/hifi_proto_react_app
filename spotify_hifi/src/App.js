import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let standardTextColor = '#fff';
let standardStyle = {
  color: standardTextColor
}

let springServerData = {
  user: {
    accountName: 'John',
    userPlaylists: [
      {
        name: 'cherry picked beats',
        songs: ['Shadows','You','Nespole'],
      },
      {
        name: 'Discover Weekly',
        songs: ['Pillow','Nemo Score 1','Drift'],
      }
    ]
  }
};

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
  constructor(){
    super();
    this.state = {componentServerData: {

    }}
  }
  componentDidMount(){
    this.setState({componentServerData: springServerData })
  }
  render() {
    return (
      <div style={{color: standardTextColor}} className="App">
      <h1>{this.componentServerData && this.state.componentServerData.user.accountName} Account
        </h1>
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
