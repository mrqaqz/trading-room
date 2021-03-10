import React from "react";

const ProductList = () => {
  const [data, setData] = React.useState([]);

  //   const formatter = new Intl.NumberFormat("en-GB", {
  //     style: "currency",
  //     currency: "gbp",
  //   })

  React.useEffect(() => {
    let eventSource = new EventSource("/lead/stream-flux");
    eventSource.onmessage = (e) => {
      updateProdutList(e.data);
      console.log(e.data);
    };
  }, []);

  const updateProdutList = (product) => {
    setData([...product]);
  };

  return <div>{/* {ProductList} */}</div>;
};

export { ProductList };
