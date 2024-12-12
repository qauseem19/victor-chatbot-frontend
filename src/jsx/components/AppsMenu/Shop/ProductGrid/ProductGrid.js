import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Products from "./Products";
import PageTitle from "../../../../layouts/PageTitle";
import { Button, Spinner, Toast } from "react-bootstrap";
import DynamicModal from "../../../DynamicModal/DynamicModal";

const ProductGrid = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    variant: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // To store selected product for editing

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProduct(null); // Reset selected product after closing
    setProfileImage(null);
  };

  const dynamicFields = [
    {
      label: "Name",
      name: "name",
      placeholder: "Enter Name",
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    {
      label: "Write Prompt",
      name: "prompt",
      type: "textarea",
      placeholder: "Enter Prompt Text Here to Generate New AI Character",
      required: true,
        },
  ];

  // Fetch all products from the API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://chat.mythosdialogues.com/api/getCharacters"
      );
      setProducts(response.data.data);
    } catch (error) {
      setShowToast({
        show: true,
        message: "Failed to load products",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add a new product
  const handleAddProduct = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("prompt", data.prompt);
      if (data.image) formData.append("image", data.image);

      await axios.post("https://chat.mythosdialogues.com/api/character", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowToast({
        show: true,
        message: "Character added successfully",
        variant: "success",
      });

      fetchProducts(); // Refresh the product list
      setProfileImage(null); // Reset profile image
      handleModalClose();
    } catch (error) {
      setShowToast({
        show: true,
        message: "Failed to add character",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  // Edit an existing product
  const handleEditProduct = (product) => {
    console.log("Editing product:", product); // Log the product to make sure it's correct
    setSelectedProduct(product); // Set selected product
    setProfileImage(product.image); // Set profile image for the selected product
    setShowModal(true); // Show the modal for editing
  };

  // Update an existing product
  const handleUpdateProduct = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("prompt", data.prompt);
      if (data.image) formData.append("image", data.image);

      await axios.put(
        `https://chat.mythosdialogues.com/api/character/${selectedProduct.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setShowToast({
        show: true,
        message: "Character updated successfully",
        variant: "success",
      });

      fetchProducts(); // Refresh the product list
      setProfileImage(null); // Reset profile image
      handleModalClose();
    } catch (error) {
      setShowToast({
        show: true,
        message: "Failed to update character",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this character?")) {
      setLoading(true);
      try {
        await axios.delete(`https://chat.mythosdialogues.com/api/character/${id}`);
        setShowToast({
          show: true,
          message: "Character deleted successfully",
          variant: "success",
        });
        fetchProducts(); // Refresh the product list
      } catch (error) {
        setShowToast({
          show: true,
          message: "Failed to delete character",
          variant: "danger",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Character List" motherMenu="Home" />
      <div className="row card d-flex flex-row">
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h4>Character List</h4>
          <Button variant="primary" onClick={handleModalShow}>
            + Add Character
          </Button>
        </div>

        {loading ? (
          <Spinner animation="grow" variant="primary" className="m-3" />
        ) : (
          products.map((product) => (
            <Products
              key={product.id}
              product={product}
              onEdit={handleEditProduct} // Pass edit handler
              onDelete={handleDeleteProduct} // Pass delete handler
            />
          ))
        )}
      </div>

      {/* Modal for adding/editing character */}
      <DynamicModal
        show={showModal}
        handleClose={handleModalClose}
        inputs={dynamicFields}
        onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}
        btntext={
          selectedProduct ? "Update Character" : "Create New AI Character"
        }
        setProfileImage={setProfileImage}
        profileImage={profileImage}
        loading={loading}
        initialValues={selectedProduct} // Pass selected product for editing
      />

      {/* Toast notification */}
      <Toast
        show={showToast.show}
        onClose={() => setShowToast({ show: false, message: "", variant: "" })}
        delay={3000}
        autohide
        bg={showToast.variant}
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Body style={{ color: "white" }}>{showToast.message}</Toast.Body>
      </Toast>
    </Fragment>
  );
};

export default ProductGrid;
