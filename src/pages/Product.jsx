import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import { createDataFunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useLocation } from "react-router-dom";

const Product = () => {
  const { modal } = useSelector((state) => state.modal);
  const { data } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const location = useLocation();

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "",
  });

  const onChangeFunc = (e, type) => {
    if (type == "url") {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  let loc = location?.search.split("=")[1];

  useEffect(() => {
    if (loc) {
      setProductInfo(data.find((dt) => dt.id == loc));
    }
  }, [loc]);

  console.log(location?.search.split("=")[1]);

  const buttonFunc = () => {
    dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }));
    dispatch(modalFunc());
  };

  const contentModal = (
    <>
      <Input
        value={productInfo.name}
        type={"text"}
        placeholder={"Add Product"}
        name={"name"}
        id={"name"}
        onChange={(e) => onChangeFunc(e, "name")}
      />
      <Input
        value={productInfo.price}
        type={"text"}
        placeholder={"Add Price"}
        name={"price"}
        id={"price"}
        onChange={(e) => onChangeFunc(e, "price")}
      />
      <Input
        type={"file"}
        placeholder={"Choose Image"}
        name={"url"}
        id={"url"}
        onChange={(e) => onChangeFunc(e, "url")}
      />
      <Button btnText={loc ? "Update" : "Create"} onClick={buttonFunc} />
    </>
  );
  console.log(data), "data";
  return (
    <div>
      <div className="flex items-center flex-wrap">
        {data?.map((dt, i) => (
          <ProductCard key={i} dt={dt} />
        ))}
      </div>

      {modal && (
        <Modal content={contentModal} title={loc ? "Update" : "Create"} />
      )}
    </div>
  );
};

export default Product;
