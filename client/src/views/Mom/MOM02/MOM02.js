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

import Lov from './lov.js'
import { DebounceInput } from 'react-debounce-input';

class MOM02 extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.toggleFade = this.toggleFade.bind(this)
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      showLov: false,
      visible: false,
      lovText: '',
      lovId: '',
      lovDataReturn: new Object({})
    }

    this.alertFunction = this.alertFunction.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.callLov = this.callLov.bind(this)
    this.dataCountCallBack = this.dataCountCallBack.bind(this)
    this.dataRowCallBack = this.dataRowCallBack.bind(this)
    this.clickLov = this.clickLov.bind(this)
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse })
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } })
  }

  alertFunction(event) {
    event.preventDefault()
    console.log('Save')
    this.setState({
      visible: true
    })
  }
  onDismiss(event) {
    this.setState({
      visible: false
    })
  }

  callLov(lovText) {
    this.setState({ // buka tutup biar dia loaddata
      showLov: false
    })
    this.setState({
      lovText: lovText,
      showLov: true
    })
    // console.log(lovText);
  }
  dataCountCallBack(isShow) {
    this.setState({
      showLov: isShow
    })
  }
  dataRowCallBack(data) {
    console.log(data)
    if (data != null) {
      this.setState({
        lovText: data.username,
        lovId: data._id
      })
      console.log("id : " + data._id + " \ntext : " + data.username);
    } else {
      this.setState({
        lovText: '',
        lovId: ''
      })
    }
  }
  clickLov(event) {
    this.setState({
      showLov: !this.state.showLov
    })
  }

  /*
    .lookup-form {
      position: absolute;
      display: none;
      box-shadow: rgb(211, 211, 211) 2px 2px 5px 2px;
      z-index: 9999;
      background-color: #fff;
      overflow: auto;
  }
  
      // var htmlVal = '
      <div class="modal fade" id="modal-' + lookupTableId + '" role="dialog"><div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">' + lookupTitle + '</h4>
          </div>
          <div class="modal-body">
            <div class="form-group large-font">
              <label>Search</label>
              <input placeholder="type here" class="form-control ' + lookupInputClass + ' " id="' + lookupSearchParamId + '"/>
            </div>
            <table  id="' + lookupTableId + '" 
                    data-method="post" 
                    data-url="' + lookupUrl + '" 
                    data-content-type="application/json" 
                    data-data-type="json" 
                    data-query-params-type="limit" 
                    data-query-params="' + lookupPreFunc + '" 
                    data-response-handler="loadData" 
                    data-side-pagination="server" 
                    data-pagination="true">
              <thead>
                <tr>
                  <th></th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
      objparent.append(htmlVal);
  */


  render() {
    // this.setState({
    //   lovText: ['row1', 'row2']
    // })
    const { lovText } = this.state;

    const divStyle = {
      position: 'absolute',
      zIndex: 1,
      top: '0px',
      right: '15px'
    };

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='12' md='8'>
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
                      <Label htmlFor='text-input'>Project Name</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input type='text' id='text-input' name='text-input' placeholder='Project Name' />
                      <FormText color='muted' />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='text-input'>Project Owner</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input type='text' id='text-input' name='text-input' placeholder='Project Owner' />
                      <FormText color='muted' />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='text-input'>Member Name</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input type='hidden' vaule={this.state.lovId} id='text-input' />
                      <DebounceInput
                        element={Input}
                        minLength={2}
                        value={this.state.lovText}
                        debounceTimeout={750}
                        onChange={e => this.callLov(e.target.value)} />
                      <FormText color='muted' />
                      <Button onClick={this.clickLov} style={divStyle}><i className='fa fa-search'/></Button>
                      {

                        this.state.showLov == true ?
                          <Lov
                            data={lovText}
                            url='/api/getData'
                            param='param'
                            columns={[{ dataField: 'username', text: 'Username' },
                            { dataField: 'role', text: 'Role' }]}
                            dataCountCallBack={this.dataCountCallBack}
                            dataRowCallBack={this.dataRowCallBack}
                          />
                          : ''
                      }
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='date-input'>Start Date</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input type='date' id='date-input' name='date-input' placeholder='date' />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='date-input'>End Date</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input type='date' id='date-input' name='date-input' placeholder='date' />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md='3'>
                      <Label htmlFor='textarea-input'>Description</Label>
                    </Col>
                    <Col xs='12' md='9'>
                      <Input type='textarea' name='textarea-input' id='textarea-input' rows='9'
                        placeholder='Content...' />
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

export default MOM02
