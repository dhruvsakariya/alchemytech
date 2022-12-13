import React, { useState, useEffect } from "react";

// Component
import NavbarComp from "../navbar/App";
import TableRow from "./Row";

// Bootstrap
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  clearDeleteProductList,
  productState,
  setShowCheckBox,
  setProductsMap,
} from "./reduxSlice";

// Css
import "./App.css";
import ModalPopup from "../modal/App";

const List = () => {
  const dispatch = useDispatch();

  const [maxWords, setMaxWords] = useState(100);

  const {
    products,
    showCheckBox,
    productsMap,
  } = useSelector(productState);

  let tCostP = 0;
  let tSellP = 0;
  let tFinalP = 0;
  let tDiscountedP = 0;

  useEffect(() => {
    const updateWindowDimensions = () => {
      if (window.innerWidth < 400) {
        setMaxWords(10);
      } else {
        setMaxWords(100);
      }
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  useEffect(() => {
    dispatch(setProductsMap({ value: products }));
  }, [products, dispatch]);

  let placement = "right";

  const NotFound = () => {
    if (productsMap.length <= 0) {
      return <div className="my-2 text-center w-100">No Product Found</div>;
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <NavbarComp />
      <div className="mx-sm-3">
        <div className=" justify-content-center">
          <div className="col-auto">
            <Table striped responsive>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Expire Date</th>
                  <th>Cost Price</th>
                  <th>Sell Price</th>
                  <th>Discount Price</th>
                  <th>Final Price</th>
                  <th>
                    Discounted <br /> Sell Price
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productsMap.map(
                  (
                    {
                      productName,
                      description,
                      category,
                      expireDate,
                      costPrice,
                      sellPrice,
                      discount,
                    },
                    index
                  ) => {
                    let finalPrice = sellPrice + (sellPrice * 18) / 100;
                    let discountedPrice =
                      sellPrice +
                      (sellPrice * 18) / 100 -
                      ((sellPrice + (sellPrice * 18) / 100) * discount) / 100;

                    tCostP = tCostP + costPrice;
                    tSellP = tSellP + sellPrice;
                    tFinalP = tFinalP + finalPrice;
                    tDiscountedP = tDiscountedP + discountedPrice;

                    return (
                      <TableRow
                        key={index}
                        index={index}
                        productName={productName}
                        description={description}
                        maxWords={maxWords}
                        category={category}
                        expireDate={expireDate}
                        costPrice={costPrice}
                        sellPrice={sellPrice}
                        discount={discount}
                        finalPrice={finalPrice}
                        discountedPrice={discountedPrice}
                        showCheckBox={showCheckBox}
                      />
                    );
                  }
                )}
                <tr>
                  {productsMap.length <= 0 ? null : (
                    <>
                      <td>
                        {showCheckBox ? (
                          <i
                            className="bi bi-x-circle-fill text-secondary "
                            onClick={() => {
                              dispatch(setShowCheckBox({ value: false }));
                              dispatch(clearDeleteProductList({}));
                            }}
                          ></i>
                        ) : null}{" "}
                      </td>
                      <td>
                        <OverlayTrigger
                          key={placement}
                          placement={placement}
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              Use only if you want to <b>delete</b> multiple
                              products
                            </Tooltip>
                          }
                        >
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                              if (showCheckBox) {
                                handleShow();
                              } else {
                                dispatch(setShowCheckBox({ value: true }));
                              }
                            }}
                          >
                            {showCheckBox ? "Delete All" : "Delete"}
                          </Button>
                        </OverlayTrigger>
                      </td>
                      <td className="col-md-4 col-2"></td>
                      <td></td>
                      <td></td>
                      <td className="text-center totalBox">
                        <span>{tCostP} &#8377;</span>
                      </td>
                      <td className="text-center totalBox">{tSellP} &#8377;</td>
                      <td></td>
                      <td className="text-center totalBox">
                        {" "}
                        {tFinalP.toFixed(2)} &#8377;
                      </td>
                      <td className="text-center totalBox">
                        {tDiscountedP.toFixed(2)} &#8377;
                      </td>
                      <td></td>
                    </>
                  )}
                </tr>
              </tbody>
            </Table>
            <NotFound />
          </div>
        </div>
      </div>
      <ModalPopup
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};

export default List;
