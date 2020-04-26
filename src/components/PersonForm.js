import React from 'react';
import './PersonForm.css';

function PersonForm(props) {
    const person = props.person;

    function focusElement(name) {
        const el = document.querySelector(`[name=${name}]`);
        el.focus();
        el.select();
}
    

    function onSave(e) {
        
        // Get all the input values into a person object to save
        const personToSave = {};
        personToSave.key = person.key;
        const idpersonform = document.getElementById('idpersonform');
        const inputs = idpersonform.getElementsByTagName('input');

        for(let i = 0; i < inputs.length; i++) {
            personToSave[inputs[i].name] = inputs[i].value;
        }

        // Do some simple validation
        try {
            if(!personToSave.fname)  {
                focusElement('fname');
                throw new Error('First name can not be blank');
            }
            if(!personToSave.lname) {
                focusElement('lname');
                throw new Error('Last name can not be blank');
            }

            props.save(personToSave);
            props.userMsg("Saved","status");
        } catch (e) {
            // console.log(e);
            props.userMsg(e.message, "error");
        }

        e.preventDefault();
    }

    function onCancel(e) {
        props.cancel(person);
        e.preventDefault();
    }
    
    return (
        <div>
            <form id="idpersonform" onSubmit={onSave}>
            <h1>Hello From Person Form</h1>
            <div className="form-group">
                <label>First Name</label>
                <input name="fname" defaultValue={person.fname} className="input-control"/>

                <label className="right-inline">Last Name</label>
                <input name="lname" defaultValue={person.lname} className="input-control"/>
            </div>

            <div className="form-group">
                <label>Company</label>
                <input name="company" defaultValue={person.company} className="input-control"/>
            </div>

            <div className="form-group">
                <label>Address</label>
                <textarea name="address" defaultValue={person.address} className="input-control"/>
            </div>

            <div className="form-group">
                <label>City,Prov,Post</label>
                <input name="city" defaultValue={person.city} className="input-control" style={{ flex: "6" }} />
                <input name="prov" defaultValue={person.prov} className="input-control" style={{ flex: "1" }} />
                <input name="post" defaultValue={person.post} className="input-control" style={{ flex: "2" }} />
            </div>

            <div className="form-group">
                <label>&nbsp;</label>
                <button onClick={onSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
            </form>
        </div>
    )
}

export default PersonForm;
