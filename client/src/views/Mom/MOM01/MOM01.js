import React, { Component } from 'react'
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row
} from 'reactstrap'
import axios from "axios";

class MOM01 extends Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.toggleFade = this.toggleFade.bind(this)
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      isSuccess: false,
      isError: false,
      username:"",
      password:"",
      role:"0",
      isLogin:false
    }

    this.alertFunction = this.alertFunction.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.isLoginTrue = this.isLoginTrue.bind(this)
    this.putDataToDB = this.putDataToDB.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  toggle () {
    this.setState({ collapse: !this.state.collapse })
  }

  toggleFade () {
    this.setState((prevState) => { return { fadeIn: !prevState } })
  }

  alertFunction (event) {
    event.preventDefault()
    console.log('Save')
    this.setState({
      isSuccess: true
    })
  }
  onDismiss (event) {
    this.setState({
      isSuccess: false,
      isError: false
    })
  }
  isLoginTrue(event){
    this.setState({
      isLogin:!this.state.isLogin
    })
  }

  putDataToDB = (username, password, role, ) => {

    axios.post("/api/putData", {
      username: username,
      password: password,
      role: role
    }).then(res =>{
     const isSuccess = res.data.success
      if(isSuccess===true){
        this.resetForm()
        this.setState({
          isError: false,
          isSuccess: true
        })
      }else{
        this.setState({
          isSuccess: false,
          isError: true
        })
      }
    });
  }

  resetForm(){
    this.setState({
      username:"",
      password:"",
      role:'0',
      isLogin:false
    })

  }


  render () {
    const {isLogin} = this.state
    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='12' md='12'>
            <Card>
              <CardHeader>
                <strong>Basic Form</strong> Elements
              </CardHeader>
              <CardBody>
                <Alert color='success' isOpen={this.state.isSuccess} toggle={this.onDismiss}>
                  Gagal Move on
                </Alert>
                <Alert color='danger ' isOpen={this.state.isError} toggle={this.onDismiss}>
                  Gagal menyimpan kenangan
                </Alert>
                <Form action='' method='post' encType='multipart/form-data' className='form-horizontal'>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='text-input'>Username</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input type='text' value={this.state.username} onChange={e=>this.setState({username : e.target.value})} id='text-input' name='text-input' placeholder='Username' />
                      <FormText color='muted' />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='password-input'>Password</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input type='password' value={this.state.password} onChange={e=>this.setState({password : e.target.value})} id='password-input' name='password-input' placeholder='Password' autoComplete='new-password' />
                      <FormText className='help-block'>Please enter a complex password</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md='3'><Label>Login Access</Label></Col>
                    <Col md='9'>
                      <FormGroup check className='checkbox'>
                        <Input onChange={this.isLoginTrue} checked={this.state.isLogin} className='form-check-input' type='checkbox' id='checkbox1' name='checkbox1' value='option1' />
                        <Label check className='form-check-label' htmlFor='checkbox1'>True</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='select'>Role</Label>
                    </Col>
                    <Col xs='12' md='9'>
                    {
                      isLogin === true ? 
                      <Input type='select' onChange={e=>this.setState({role:e.target.value})} name='select' id='select'>
                      <option value='0'>User</option>
                        <option value='1'>Admin</option>
                        <option value='2'>Super Admin</option>
                      </Input>
                      : 
                      <Input type='select' disabled name='select' id='select'>
                        <option value='0'>User</option>
                      </Input>
                        }
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='file-input'>Photo Profile</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input type='file' id='file-input' name='file-input' />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  onClick={ () =>
                    this.putDataToDB(
                      this.state.username,
                      this.state.password, 
                      this.state.role)}
                  type='submit' size='sm' color='primary'><i className='fa fa-dot-circle-o' /> Save</Button>
                <Button type='reset' size='sm' color='danger'><i className='fa fa-ban' /> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default MOM01
