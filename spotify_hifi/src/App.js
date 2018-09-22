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
        songs: [{name : 'Shadows', duration:1495},{name: 'You', duration:1976},{name :'Nespole', duration:1323}],
      },
      {
        name: 'Discover Weekly',
        songs: [{name :'Pillow', duration: 1534},{name :'Nemo Score 1', duration: 1203},{name :'Drift', duration: 1634}],
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render(){
    return (
      <div style={{...standardStyle, width: "40%", display: 'inline-block'}}>
          <h2 style={{color: standardTextColor}}>{this.props.playlistProps && this.props.playlistProps.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render(){
    let listOfSongs = this.props.hoursProps.reduce((songsList, individualPlaylist) => {
      return songsList.concat(individualPlaylist.songs)
    },[])

    let totalDuration = listOfSongs.reduce((sumTotal, individualSong)  => {
      return sumTotal + individualSong.duration
    }, 0)

    return (
      <div style={{...standardStyle, width: "40%", display: 'inline-block'}}>
          <h2 style={{color: standardTextColor}}>{Math.round(totalDuration/60)} Hours</h2>
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
    console.log("Constructor called")
    this.state = {componentServerData: {}}
  }
  componentDidMount() {
    setTimeout(() => {
      console.log("Component did mount called")
      this.setState({componentServerData: springServerData})
    }, 1000);
  }
  render() {
    console.log("Render happening")
    return (
      <div style={{color: standardTextColor}} className="App">
      {this.state.componentServerData.user ?
        <div>
        <h1>{this.state.componentServerData.user.accountName} Account
        </h1>
        <PlaylistCounter playlistProps= {this.state.componentServerData.user.userPlaylists}/>
        <HoursCounter hoursProps = {this.state.componentServerData.user.userPlaylists}/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
         </div> : <h1 style ={standardStyle}>"Loading..." </h1>
       }
      </div>
    );
  }
}

export default App;
