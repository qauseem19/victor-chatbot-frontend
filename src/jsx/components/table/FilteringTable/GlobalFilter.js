import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DynamicModal from '../../DynamicModal/DynamicModal';

export const GlobalFilter = ({ filter, setFilter,heading }) => {
    const [showModal, setShowModal] = useState(false);

    // Dynamic input fields configuration
    const dynamicFields = [
        { label: 'Name', name: 'name', placeholder: 'Enter Name', required: true, minLength: 3, maxLength: 50 },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter Email', required: true },
        { label: 'Phone', name: 'phone', type: 'tel', placeholder: 'Enter Phone', required: true, minLength: 10, maxLength: 15 },
    ];

    const handleModalShow = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);

    return (
        <div className="d-flex justify-content-between align-items-center mb-3">
            {/* Left Section: User List Heading */}
            <h4 className="mb-0">{heading}</h4>

            {/* Right Section: Search Input and Add User Button */}
            <div className="d-flex">
                <input
                    className="form-control me-2"
                    style={{ width: "250px" }}
                    value={filter || ''}
                    placeholder="Search..."
                    onChange={e => setFilter(e.target.value)}
                />
             {!heading?.includes("Subscribed") &&   <Button variant="primary" onClick={handleModalShow}>
                   + Add User
                </Button>}
            </div>

            {/* Dynamic Modal */}
            <DynamicModal
                show={showModal}
                handleClose={handleModalClose}
                inputs={dynamicFields}
                btntext={"Add User"}
            />
        </div>
    );
};
