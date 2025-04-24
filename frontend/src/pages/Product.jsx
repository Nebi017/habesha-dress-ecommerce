// import star_icon from '../assets/star_icon.png';
// import star_dull_icon from '../assets/star_dull_icon.png';
// import React, { useEffect, useContext, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import RelatedProducts from '../components/RelatedProducts';
// import line from '../assets/line.jpg';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(null);
//   const [selectedImage, setSelectedImage] = useState('');
//   const [selectedMeasurements, setSelectedMeasurements] = useState({});
//   const navigate = useNavigate();

//   const measurementFields = [
//     { id: "Shoulder", label : "A (Shoulder)" },
//     { id: "Chest", label : "B (Chest)" },
//     { id: "Waist", label : "C (Waist)" },
//     { id: "Hip", label : "D (Hip)" },
//     { id: "Length", label : "E (Length)" },
//     { id: "Sleeve", label : "F (Sleeve)" },
//     { id: "Neck", label : "G (Neck)" },
//     { id: "Cuff", label : "H (Cuff)" },
//   ];

//   useEffect(() => {
//     if (!productId) {
//       console.log("🚨 No productId found in URL!");
//       return;
//     }

//     console.log("🔥 Component Rendered! productId:", productId);
//     console.log("🛒 Products from Context:", products);

//     const foundProduct = products.find((item) => item._id?.toString() === productId);

//     if (foundProduct) {
//       setProductData(foundProduct);
//       setSelectedImage(foundProduct.image?.[0] || '');
//       console.log("✅ Found Product:", foundProduct);
//     } else {
//       console.log("❌ No product found with ID:", productId);
//       navigate('/'); // Redirect to home if product not found
//     }
//   }, [productId, products, navigate]);

//   const handleMeasurementChange = (field, value) => {
//     setSelectedMeasurements(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   return productData ? (
//     <div className="container mx-auto px-4 py-10 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
//       <div className="flex flex-col md:flex-row gap-5">

//         {/* Left Side: Thumbnail Images */}
//         <div className="flex flex-col gap-4">
//           {productData.image?.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all
//                 ${selectedImage === img ? "border-blue-500" : "border-gray-300"} hover:scale-110`}
//               onClick={() => setSelectedImage(img)}
//               alt={`Product Thumbnail ${index}`}
//             />
//           ))}
//         </div>

//         {/* Center: Main Product Image */}
//         <div className="flex-1 flex justify-start">
//           <img
//             src={selectedImage}
//             className="max-w-[400px] w-full h-130 object-contain rounded-lg shadow-lg"
//             alt="Selected Product"
//           />
//         </div>

//         {/* Right Side: Product Info */}
//         <div className="flex-1">
//           <h1 className="font-medium text-3xl">{productData.name}</h1>

//           {/* Rating Section */}
//           <div className="flex items-center gap-1 mt-2">
//             {[...Array(4)].map((_, index) => (
//               <img key={index} src={star_icon} className="w-4" alt="star icon" />
//             ))}
//             <img src={star_dull_icon} className="w-4" alt="star dull icon" />
//             <p className="pl-2">(122)</p>
//           </div>

//           {/* Price Section */}
//           <p className="mt-4 text-2xl font-medium">{currency}{productData.price}</p>

//           {/* Description */}
//           <p className="mt-4 text-gray-500">{productData.description}</p>

//           {/* Measurement Selection */}
//           <p className="mt-5 font-medium">Enter Measurements (in cm)</p>
//           <div className="grid grid-cols-2 gap-4 mt-3">
//             {measurementFields.map((field) => (
//               <div key={field.id} className="flex flex-col">
//                 <label className="text-sm text-gray-600 mb-1">{field.label}</label>
//                 <input
//                   type="number"
//                   min="0"
//                   step="0.1"
//                   className="border py-2 px-3 text-sm"
//                   value={selectedMeasurements[field.id] || ''}
//                   onChange={(e) => handleMeasurementChange(field.id, e.target.value)}
//                   placeholder={`Enter ${field.label}`}
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Add to Cart Button */}
//           <button
//             onClick={() => addToCart(productData._id, selectedMeasurements)}
//             className="bg-black text-white px-6 py-2 mt-6 text-sm active:bg-gray-700"
//           >
//             ADD TO CART
//           </button>

//           {/* Divider & Extra Info */}
//           <hr className="mt-8 w-4/5" />
//           <div className="text-sm text-gray-500 mt-5">
//             <p> 100% Original products.</p>
//             <p> Cash on delivery available.</p>
//             <p> Easy return and exchange policy (7 days).</p>
//           </div>
//         </div>
//       </div>

//       {/* Product Description and Reviews */}
//       <div className='mt-20'>
//         <div className='flex'>
//           <b className='border px-5 py-3 text-sm'>Description</b>
//           <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
//         </div>
//         <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
//           <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
//           <p>E-commerce websites typically display products or services along with detailed descriptions.</p>
//         </div>

//         {/* Line Image below the description */}

//       </div>
//        <div className="mt-4">
//           <img className='w-full' src={line} alt="Line" />
//         </div>

//       {/* Related Products */}
//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   ) : (
//     <div className="text-center text-gray-500 py-10">Loading...</div>
//   );
// };

// export default Product;

import star_icon from "../assets/star_icon.png";
import star_dull_icon from "../assets/star_dull_icon.png";
import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import line from "../assets/line.jpg";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedMeasurements, setSelectedMeasurements] = useState({});
  const [groupSize, setGroupSize] = useState(1);
  const navigate = useNavigate();

  const measurementFields = [
    { id: "Shoulder", label: "A (Shoulder)" },
    { id: "Chest", label: "B (Chest)" },
    { id: "Waist", label: "C (Waist)" },
    { id: "Hip", label: "D (Hip)" },
    { id: "Length", label: "E (Length)" },
    { id: "Sleeve", label: "F (Sleeve)" },
    { id: "Neck", label: "G (Neck)" },
    { id: "Cuff", label: "H (Cuff)" },
  ];

  useEffect(() => {
    if (!productId) {
      console.log("🚨 No productId found in URL!");
      return;
    }

    const foundProduct = products.find(
      (item) => item._id?.toString() === productId
    );

    if (foundProduct) {
      setProductData(foundProduct);
      setSelectedImage(foundProduct.image?.[0] || "");
    } else {
      console.log("❌ No product found with ID:", productId);
      navigate("/");
    }
  }, [productId, products, navigate]);

  

  const handleMeasurementChange = (personIndex, field, value) => {
    const isGroupOrCouple =
      productData.category === "GroupMatchingSets" ||
      productData.category === "Couples";

    if (isGroupOrCouple) {
      // For Groups/Couples: { 0: { Shoulder: "10" }, 1: { Shoulder: "20" } }
      setSelectedMeasurements((prev) => ({
        ...prev,
        [personIndex]: {
          ...prev[personIndex],
          [field]: value,
        },
      }));
    } else {
      // For single items: { Shoulder: "10", Chest: "20" }
      setSelectedMeasurements((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };
  const renderMeasurementInputs = () => {
    if (productData.category === "GroupMatchingSets") {
      return (
        <>
          <label className="block mt-6 font-medium">
            Number of people in the group:
            <input
              type="number"
              min="1"
              value={groupSize}
              onChange={(e) => {
                const value = Math.max(1, parseInt(e.target.value) || 1);
                setGroupSize(value);
              }}
              className="ml-3 border px-3 py-1 w-16"
            />
          </label>

          {[...Array(groupSize)].map((_, index) => (
            <div key={index} className="mt-6 border p-4 rounded">
              <h3 className="font-medium mb-2">Person {index + 1}</h3>

              {/* Gender Selection */}
              <div className="mb-4">
                <label className="text-sm text-gray-600 mr-2">Gender:</label>
                <select
                  value={selectedMeasurements[index]?.gender || ""}
                  onChange={(e) =>
                    handleMeasurementChange(index, "gender", e.target.value)
                  }
                  className="border py-2 px-3 text-sm"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {measurementFields.map((field) => (
                  <div key={field.id} className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className="border py-2 px-3 text-sm"
                      value={selectedMeasurements[index]?.[field.id] || ""}
                      onChange={(e) =>
                        handleMeasurementChange(index, field.id, e.target.value)
                      }
                      placeholder={`Enter ${field.label}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      );
    } else {
      return (
        <>
          <p className="mt-5 font-medium">Enter Measurements (in cm)</p>
          <div className="grid grid-cols-2 gap-4 mt-3">
            {measurementFields.map((field) => (
              <div key={field.id} className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  {field.label}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  className="border py-2 px-3 text-sm"
                  value={selectedMeasurements[field.id] || ""}
                  onChange={(e) =>
                    handleMeasurementChange(null, field.id, e.target.value)
                  }
                  placeholder={`Enter ${field.label}`}
                />
              </div>
            ))}
          </div>
        </>
      );
    }
  };

  return productData ? (
    <div className="container mx-auto px-4 py-10 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Left Side: Thumbnail Images */}
        <div className="flex flex-col gap-4">
          {productData.image?.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all 
                ${
                  selectedImage === img ? "border-blue-500" : "border-gray-300"
                } hover:scale-110`}
              onClick={() => setSelectedImage(img)}
              alt={`Product Thumbnail ${index}`}
            />
          ))}
        </div>

        {/* Center: Main Product Image */}
        <div className="flex-1 flex justify-start">
          <img
            src={selectedImage}
            className="max-w-[400px] w-full h-130 object-contain rounded-lg shadow-lg"
            alt="Selected Product"
          />
        </div>

        {/* Right Side: Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-3xl">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, index) => (
              <img
                key={index}
                src={star_icon}
                className="w-4"
                alt="star icon"
              />
            ))}
            <img src={star_dull_icon} className="w-4" alt="star dull icon" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-4 text-2xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-4 text-gray-500">{productData.description}</p>
          {/* Dynamic Measurement Fields */}
          {renderMeasurementInputs()}

          <button
            onClick={() => addToCart(productData._id, selectedMeasurements)}
            className="bg-black text-white px-6 py-2 mt-6 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 w-4/5" />
          <div className="text-sm text-gray-500 mt-5">
            <p> 100% Original products.</p>
            <p> Cash on delivery available.</p>
            <p> Easy return and exchange policy (7 days).</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <img className="w-full" src={line} alt="Line" />
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="text-center text-gray-500 py-10">Loading...</div>
  );
};

export default Product;


