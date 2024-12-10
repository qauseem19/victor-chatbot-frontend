// import React, { useState, useRef } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { Formik, Field, Form as FormikForm } from 'formik';
// import { createValidationSchema } from '../../utils/validationSchema';

// const DynamicModal = ({ show, handleClose, inputs, btntext }) => {
//     const validationSchema = createValidationSchema(inputs);
//     const [profileImage, setProfileImage] = useState(null); // For previewing selected image
//     const fileInputRef = useRef(null); // Ref for the file input

//     const handleSubmit = (values) => {
//         console.log(values);
//         handleClose();
//     };

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setProfileImage(URL.createObjectURL(file)); // Update profile image preview
//         }
//     };

//     const handleImageClick = () => {
//         fileInputRef.current.click(); // Programmatically open the file input
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>{btntext}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Formik
//                     initialValues={inputs.reduce((acc, field) => {
//                         acc[field.name] = '';
//                         return acc;
//                     }, {})}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSubmit}
//                 >
//                     {({ errors, touched }) => (
//                         <FormikForm>
//                             {/* Profile Image Circle */}
//                             <div className="d-flex justify-content-center mb-4">
//                                 <div className="profile-circle" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
//                                     <img
//                                         src={profileImage || 'https://via.placeholder.com/150'}
//                                         alt="Profile"
//                                         className="rounded-circle"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Hidden File Input */}
//                             <input
//                                 type="file"
//                                 ref={fileInputRef}  // Set ref to this input
//                                 style={{ display: 'none' }} // Hide input
//                                 onChange={handleImageChange} // Handle image change separately
//                             />

//                             {inputs.map((field, index) => (
//                                 <Form.Group className="mb-3" key={index}>
//                                     <Form.Label>{field.label}</Form.Label>
//                                     {field.type === 'textarea' ? (
//                                         <Field
//                                             as="textarea"
//                                             name={field.name}
//                                             placeholder={field.placeholder}
//                                             className={`form-control ${errors[field.name] && touched[field.name] ? 'is-invalid' : ''}`}
//                                         />
//                                     ):<Field
//                                     name={field.name}
//                                     type={field.type || 'text'}
//                                     placeholder={field.placeholder}
//                                     className={`form-control ${errors[field.name] && touched[field.name] ? 'is-invalid' : ''}`}
//                                 />}

//                                     {errors[field.name] && touched[field.name] && (
//                                         <div className="invalid-feedback">{errors[field.name]}</div>
//                                     )}
//                                 </Form.Group>
//                             ))}
//                             <div className="d-flex justify-content-end">
//                                 <Button variant="primary" type="submit">
//                                  {btntext}
//                                 </Button>
//                             </div>
//                         </FormikForm>
//                     )}
//                 </Formik>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default DynamicModal;

// api integration
import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap"; // Import Spinner
import { Formik, Field, Form as FormikForm } from "formik";
import { createValidationSchema } from "../../utils/validationSchema";

const DynamicModal = ({
  show,
  handleClose,
  inputs,
  onSubmit,
  btntext,
  setProfileImage,
  profileImage,
  loading,
  initialValues, // Pass selected product for editing
}) => {
  const validationSchema = createValidationSchema(inputs);
  const fileInputRef = useRef(null);

  // Set initial values based on selectedProduct (edit mode) or default for new character
  const initialFormValues = initialValues
    ? { name: initialValues.name, prompt: initialValues.prompt,image:initialValues.image } // Use selected product's data for editing
    : inputs.reduce((acc, field) => {
        acc[field.name] = ""; // Default empty values for new entries
        return acc;
      }, {});

      const handleSubmit = async (values, { setFieldError }) => {
        if (!profileImage) {
            alert("Profile image is required.");
            return;
        }
        if (fileInputRef.current && fileInputRef.current.files[0]) {
            values.image = fileInputRef.current.files[0];
        }
        await onSubmit(values);
    };
    

  useEffect(() => {
    if (initialValues) {
      setProfileImage(initialValues.image); // Set image if editing
    }
  }, [initialValues, setProfileImage]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{btntext}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialFormValues} // Use the initial values
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <FormikForm>
            <Form.Group className="mb-3">
  <Form.Label>Upload Profile Image</Form.Label> {/* Add Label Here */}
  <div className="d-flex justify-content-center mb-4">
    <div
      className="profile-circle"
      onClick={() => fileInputRef.current.click()}
      style={{ cursor: "pointer" }}
    >
      <img
        src={profileImage || "https://via.placeholder.com/150"}
        alt="Profile"
        className="rounded-circle"
      />
    </div>
  </div>
</Form.Group>

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) =>
                  setProfileImage(URL.createObjectURL(e.target.files[0]))
                }
              />
              {inputs.map((field, index) => (
                <Form.Group className="mb-3" key={index}>
                  <Form.Label>{field.label}</Form.Label>
                  <Field
                    as={field.type === "textarea" ? "textarea" : "input"}
                    name={field.name}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    className={`form-control ${
                      errors[field.name] && touched[field.name]
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {errors[field.name] && touched[field.name] && (
                    <div className="invalid-feedback">{errors[field.name]}</div>
                  )}
                </Form.Group>
              ))}
              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : btntext}
                </Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default DynamicModal;
