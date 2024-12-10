import React from "react";

const Products = ({
  product,
  onEdit,  // Function to handle editing
  onDelete // Function to handle deleting
}) => {
  const { id, image, name, rating, price } = product
  return (
    <div className="col mt-3" style={{ flex: "0 0 20%", maxWidth: "20%" }}>
      {/* Makes each card take up 20% of the row */}
      <div className="card border mx-auto" style={{ borderColor: "#dfdfdf", borderWidth: "3px" }}>
        <div className="card-body product-grid-card">
          <div className="new-arrival-product">
          <div className="new-arrivals-img-contnent">
              <img
                src={image}
                className="img-fluid rounded-circle"
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
