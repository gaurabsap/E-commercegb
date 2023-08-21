import React from "react";

const CartComponent = ({ data }) => {
  console.log(data);
  return (
    <>
      {data &&
        data.map((dat, i) => {
          const { title, desc, image, rating, price, _id } = dat;
          return <h1></h1>;
        })}
    </>
  );
};

export default CartComponent;
