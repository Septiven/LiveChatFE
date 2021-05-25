import React, { Component } from 'react'

export class LoginForm extends Component {

    componentDidMount(){
        this.props.io.emit('bebas', 'Bebas')
    }

    onSubmitButton = () => {
        let name = this.name.value
        let room = this.room.value
        
        this.props.io.emit('user-join', {name, room})
        this.props.io.on('total-user', (data) => {
            if(data < 5){
                this.props.onSubmitButton(name, room)
            }else{
                alert('Room Sudah Penuh!')
            }
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='row justify-content-center m-5'>
                    <div className='col-4'>
                        <div className='border rounded shadow p-5 text-center'>
                            <h3>Login Here</h3>
                            <input type='text' ref={(el) => this.name = el} placeholder='Your Name' className='form-control mt-3'/>
                            <input type='text' ref={(el) => this.room = el} placeholder='Room Name' className='form-control mt-3'/>
                            <input onClick={() => this.onSubmitButton()} type='button' value='Submit' className='w-100 btn btn-primary mt-3'  />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginForm