import React from 'react';
import './PeopleList.css';

function PeopleList(props) {

    let listOfStuff;
    if (props.people) {
        listOfStuff = Object.keys(props.people).map(k => {
            const p = props.people[k];
            return (
                <li key={p.key} mykey={p.key}> {p.fname} </li>
            )
        });
    }

    function onClick(e) {
        props.showOne(e.target.getAttribute("mykey"));
    }

    const onAdd = () => {
        props.onAdd();
    }

    return (
        <div>
            <h1>Hello From PeopleList</h1>
            <ol className="clList" onClick={onClick}>
                {listOfStuff}
            </ol>
            <button onClick={onAdd}>Add</button>
        </div>
    )
}

export default PeopleList;
