import React, { useEffect, useState } from "react";

// Bootstrap
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

// Css
import "./App.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  clearForm,
  formState,
  setProductName,
  setDescription,
  setCategory,
  setExpireDate,
  setCostPrice,
  setSellPrice,
  setDiscount,
  setEditingIndex,
  setDataToEdit,
} from "./reduxSlice";
import { useNavigate } from "react-router-dom";
import {
  addProductToList,
  productState,
  updateProductToList,
} from "../tabel/reduxSlice";

const ProductForm = () => {
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    editingIndex,
    productName,
    description,
    category,
    expireDate,
    costPrice,
    sellPrice,
    discount,
  } = useSelector(formState);

  const { products } = useSelector(productState);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (editingIndex !== null) {
        // update
        dispatch(
          updateProductToList({
            productName,
            description,
            discount,
            category,
            expireDate,
            costPrice,
            sellPrice,
            index: editingIndex,
          })
        );
      } else {
        dispatch(
          addProductToList({
            productName,
            description,
            discount,
            category,
            expireDate,
            costPrice,
            sellPrice,
          })
        );
      }

      navigate("/");
      dispatch(setEditingIndex({ index: null }));
      dispatch(clearForm({}));
    }

    setValidated(true);
  };

  useEffect(() => {
    if (editingIndex !== null) {
      let productData = products[editingIndex];

      dispatch(
        setDataToEdit({
          ...productData,
        })
      );
    }
  }, [dispatch, editingIndex, products]);

  return (
    <div>
      <Col xs lg="4" md="5" sm="6" className="mx-auto my-5  ">
        <Form
          className="shadow-lg  p-2 rounded-3 mx-2 mx-sm-0 "
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <div className="d-flex justify-content-center align-items-center ">
            <i
              className="bi bi-arrow-left-circle-fill me-3 fs-3 "
              onClick={(e) => {
                navigate("/");
                dispatch(clearForm({}));
              }}
            ></i>
            <h2 className="text-center">
              {editingIndex !== null ? "Update " : "Create "}
              Your Own Product
            </h2>
          </div>
          <hr />
          <Row className="mb-3 gx-0 ">
            <Form.Group controlId="validationCustom01">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                required
                value={productName}
                onChange={(e) => {
                  dispatch(setProductName({ value: e.target.value }));
                }}
                type="text"
                name="productName"
                className="mb-2"
                placeholder="Product Name"
              />
              <Form.Control.Feedback className="mb-2">
                good choice!
              </Form.Control.Feedback>
              <Form.Control.Feedback className="mb-2" type="invalid">
                enter a valid name for your product
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="category">Category</Form.Label>
              <Form.Control
                value={category}
                onChange={(e) => {
                  dispatch(setCategory({ value: e.target.value }));
                }}
                required
                as="select"
                type="select"
                name="category"
              >
                <option value="">choose type of your product</option>
                <option value="finTech">Fin Tech</option>
                <option value="edTech">Ed Tech</option>
                <option value="itHub">IT Product</option>
                <Form.Control.Feedback className="mb-2" type="invalid">
                  please select a category
                </Form.Control.Feedback>
              </Form.Control>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(e) => {
                  dispatch(setDescription({ value: e.target.value }));
                }}
                style={{ height: "150px" }}
                as="textarea"
                required
                name="description"
                placeholder="Add brief and attractive description..."
                className="mb-1 py-1"
                rows={3}
              />
              <Form.Control.Feedback className="mb-1">
                greate description
              </Form.Control.Feedback>
              <Form.Control.Feedback className="mb-2" type="invalid">
                good description always improves user attraction
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Label>Expire Date</Form.Label>
            <Form.Control
              className="mb-1"
              value={expireDate}
              onChange={(e) => {
                dispatch(setExpireDate({ value: e.target.value }));
              }}
              required
              type="date"
              name="expireDate"
            />
            <Row className="mb-3 gx-1 ">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Cost Price (&#8377;)</Form.Label>
                <Form.Control
                  min={0}
                  value={costPrice}
                  onChange={(e) => {
                    dispatch(setCostPrice({ value: e.target.value }));
                  }}
                  required
                  type="number"
                  name="costPrice"
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Sell Price (&#8377;)</Form.Label>
                <Form.Control
                  min={0}
                  value={sellPrice}
                  onChange={(e) => {
                    dispatch(setSellPrice({ value: e.target.value }));
                  }}
                  required
                  type="number"
                  name="sellPrice"
                />
              </Form.Group>
            </Row>

            <Form.Group controlId="validationCustom01">
              <Form.Label>Discount Percentage (&#37;) </Form.Label>
              <Form.Control
                value={discount}
                onChange={(e) => {
                  dispatch(setDiscount({ value: e.target.value }));
                }}
                min={0}
                max={100}
                required
                type="number"
                name="discount"
              />
              <Form.Control.Feedback className="mb-2" type="invalid">
                allowed 0&#37; to 100&#37;
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {sellPrice && discount !== null ? (
            <Row className="text-center">
              <Col xs="12" lg="12" md="12" sm="12" className="mb-2">
                <u>
                  Final Price ( 18 &#37; GST included ) :-
                  <b>{sellPrice + (sellPrice * 18) / 100}</b> &#8377;
                </u>
              </Col>
              <Col xs="12" lg="12" md="12" sm="12" className="mb-2">
                <u>
                  Discounted Sell Price ( 18 &#37; GST included ) :-
                  <b>
                    {(
                      sellPrice +
                      (sellPrice * 18) / 100 -
                      ((sellPrice + (sellPrice * 18) / 100) * discount) / 100
                    ).toFixed(2)}
                  </b>{" "}
                  &#8377;
                </u>
              </Col>
            </Row>
          ) : null}

          <Button type="submit" className="d-block submit_btn">
            {editingIndex !== null ? "Update" : "Create"}
          </Button>
        </Form>
      </Col>
    </div>
  );
};

export default ProductForm;
