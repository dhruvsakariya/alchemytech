import React from "react";

// Css
import "./App.css";

// Bootstrap
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategory,
  productState,
  setProductsMap,
  setSearchQuery,
  setSortType,
} from "../tabel/reduxSlice";

// Router
import { Link } from "react-router-dom";

const NavbarComp = () => {
  const dispatch = useDispatch();
  const { searchQuery, products, productsMap } = useSelector(productState);

  const filterHandler = (category) => {
    dispatch(filterByCategory({ value: category }));
    if (category !== "all") {
      dispatch(
        setProductsMap({
          value: products.filter((product) => product.category === category),
        })
      );
    } else {
      dispatch(setProductsMap({ value: products }));
    }
  };

  let categories = [
    { display: "All", category: "all" },
    { display: "Fin Tech", category: "finTech" },
    { display: "Ed Tech", category: "edTech" },
    { display: "IT Product", category: "itHub" },
  ];

  let sortByPrice = [
    { display: "High to Low", sortType: 1 },
    { display: "Low to High", sortType: 2 },
    { display: "by Near ExpireDate", sortType: 3 },
    { display: "by Far ExpireDate", sortType: 4 },
  ];

  const sortByPricefn = (sortType) => {
    let sorted;
    switch (sortType) {
      case 1: // High to Low
        sorted = productsMap.slice().sort((a, b) => {
          return b.sellPrice - a.sellPrice;
        });

        dispatch(setProductsMap({ value: sorted }));

        break;
      case 2: // Low to High
        sorted = productsMap.slice().sort((a, b) => {
          return a.sellPrice - b.sellPrice;
        });

        dispatch(setProductsMap({ value: sorted }));

        break;
      case 4: // ExpireDate Near
        sorted = productsMap.slice().sort((a, b) => {
          return new Date(b.expireDate) - new Date(a.expireDate);
        });

        dispatch(setProductsMap({ value: sorted }));

        break;
      case 3: // ExpireDate Far
        sorted = productsMap.slice().sort((a, b) => {
          return new Date(a.expireDate) - new Date(b.expireDate);
        });

        dispatch(setProductsMap({ value: sorted }));

        break;

      default:
        break;
    }
  };

  let expand = "md";
  return (
    <Navbar key={expand} bg="light" expand={expand} className="mb-3">
      <Container fluid>
        <Navbar.Brand href="https://www.alchemytech.ca/">
          <img
            alt=""
            src="https://uploads-ssl.webflow.com/6347a7fef870e54206e66927/634941c823c7544d19d085d5_Logo.svg"
            className="d-inline-block align-top brand_logo "
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link
                href="/create"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to={"/create"}
                >
                  Add Product
                </Link>
              </Nav.Link>
              <NavDropdown
                title="Sort "
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                {sortByPrice.map(({ sortType, display }, index) => {
                  return (
                    <NavDropdown.Item
                      key={index}
                      onClick={() => {
                        dispatch(setSortType({ value: sortType }));
                        sortByPricefn(sortType);
                      }}
                    >
                      {display}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <NavDropdown
                title="Filter "
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                {categories.map(({ category, display }, index) => {
                  return (
                    <NavDropdown.Item
                      key={index}
                      onClick={() => {
                        filterHandler(category);
                      }}
                    >
                      {display}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            </Nav>
            <Form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Form.Control
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  dispatch(setSearchQuery({ value: e.target.value }));

                  if (e.target.value === "") {
                    dispatch(setProductsMap({ value: products }));
                    return;
                  }

                  const search = e.target.value;

                  let res = productsMap.filter((obj) =>
                    JSON.stringify(obj)
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  );

                  console.log(res);

                  dispatch(setProductsMap({ value: res }));
                }}
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button className="d-flex d-md-none" variant="outline-success">
                Search
              </Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
