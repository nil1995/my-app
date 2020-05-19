import React from 'react';

export class BoardsPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {(Object.keys(this.props.data).filter(item => item !== 'whois').map((item, index) => {
                    return (<div key={index}>{item} = {this.props.data[item]}</div>)
                }))}
            </div>
        )
    }
}