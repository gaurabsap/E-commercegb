import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const Contextapi = createContext();

export const ProductsData = ({ children }) => {
  const [filterdata, setFilterData] = useState([]);
  const [query, setQuery] = useState("best");
  const [datas, setDatas] = useState(null);
  console.log(query);
  console.log(datas);
  // console.log(filterdata);

  useEffect(() => {
    const CallApi = async () => {
      console.log(query);
      const resq = await axios.get(
        `http://127.0.0.1:5000/api/v1/search/products?search=${datas}&price=${query}`
      );
      //   console.log(resq);
      setFilterData(resq.data.search);
    };
    CallApi();
  }, [query, datas]);
  return (
    <Contextapi.Provider
      value={{
        filterdata,
        query,
        setQuery,
        setDatas,
      }}
    >
      {children}
    </Contextapi.Provider>
  );
};
