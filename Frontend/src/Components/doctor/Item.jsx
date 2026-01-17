import React from 'react'
import './Item.css'
function Item(props) {
    const Patient_id = props.Patient_id;
    const Patient_name = props.Patient_name;
    const prescription_id = props.Pescription_id;
    return (
        <div className="item">
            <div className='details'>
                <div className='attribute'>
                    <p>Priscription Id</p>
                    <p>Patient Name</p>
                    <p>Patient Id</p>
                </div>
                <div className='values'>
                    <p>: {prescription_id}</p>
                    <p>: {Patient_name}</p>
                    <p>: {Patient_id}</p>
                </div>
            </div>
            <div className='view'>
                <button className='view-btn'>View Prescription</button>
            </div>
        </div>
    )
}

export default Item
