import React from "react";

export default function ProductDescription(props) {
  const { product } = props;

  return (
    <ol>
      <li>Product name:--- {product.name}</li>
      <li>Product category:--- {product.category}</li>
      <li>Product origin:--- {product.origin}</li>
      <li>Product description:--- {product.description}</li>
      <li>Product unitPrice:--- {product.unitPrice}</li>
      <li>Product certification:--- {product.certification}</li>
      <li>Product dateAvailable:--- {product.dateAvailable}</li>
      <li>Product dateExpired:--- {product.dateExpired}</li>
      <li>Product dateProduced:--- {product.dateProduced}</li>
      <li>Product datePublished:--- {product.datePublished}</li>
      <li>Product weight:-- {product.weight}</li>
      <li>Product approved:--- {product.approved.toString()}</li>
      <li>Product category:--- {product.category}</li>
    </ol>
  );
}
