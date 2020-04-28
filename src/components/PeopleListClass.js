import React, { Component } from 'react';

class PeopleListClass extends Component {

    constructor(props) {
        super(props);
        this.state = {count:10};
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    onClick = (e) => {
        console.log("onClick");
        this.setState({count : this.state.count + 1});
    }

    render() {
        console.log("In Render");
        return (
            <div>
                <h1 onClick={this.onClick}>Hello World from PeopleListClass {this.state.count} </h1>
            </div>
        )
    }
}

export default PeopleListClass;