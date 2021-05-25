import React from 'react'
import Chat from './Pages/Chat';
import LoginForm from './Pages/LoginForm';

// Socket.Io
import Socket from 'socket.io-client'
const io = Socket('http://localhost:5000')

class App extends React.Component{

  state = {
    name : null,
    room : null
  }

  onChangeState = (name, room) => {
    this.setState({name : name, room : room})
  }

  render(){
    if(this.state.name === null){
      return (
        <LoginForm io={io} onSubmitButton={this.onChangeState} />
      );
    }

    return(
      <Chat io={io} username={this.state.name} room={this.state.room} />
    )
  }
}

export default App;