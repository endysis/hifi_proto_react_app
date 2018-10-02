import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string';

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
    }, 0
  )

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
          <input type="text" onKeyUp={event =>
            this.props.whenTheTextChanges(event.target.value)}/>
          Filter
      </div>
    )
  }
}

class Playlist extends Component {
  render(){
    let playlist = this.props.playlistProps
    return (
    <div style = {{...standardStyle,padding:"30px" ,display: 'inline-block',width: "25"}}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
        {playlist.songs.map(individualSong =>
          <li>
            {individualSong.name}
          </li>
        )}
        </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor(){
    super();
    console.log("Constructor called")
    this.state = {componentServerData: {},
    filterText: '',
    headerTitle: ''
    }
  }

  dealWithChange(e) {
    const newHeaderTitle = e.target.value;
    this.alterHeader(newHeaderTitle);
  }

  alterHeader(headerTitle) {
    this.setState({headerTitle});
  }

  componentDidMount() {
    console.log("Component mount called")
    let parsed = queryString.parse(window.location.search);
    let the_big_access_token = parsed.access_token
    console.log(parsed.access_token)

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + the_big_access_token}
    }).then(response => response.json())
      .then(data => this.setState({componentServerData: {user: {accountName: data.id}}}))


    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + the_big_access_token}
      }).then(response => response.json())
        .then(data => this.setState({componentServerData: {user: {accountName: data.id}}}))
  }

  render() {
    console.log("Render happening")
    console.log(this.state.headerTitle)
    let playlistsToRender = this.state.componentServerData.user &&
    this.state.componentServerData.user.playlists ?
    this.state.componentServerData.user.userPlaylists.filter(individualPlaylist =>
      individualPlaylist.name.toLowerCase().includes(
        this.state.filterText.toLowerCase())
      ) : []
    return (
      <div style={{color: standardTextColor}} className="App">
      {this.state.componentServerData.user ?
        <div>
        <h1>{this.state.componentServerData.user.accountName} Account
        </h1>
        <PlaylistCounter playlistProps= {playlistsToRender}/>
        <HoursCounter hoursProps = {playlistsToRender}/>
        <Filter whenTheTextChanges = {text => this.setState({filterText: text, headerTitle: text})}/>

        {playlistsToRender.map(individualPlaylist =>
            <Playlist playlistProps={individualPlaylist}/>
        )}
         </div> : <button onClick={()=>window.location='http://localhost:8888/login'}
         style={{padding: '20px', 'font-size': '55px','margin-top':'20px'}}>Enter Spotify</button>
       }
      </div>
    );
  }
}

export default App;
