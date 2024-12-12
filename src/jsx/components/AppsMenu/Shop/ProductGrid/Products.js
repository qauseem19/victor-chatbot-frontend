import React from "react";

const Products = ({
  product,
  onEdit,  // Function to handle editing
  onDelete // Function to handle deleting
}) => {
  const { id, image, name, rating, price } = product
  return (
<div className="col-12 col-md-6 col-lg-4 col-xl-2 mt-3" style={{ flex: "0 0 auto", maxWidth: "20%" }}>
  {/* Makes each card take up responsive width */}
  <div className="card border mx-auto" style={{ borderColor: "#dfdfdf", borderWidth: "3px" }}>
    <div className="card-body product-grid-card">
      <div className="new-arrival-product">
        <div className="new-arrivals-img-contnent" style={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
          <img
            src={image}
            className="img-fluid rounded-circle"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensures the image covers the entire area without stretching
              borderRadius: '50%' // Keeps the image round
            }}
          />
        </div>
        <div className="new-arrival-content text-center mt-3">
          <h4>{name}</h4>
          <div className="mt-2">
            <span
              className="me-3 text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => onEdit(product)} // Trigger edit when clicked
            >
              <i className="fas fa-pen"></i> Edit
            </span>
            <span
              className="text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => onDelete(id)} // Trigger delete when clicked
            >
              <i className="fas fa-trash"></i> Delete
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  
  );
};

export default Products;
