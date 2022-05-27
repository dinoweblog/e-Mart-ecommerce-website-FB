import "./Styles/Products.css";
import { Navbar } from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductsData } from "../Redux/Products/action";
import { ProductCard } from "./ProductCard";
import { Footer } from "./Footer";

export const WomenPage = () => {
  const dispatch = useDispatch();
  const [clearFilter, setClearFilter] = useState(false);
  const [filterHide, setfilterHide] = useState(false);
  const [sortVal, setSortVal] = useState("");
  const [filterCatVal, setFilterCatVal] = useState("");
  const [filterDisVal, setFilterDisVal] = useState();
  const [womenProduct, setWomenProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [isShowing, setShowing] = useState(true);
  const [sizeSelect, setSizeSelect] = useState(true);
  const [selectClass, setSelectClass] = useState(0);

  const { products, totalPages, loading } = useSelector(
    (state) => state.products
  );

  const [btn, setBtn] = useState(new Array(totalPages).fill("a"));

  useEffect(() => {
    document.title = "Women Products | e-mart shopping platform";
  }, []);

  useEffect(() => {
    dispatch(getProductsData(page, size));
  }, [page]);

  useEffect(() => {
    dispatch(getProductsData(page, size));
  }, []);

  useEffect(() => {
    setWomenProduct([...products]);
  }, [products, dispatch]);

  useEffect(() => {
    setBtn(new Array(totalPages).fill("btn"));
  }, [totalPages, dispatch]);

  const filterByCategory = (e) => {
    const type = e.target.value;
    setFilterCatVal(type);
    setClearFilter(true);
    setShowing(false);

    fetch(
      `https://emart-server.herokuapp.com/products/women/filter?category=${type}`
    )
      .then((res) => res.json())
      .then((res) => {
        setWomenProduct([...res.products]);
      })
      .catch((error) => console.log(error));
  };

  const filterByDiscount = (e) => {
    const type = e.target.value;
    setFilterDisVal(type);
    setClearFilter(true);
    setShowing(false);
    console.log(type);
    // const items = products.filter((el) => Number(el.off) >= type);

    fetch(
      `https://emart-server.herokuapp.com/products/women/filter?discount=${type}`
    )
      .then((res) => res.json())
      .then((res) => {
        setWomenProduct([...res.products]);
      })
      .catch((error) => console.log(error));
  };

  const SortByCost = (e) => {
    setSortVal(e.target.value);
    const t =
      e.target.value === "price_asc"
        ? products.sort((a, b) => {
            return a.newPrice - b.newPrice;
          })
        : products.sort((a, b) => {
            return b.newPrice - a.newPrice;
          });

    setSortVal("");
    setWomenProduct([...t]);
  };

  return (
    <div>
      <Navbar active_menu={"#ff3e6c"} />

      <div className="products_container">
        <div
          style={filterHide ? { left: "0px" } : {}}
          className="filter_section"
        >
          <div className="top_title">
            <p>FILTERS</p>
            <span
              onClick={() => {
                dispatch(getProductsData(page, size));
                setClearFilter(false);
                setFilterCatVal("");
                setFilterDisVal("");
                setShowing(true);
              }}
              className={!clearFilter ? "clear_btn" : ""}
            >
              CLEAR ALL
            </span>
            {filterHide ? (
              <button
                className="hide_btn"
                onClick={() => {
                  setfilterHide(!filterHide);
                }}
              >
                <i class="bx bx-x"></i>
              </button>
            ) : null}
          </div>
          <div className="filter_by">
            <div className="filter_types categories_container">
              <span className="filters_types_header">Categories</span>
              <ul className="filter_categories_list">
                <li>
                  <label className="common_customCheckbox filter_categories_label">
                    <input
                      type="checkbox"
                      value="western"
                      checked={filterCatVal === "western"}
                      onClick={filterByCategory}
                    />
                    Western Wear
                    <div className="common_checkboxIndicator"></div>
                  </label>
                </li>
                <li>
                  <label className="common_customCheckbox filter_categories_label">
                    <input
                      type="checkbox"
                      value="indian"
                      checked={filterCatVal === "indian"}
                      onClick={filterByCategory}
                    />
                    Indian Wear
                  </label>
                </li>
                <li>
                  <label className="common_customCheckbox filter_categories_label">
                    <input
                      type="checkbox"
                      value="sports"
                      checked={filterCatVal === "sports"}
                      onClick={filterByCategory}
                    />
                    Sports
                  </label>
                </li>
                <li>
                  <label className="common_customCheckbox filter_categories_label">
                    <input
                      type="checkbox"
                      value="maternity"
                      checked={filterCatVal === "maternity"}
                      onClick={filterByCategory}
                    />
                    Maternity
                  </label>
                </li>
              </ul>
            </div>
            <div className="filter_types discount_container">
              <span className="filters_types_header">Discount</span>
              <ul className="filter_discount_list">
                <li>
                  <label className="common_customCheckbox filter_discount_label">
                    <input
                      type="checkbox"
                      value={70}
                      checked={filterDisVal == 70}
                      onClick={filterByDiscount}
                    />
                    70% and above
                    <div className="common_checkboxIndicator"></div>
                  </label>
                </li>
                <li>
                  <label className="common_customCheckbox filter_discount_label">
                    <input
                      type="checkbox"
                      value={60}
                      checked={filterDisVal == 60}
                      onClick={filterByDiscount}
                    />
                    60% and above
                  </label>
                </li>
                <li>
                  <label className="common_customCheckbox filter_discount_label">
                    <input
                      type="checkbox"
                      value={50}
                      checked={filterDisVal == 50}
                      onClick={filterByDiscount}
                    />
                    50% and above
                  </label>
                </li>
                <li>
                  <label className="common_customCheckbox filter_discount_label">
                    <input
                      type="checkbox"
                      value={40}
                      checked={filterDisVal == 40}
                      onClick={filterByDiscount}
                    />
                    40% and above
                  </label>
                </li>
                <li>
                  <label className="common_customCheckbox filter_discount_label">
                    <input
                      type="checkbox"
                      value={30}
                      checked={filterDisVal == 30}
                      onClick={filterByDiscount}
                    />
                    30% and above
                  </label>
                </li>
                <li>
                  <label className="common_customCheckbox filter_discount_label">
                    <input
                      type="checkbox"
                      value={20}
                      checked={filterDisVal == 20}
                      onClick={filterByDiscount}
                    />
                    20% and above
                  </label>
                </li>
                <li>
                  <label className="common_customCheckbox filter_discount_label">
                    <input
                      type="checkbox"
                      value={10}
                      checked={filterDisVal == 10}
                      onClick={filterByDiscount}
                    />
                    10% and above
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="products_section">
          <div className="top_title">
            <div className="filter_toggle_btn">
              <button
                onClick={() => {
                  setfilterHide(!filterHide);
                }}
              >
                <i class="bx bx-filter-alt"></i> FILTER
              </button>
            </div>
            <div className="sort_by">
              <span>
                <i class="bx bx-sort-alt-2"></i>Sort by :{" "}
                <span>Recommended</span>
              </span>
              <ul className="sort_list">
                <li>
                  <label className="sort_label ">
                    <input
                      type="radio"
                      onChange={SortByCost}
                      checked={sortVal === "price_desc"}
                      value="price_desc"
                    />
                    Price: High to Low
                  </label>
                </li>
                <li>
                  <label className="sort_label ">
                    <input
                      type="radio"
                      onChange={SortByCost}
                      checked={sortVal === "price_asc"}
                      value="price_asc"
                    />
                    Price: Low to High
                  </label>
                </li>
                <li>
                  <label
                    className="sort_label"
                    onClick={() => {
                      dispatch(getProductsData());
                    }}
                  >
                    Show All Products
                  </label>
                </li>
              </ul>
            </div>
          </div>
          {loading ? (
            <div className="all_products loading_gif">
              <img
                src="https://flevix.com/wp-content/uploads/2020/01/Preloader.gif"
                alt=""
              />
            </div>
          ) : (
            <div className="all_products">
              {womenProduct.map((e) => (
                <ProductCard
                  key={e._id}
                  id={e._id}
                  imageURL={e.imageURL}
                  name={e.name}
                  oldPrice={e.oldPrice}
                  newPrice={e.newPrice}
                  off={e.off}
                  category={e.category}
                  color={e.color}
                  size={e.size}
                />
              ))}
            </div>
          )}

          {isShowing ? (
            <div className="pagination">
              {page === 1 ? (
                <button disabled>Prev</button>
              ) : (
                <button
                  onClick={() => {
                    setPage(page - 1);
                    setSelectClass(selectClass - 1);
                  }}
                >
                  Prev
                </button>
              )}

              {btn.map((e, index) => (
                <button
                  key={index}
                  className={` ${selectClass === index ? "active" : ""}`}
                  onClick={() => {
                    setSizeSelect(true);
                    setSelectClass(index);
                    setPage(index + 1);
                  }}
                >
                  {index + 1}
                </button>
              ))}
              {page === totalPages ? (
                <button disabled>Next</button>
              ) : (
                <button
                  onClick={() => {
                    setPage(page + 1);
                    setSelectClass(selectClass + 1);
                  }}
                >
                  Next
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};