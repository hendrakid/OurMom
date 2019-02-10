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

class MOM04 extends Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.toggleFade = this.toggleFade.bind(this)
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    }

    this.alertFunction = this.alertFunction.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.state = {
      visible: false
    }
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
      visible: true
    })
  }
  onDismiss (event) {
    this.setState({
      visible: false
    })
  }

  render () {
    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='12' md='12'>
            <Card>
              <CardHeader>
                <strong>Basic Form</strong> Elements
              </CardHeader>
              <CardBody>
                <Alert color='success' isOpen={this.state.visible} toggle={this.onDismiss}>
                  This is a success alert — check it out!
                </Alert>
                <Form action='' method='post' encType='multipart/form-data' className='form-horizontal'>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='text-input'>Customer Name</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input type='text' id='text-input' name='text-input' placeholder='Project Name' />
                      <FormText color='muted' />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='text-input'>Location Name</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input type='text' id='text-input' name='text-input' placeholder='Adress' />
                      <FormText color='muted' />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='text-input'>Location Adress Email</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input type='text' id='text-input' name='text-input' placeholder='Member Name' />
                      <FormText color='muted' />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button onClick={this.alertFunction} type='submit' size='sm' color='primary'><i className='fa fa-dot-circle-o' /> Save</Button>
                <Button type='reset' size='sm' color='danger'><i className='fa fa-ban' /> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default MOM04
