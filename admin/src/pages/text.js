// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../App";
// import { toast } from "react-toastify";

// const List = () => {
//   const [list, setList] = useState([]);

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(backendUrl + "/api/product/list");
//       if (response.data.status === "success") {
//         setList(response.data.products);
//         console.log(response.data.products);
//       } else {
//         toast.error(response.data.message);
//         console.log(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching list:", error);
//       toast.error(error.message);
//     }
//   };
//   useEffect(() => {
//     fetchList();
//   }, []);
//   return (
//     <>
//       <p className="mb-4"> All Product List</p>
//       <div className="flex flex-col gap-2 border-0">
//         <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-2 border-0 bg-gray-100 text-sm">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b className="text-center">Action</b>
//         </div>

//         {list.map((item, index) => (
//           <div key={index}>
//             <img src={item.image[0]} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>
//               {currency}
//               {item.price}
//             </p>
//             <p>X</p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default List;
