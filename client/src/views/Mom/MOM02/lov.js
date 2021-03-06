import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';

import { Badge, Card, Table, CardBody, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class lov extends Component {
    _isMounted = false
    constructor(props) {
        super(props)

        this.state = {
            lovText: '',
            url: '',
            data: [],
            param: '',
            columns: []
        }

        this.hideLov = this.hideLov.bind(this)
        this.getDataFromDb = this.getDataFromDb.bind(this)
        this.handleDataCallBack = this.handleDataCallBack.bind(this)
        // console.log('Contructor');
        // console.log(this.state)

    }


    componentWillMount() {
        // console.log('Component WILL MOUNT')
        // console.log(this.state)
        const { data } = this.props // data itu variable yang kita kirim, harus sama dengan yang dari parent
        const { url } = this.props
        const { param } = this.props
        const { columns } = this.props
        this.setState({
            lovText: data,
            url: url,
            param: param,
            columns: columns
        })

    }
    componentDidMount() { // funtion yang di panggil ketika telah diload
        // console.log('Didmount');
        // console.log(this.state)
        this._isMounted = true
        this.getDataFromDb()


    }
    componentWillReceiveProps(newProps) {
        // console.log('Receive props')
        // console.log(this.state)

    }
    componentWillUpdate(nextProps, nextState) {
        // console.log('Component WILL UPDATE!');
        // console.log(this.state)

    }
    componentDidUpdate(prevProps, prevState) {
        // console.log('Component DID UPDATE!')
        // console.log(this.state)
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    // componentWillMount
    // render
    // componentDidMount
    // componentWillReceiveProps
    // shouldComponentUpdate
    // componentWillUpdate
    // render
    // componentDidUpdate
    // componentWillUnmount


    getDataFromDb() {
        console.log(this.state.url)
        fetch(this.state.url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "projectionField": 'username createdAt role',
                "limit": 10,
                "param": this.state.lovText
            })
        })
            .then(data => data.json())
            .then(res => {
                if (this._isMounted) {
                    this.setState({ data: res.data })
                }
            })
            .then(res => {
                if (this.state.param == "" || this.state.data.length == 0) {
                    this.hideLov()
                } else {
                    console.log('ada isinya')
                }
            }
                // this.state.param == "" ? this.hideLov() : this.state.data.length == 0 ? this.hideLov() : console.log('ada isinya')
            )

        // console.log(this.state)
    }

    hideLov(event) {
        this.props.dataCountCallBack(false)
        this.props.dataRowCallBack(null)
    }
    handleDataCallBack(event) {
        event.preventDefault()
        // this.props.dataRowCallBack(data)
    }

    render() {
        // console.log('Render');
        const divStyle = {
            top: '30px',
            position: 'absolute',
            zIndex: 1
            // clear:'right'
        };

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                this.props.dataRowCallBack(row)
                this.props.dataCountCallBack(false)
            }
        };

        return (
            <div style={divStyle} >
                <Card>
                    <BootstrapTable keyField='_id' data={(this.state.data || [])} columns={this.state.columns} rowEvents={rowEvents} />
                    { this.state.data.length==0 ? <p>&nbsp;&nbsp;&nbsp;&nbsp; Loading . . .</p> :''}
                </Card>
            </div>
        )
    }
}

export default lov
