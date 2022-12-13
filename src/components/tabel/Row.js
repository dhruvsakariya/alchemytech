import React from "react";

// Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

// Router
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import {
  addDeleteProductList,
  removeDeleteProductList,
  removeProductToList,
} from "./reduxSlice";
import { setEditingIndex } from "../form/reduxSlice";

// Css
import "./App.css";

const TableRow = ({
  index,
  productName,
  description,
  maxWords,
  category,
  expireDate,
  costPrice,
  sellPrice,
  discount,
  finalPrice,
  discountedPrice,
  showCheckBox,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteProductHandler = (index) => {
    dispatch(removeProductToList({ index }));
  };

  const editProductHandler = (index) => {
    dispatch(setEditingIndex({ index }));
    navigate("/create");
  };
  return (
    <tr>
      <td>
        {showCheckBox ? (
          <Form.Check
            className="selectForDelete"
            type={"checkbox"}
            onChange={(e) => {
              if (e.target.checked) {
                  dispatch(addDeleteProductList({ index }));
                } else {
                  dispatch(removeDeleteProductList({ index }));
              }
            }}
          />
        ) : (
          index + 1
        )}
      </td>
      <td>{productName}</td>
      <td className="col-md-4 col-2">
        {description.length > maxWords
          ? description.slice(0, maxWords) + "..."
          : description}
      </td>
      <td>{category}</td>
      <td>{expireDate}</td>
      <td className="text-center">{costPrice}</td>
      <td className="text-center">{sellPrice}</td>
      <td className="text-center">{discount} &#37; </td>
      <td className="text-center">{finalPrice.toFixed(2)} &#8377;</td>
      <td className="text-center">{discountedPrice.toFixed(2)} &#8377;</td>
      <td>
        <Dropdown>
          <Dropdown.Toggle
            variant="none"
            className="border-0"
            id="dropdown-basic"
          >
            <i className="bi bi-three-dots-vertical"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={(e) => {
                e.preventDefault();
                editProductHandler(index);
              }}
            >
              <i className="bi bi-pencil-square me-2"></i> Edit
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                e.preventDefault();
                deleteProductHandler(index);
              }}
              className="text-danger"
            >
              <i className="bi bi-trash3-fill me-2"></i> Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
};

export default TableRow;
