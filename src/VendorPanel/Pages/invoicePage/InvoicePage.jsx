import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useLocation } from "react-router-dom";
import './InvoicePage.css';  

const InvoicePage = () => {
    const location = useLocation();
    const orderDetails = location.state.orderDetails;

    console.log(orderDetails, "orderDetails")

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="max-w-2xl mx-auto p-4 border">
            <button onClick={handlePrint} className="bg-blue-500 text-white p-2 rounded">
                Print Invoice
            </button>

            <InvoicePageContent ref={componentRef} orderDetails={orderDetails} />
        </div>
    )
}

const InvoicePageContent = React.forwardRef(({ orderDetails }, ref) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    console.log(orderDetails, "orderDetaildds")

    const { state } = orderDetails?.shippingInfo || {};
    const cgst = orderDetails?.cgst || 0;
    const sgst = orderDetails?.sgst || 0;
    const igst = orderDetails?.igst || 0;
    console.log(cgst, "cgst")
    return (
        <div ref={ref} className="a5-page">
            <div className="content">
                <h1 className="text-2xl font-bold mb-2">Invoice #{orderDetails._id}</h1>
                <div className="flex justify-between items-center mb-2">
                               <div >
                    <p className="font-semibold">{`Order #: ${orderDetails._id}`}</p>
                    {/* <p className="font-semibold">{`User: ${orderDetails.user.name}`}</p> */}
                    <p className="font-semibold">{`Date: ${new Date(orderDetails.createdAt).toLocaleDateString()}`}</p>
                </div>

                {/* <div>
                    <p className="font-semibold">Order Status</p>
                    <p>{orderDetails.status}</p>
                </div> */}
                </div>

                <div className='flex justify-between items-center mb-2 gap-4'>
                <div className="">
                    <h2 className="text-xl font-semibold mb-2">S2 For U</h2>
                   <p>**********@gmail.com</p>
                   <p>Issued On: 28 May 2024</p>
                   <p>Address: Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae velit, esse reprehenderit</p>
                </div>

                <div className="">
                    <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
                    <p>{orderDetails?.user?.mobileNo}</p>
                    <p>
  Issued On: {orderDetails && orderDetails.createdAt && new Date(orderDetails.createdAt).toLocaleDateString() }
</p>
                     <p> <span>Address:</span>{orderDetails.shippingInfo.address}, {orderDetails.shippingInfo.city}, {orderDetails.shippingInfo.state}, {orderDetails.shippingInfo.country}, {orderDetails.shippingInfo.pinCode}</p>
                </div>
                </div>
                

             

                <div className="mb-2">
                    <h2 className="text-xl font-semibold mb-2">Order Items</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Product</th>
                                {/* <th className="border border-gray-300 p-2">Price</th> */}
                                <th className="border border-gray-300 p-2">Quantity</th>
                                <th className="border border-gray-300 p-2">Total</th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* {orderDetails.orderItems.map((item) => (  
                               
                            ))} */}
                            <tr key={orderDetails?.product?._id}>
                                <td className="border border-gray-300 p-2 text-center">{orderDetails?.product?.name}</td>
                                {/* <td className="border border-gray-300 p-2 text-center">{formatCurrency(orderDetails?.product?.price)}</td> */}
                                <td className="border border-gray-300 p-2 text-center">{orderDetails?.quantity}</td>
                                <td className="border border-gray-300 p-2 text-center">{formatCurrency(orderDetails?.subtotal)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>



                <div className="mb-2">
                    <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Base Price</th>
                                {state === "Andhra Pradesh" || state === "andhra pradesh" ? (
            <>
              <th className="border border-gray-300 p-2">CGST</th>
              <th className="border border-gray-300 p-2">SGST</th>
            </>
          ) : (
            <th className="border border-gray-300 p-2">IGST</th>
          )}
                                <th className="border border-gray-300 p-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={orderDetails?.product?._id}>
                                <td className="border border-gray-300 p-2 text-center">{formatCurrency(orderDetails?.basePrice)}</td>
                            
                                {state === "Andhra Pradesh" || state === "andhra pradesh" ? (
            <>
              <td className="border border-gray-300 p-2 text-black text-center">
                {formatCurrency(cgst)}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {formatCurrency(sgst)}
              </td>
            </>
          ) : (
            <td className="border border-gray-300 p-2 text-center">
              {formatCurrency(igst)}
            </td>
          )}
                                <td className="border border-gray-300 p-2 text-center">{formatCurrency(orderDetails?.subtotal)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                    <p>Subtotal: {formatCurrency(orderDetails.subtotal)}</p>
                    <p>Tax: {formatCurrency(orderDetails.tax)}</p>
                    <p> CGST: </p>
                    <p> SGST: </p>
                    <p> IGST: </p>
                    <p>Shipping Charges: {formatCurrency(orderDetails.shippingCharges)}</p>
                    <p>Discount: {formatCurrency(orderDetails.discount)}</p>
                    <p>Total: {formatCurrency(orderDetails.total)}</p>
                </div> */}

             
            </div>
        </div>
    );
});

export default InvoicePage;






















// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { useLocation } from "react-router-dom";


// const InvoicePage = () => {
//     const location = useLocation();
//     const orderDetails = location.state.orderDetails;

//     console.log(orderDetails, "ordefdfdfdr")

//     const componentRef = useRef();

//     const handlePrint = useReactToPrint({
//         content: () => componentRef.current,
//     });

//     return (
//         <div className="max-w-2xl mx-auto mt-8 p-4 border">
//             <button onClick={handlePrint} className="bg-blue-500 text-white p-2 rounded">
//                 Print Invoice
//             </button>

//             <InvoicePageContent ref={componentRef} orderDetails={orderDetails} />
//         </div>
//     )
// }

// const InvoicePageContent = React.forwardRef(({ orderDetails }, ref) => {
//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//         }).format(amount);
//     };
//     return (
//         <div ref={ref}>
//             <div className="max-w-2xl mx-auto mt-8 p-4 border">
//                 <h1 className="text-2xl font-bold mb-4">Invoice #{orderDetails._id}</h1>
//                 <div className="mb-4">
//                     <p className="font-semibold">{`Order #: ${orderDetails._id}`}</p>
//                     {/* <p className="font-semibold">{`User: ${orderDetails.user.name}`}</p> */}
//                     <p className="font-semibold">{`Date: ${new Date(orderDetails.createdAt).toLocaleDateString()}`}</p>
//                 </div>
//                 <div className="mb-4">
//                     <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
//                     <p>{orderDetails.shippingInfo.address}, {orderDetails.shippingInfo.city}, {orderDetails.shippingInfo.state}, {orderDetails.shippingInfo.country}, {orderDetails.shippingInfo.pinCode}</p>
//                 </div>

//                 <div className="mb-4">
//                     <h2 className="text-xl font-semibold mb-2">Order Status</h2>
//                     <p>{orderDetails.status}</p>
//                 </div>

//                 <div className="mb-4">
//                     <h2 className="text-xl font-semibold mb-2">Order Items</h2>
//                     <table className="w-full border-collapse border border-gray-300">
//                         <thead>
//                             <tr>
//                                 <th className="border border-gray-300 p-2">Product</th>
//                                 <th className="border border-gray-300 p-2">Quantity</th>
//                                 <th className="border border-gray-300 p-2">Price</th>
//                                 <th className="border border-gray-300 p-2">Total</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* {orderDetails.orderItems.map((item) => (  
                               
//                             ))} */}
//                             <tr key={orderDetails?.product?._id}>
//                                 <td className="border border-gray-300 p-2">{orderDetails?.product?.name}</td>
//                                 <td className="border border-gray-300 p-2">{orderDetails?.quantity}</td>
//                                 <td className="border border-gray-300 p-2">{(orderDetails?.product?.price)}</td>
//                                 <td className="border border-gray-300 p-2">{formatCurrency(orderDetails?.quantity * orderDetails?.product?.price)}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className="mb-4">
//                     <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
//                     <p>Subtotal: {formatCurrency(orderDetails.subtotal)}</p>
//                     <p>Tax: {formatCurrency(orderDetails.tax)}</p>
//                     <p>Shipping Charges: {formatCurrency(orderDetails.shippingCharges)}</p>
//                     <p>Discount: {formatCurrency(orderDetails.discount)}</p>
//                     <p>Total: {formatCurrency(orderDetails.total)}</p>
//                 </div>

//                 <div className="mb-4">
//                     <h2 className="text-xl font-semibold mb-2">Order Date</h2>
//                     <p>{new Date(orderDetails.createdAt).toLocaleDateString()}</p>
//                 </div>
//             </div>

//         </div>
//     );
// });



// export default InvoicePage