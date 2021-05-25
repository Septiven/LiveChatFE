import React from 'react'

export class Chat extends React.Component {

    state = {
        userOnline: [],
        historyMessage: null,
        message: [],
        usersTyping: []
    }

    componentDidMount(){
        // this.props.io.emit('test', this.props.username)
        // this.props.io.on('test-back', (data) => {
        //     alert(data)
        // })

        // this.props.io.emit('send-data-bebas', 'Purwadhika Digital School')
        this.props.io.on('user-online', (data) => {
            this.setState({userOnline: data})
        })

        this.props.io.on('send-message-from-server', (data) => {
            let arrMessage = this.state.message
            arrMessage.push(data)
            this.setState({message: arrMessage})
        })

        this.props.io.on('send-user-message-back', (data) => {
            let arrMessage = this.state.message
            arrMessage.push(data)
            this.setState({message: arrMessage, onTyping: false})
        })

        this.props.io.on('typing-message-back', (data) => {
            if(data.message.length > 0){
                let index = null

                let usersTyping = this.state.usersTyping

                usersTyping.forEach((value, idx) => {
                    if(value.name === data.from){
                        index = idx
                    }
                })

                console.log(usersTyping)
                if(index === null){
                    usersTyping.push({
                        name: data.from
                    })
                    console.log(usersTyping)
                    this.setState({usersTyping: usersTyping})
                }
            }else if(data.message.length === 0){
                let index = null

                let usersTyping = this.state.usersTyping

                usersTyping.forEach((value, idx) => {
                    if(value.name === data.from){
                        index = idx
                    }
                })

                if(index !== null){
                    usersTyping.splice(index, 1)
                    this.setState({usersTyping: usersTyping})
                }
            }
        })


        this.props.io.on('send-history-message-from-server', (data) => {
            this.setState({historyMessage: data})
        })
    }

    onSendMessage = () => {
        let data = {
            name: this.props.username,
            message: this.message.value,
            room: this.props.room
        }

        this.props.io.emit('send-user-message', data)
        this.message.value = null
    }

    onTyping = () => {
        let data = {
            name: this.props.username,
            message: this.message.value
        }

        this.props.io.emit('typing-message', data)
    }

    render() {
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-6'>
                        <div className='border rounded-0 shadow' style={{height : "670px", overflow: "auto", position: "relative"}} >
                            <div className='bg-primary text-white p-3' style={{position: "sticky", top: "0px", right: "0px", left: "0px"}}>
                                User Online : 
                                {
                                    this.state.userOnline?
                                        this.state.userOnline.map((value, index) => {
                                            return(
                                                <span>
                                                    {value.name},
                                                </span>
                                            )
                                        })
                                    :
                                        null
                                }
                            </div>
                            <div className="alert alert-warning rounded-0 text-center mx-3 mt-3 mb-5" >
                                Hello, {this.props.username? this.props.username : null}
                            </div>
                            {
                                this.state.historyMessage?
                                    this.state.historyMessage.map((value, index) => {
                                        if(this.props.username === value.from){
                                            return(
                                                <div key={index} className="row justify-content-end mx-1">
                                                    <div className="px-2 py-2 mx-3 mb-3 rounded bg-primary" style={{display: "inline-block"}}>
                                                        {value.message}
                                                    </div>
                                                </div>
                                            )
                                        }else{
                                            return(
                                                <div key={index} className="row justify-content-start mx-1">
                                                    <div className="mx-3">
                                                        {value.name}
                                                    </div>
                                                    <div className="px-2 py-2 mx-3 mb-3 rounded border border-primary" style={{display: "inline-block"}}>
                                                        {value.message}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                :
                                    null
                            }
                            {
                                this.state.message?
                                    this.state.message.map((value, index) => {
                                        if(value.from === 'Bot'){
                                            return(
                                                <div key={index} className="alert alert-warning rounded-0 text-center mx-3 mt-3 mb-5" >
                                                    <span className="font-weight-bold mr-1">{value.from}</span><span>{value.message}</span>
                                                </div>
                                            )
                                        }else{
                                            if(this.props.username === value.from){
                                                return(
                                                    <div className="row justify-content-end mx-1">
                                                        <div className="px-2 py-2 mx-3 mb-3 rounded bg-primary" style={{display: "inline-block"}}>
                                                            {value.message}
                                                        </div>
                                                    </div>
                                                )
                                            }else{
                                                return(
                                                    <div className="row justify-content-start mx-1">
                                                        <div className="mx-3">
                                                            {value.from}
                                                        </div>
                                                        <div className="px-2 py-2 mx-3 mb-3 rounded border border-primary" style={{display: "inline-block"}}>
                                                            {value.message}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }
                                    })
                                :
                                    null
                            }
                            {
                                this.state.usersTyping?
                                    this.state.usersTyping.map((value, index) => {
                                        return(
                                            <div className="row justify-content-start mx-1">
                                                <div className="px-2 py-2 mx-3 mb-3 rounded border border-primary" style={{display: "inline-block"}}>
                                                    {value.name} Typing Message
                                                    <div className="spinner-grow text-primary" style={{width: '10px', height: '10px'}}>
                                                        
                                                    </div>
                                                    <div className="spinner-grow text-primary" style={{width: '10px', height: '10px'}}>
                                                        
                                                    </div>
                                                    <div className="spinner-grow text-primary" style={{width: '10px', height: '10px'}}>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                :
                                    null
                            }
                            {/* {
                                this.state.usersMessage?
                                    this.state.usersMessage.map((value, index) => {
                                        if(this.props.username === value.from){
                                            return(
                                                <div className="row justify-content-end mx-1">
                                                    <div className="px-2 py-2 mx-3 mb-3 rounded bg-primary" style={{display: "inline-block"}}>
                                                        {value.message}
                                                    </div>
                                                </div>
                                            )
                                        }else{
                                            return(
                                                <div className="row justify-content-start mx-1">
                                                    <div className="mx-3">
                                                        {value.from}
                                                    </div>
                                                    <div className="px-2 py-2 mx-3 mb-3 rounded border border-primary" style={{display: "inline-block"}}>
                                                        {value.message}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                :
                                    null
                            } */}
                            <div style={{position: "fixed", left: "499px", bottom: "0px", right: "499px"}} className='p-4 bg-primary d-flex justfy-content-between'>
                                <input type='text' ref={(e) => this.message = e} onChange={this.onTyping} className='form-control rounded-0 w-100'  />
                                <input type='button' onClick={this.onSendMessage} className='btn btn-warning rounded-0' value='Send'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat