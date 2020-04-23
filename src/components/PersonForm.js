import React, { useState } from 'react';
import './PersonForm.css';

function PersonForm(props) {
    const [person, setPerson] = useState(props.person);

    function onChange(e) {
        const el = e.target;
        console.log('---- changing:', el.name, el.value);
        setPerson(xxx => ({ ...xxx, [el.name]: el.value }));
        console.log(person);
    }

    function onSave(e) {
        props.save(person);
    }

    function onCancel(e) {
        props.cancel(person);
    }
    
    return (
        <div>
            <h1>Hello From Person Form</h1>
            <div className="form-group">
                <label>First Name</label>
                <input name="fname" value={person.fname} data-testid="fname" className="input-control" onChange={onChange}/>

                <label className="right-inline">Last Name</label>
                <input name="lname" id="lastName" value={person.lname} className="input-control" onChange={onChange}/>
            </div>

            <div className="form-group">
                <label>Company</label>
                <input name="company" value={person.company} className="input-control" onChange={onChange}/>
            </div>

            <div className="form-group">
                <label>Address</label>
                <textarea name="address" value={person.address} className="input-control" onChange={onChange}/>
            </div>

            <div className="form-group">
                <label>City,Prov,Post</label>
                <input name="city" value={person.city} className="input-control" onChange={onChange} style={{ flex: "6" }} />
                <input name="prov" value={person.prov} className="input-control" onChange={onChange} style={{ flex: "1" }} />
                <input name="post" value={person.post} className="input-control" onChange={onChange} style={{ flex: "2" }} />
            </div>

            <div className="form-group">
                <label>&nbsp;</label>
                <button onClick={onSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>

        </div>
    )
}

export default PersonForm;
