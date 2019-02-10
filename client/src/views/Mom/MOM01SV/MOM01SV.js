import React, { Component } from 'react';
import { Badge, Card, Table } from 'reactstrap';

class MOM01SV extends Component {


  constructor(props) {
    super(props)
    this.state = {
      data: [],
      message:null
    }
    this.getDataFromDb()
  }

  getDataFromDb = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };



  render() {

    const { data } = this.state;
    console.log(data);
    return (
      <div className="animated fadeIn">
        <button onClick={() => this.getDataFromDb()} className="btn btn-block btn-primary" type="button">Refresh</button>
          <Card>
            <Table responsive>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Date registered</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.length <= 0
                  ?
                  <tr align="center"> 
                    <td colSpan="4">No record was found </td>
                  </tr>
                  : data.map((dat,i) => (
                    <tr key={i}>
                      <td> {dat.username} </td>
                      <td> {dat.createdAt} </td>
                      <td> {dat.role == 0 ? 'User' : data.role == 1 ? 'Admin' : 'Super Admin'} </td>
                      <td>
                        <Badge color="success">Active</Badge>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card>

      </div>

    );
  }
}

export default MOM01SV;
