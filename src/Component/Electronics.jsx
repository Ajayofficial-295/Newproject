import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoCart } from "./Redux/Slicing";
import "./Electronics.css";

const Electronics = () => {
  const [data, setData] = useState([]);
  const [slicedata, setSliceData] = useState(8);
  const dispatch = useDispatch();

  const handleLoadMore = () => {
    setSliceData(slicedata + 4);
  };

  useEffect(() => {
    axios
      .get("https://ecommerce-backend-new.onrender.com/api/finddata")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err, "error"));
  }, []);

  return (
    <>
      <div className="electronics-maincontainer">
        <div className="electronics-sidediv">
          <NavLink className="navlink-names splnames" to="/mobile/iphone">Iphone</NavLink>
          <NavLink className="navlink-names splnames" to="/mobile/mimobiles">Mi mobiles</NavLink>
          <NavLink className="navlink-names splnames" to="/laptop/lenovolaptops">Lenovo</NavLink>
          <NavLink className="navlink-names splnames" to="/laptop/hplaptops">Hp</NavLink>
          <NavLink className="navlink-names splnames" to="/fashion/mensfashion">Mens</NavLink>
          <NavLink className="navlink-names splnames" to="/fashion/womensfashion">Womens</NavLink>
        </div>
        <div className="electronics-conatiner">
          {data.filter((item) => item.category === "electronics").slice(0, slicedata).map((item) => {
            const {
              id,
              image,
              price,
              model,
              quantity,
              RAM,
              ROM
            } = item; // Destructure the necessary properties
            return (
              <div key={id} className="electronics-child_conatinercard">
                <NavLink to={`/detailpage/${id}`} className="specialdivnavlink">
                  <div>
                    <p>{model}</p>
                    <div className="electronics-child_containercard-image">
                      <img src={image} alt="Not Found" />
                    </div>
                    <p>Price: {price}</p>
                    <h4>{RAM} {ROM}<br /></h4>
                  </div>
                </NavLink>
                <button className="electronics-commonbutton" onClick={() =>
                  dispatch(addtoCart({ id, image, price, quantity, model }))
                }>Buy Now</button>
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={handleLoadMore} className="laptop-loadmore">Load More</button>
    </>
  );
};

export default Electronics;