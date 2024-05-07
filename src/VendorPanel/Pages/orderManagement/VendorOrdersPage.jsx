import {
    Box,
    Card,
    CircularProgress,
    Grid,
    IconButton,
    LinearProgress,
    Tooltip,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { ReactElement, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { FaArrowDown, FaCartArrowDown } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { FcProcess } from "react-icons/fc";
import Sidebar from "../../Components/sidebar/Siderbar";
import AdminNavbar from "../../Components/navbar/VendorNavbar";
import { useAxios } from "../../../utils/axios";
import { tableStyles } from "../../Components/vendor/shared/ConfirmDialog";
import ConfirmBox from "../../Components/vendor/shared/ConfirmDialog";
import { AiOutlineSearch } from "react-icons/ai";



export const Button = ({
    name,
    Icon,
    Color,
}) => {
    return (
        <div
            className={
                Color +
                " bg-white font-bold w-full rounded-sm shadow-sm flex space-x-1 items-center justify-center px-4 p-1 max-w-max border border-[#DEDEDE]"
            }
        >
            <div className="text-xs">{<Icon />}</div>
            <div>
                <p className=" text-[10px]">{name}</p>
            </div>
        </div>
    );
};

const userTypes = ["All", "Premium"];

// give main area a max widht
const VendorOrdersPage = () => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [processLoading, setProcessLoading] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [token, setToken] = useState("");
    const [cookies, setCookies] = useCookies(["vendorToken"]);
    const [allOrders, setAllOrders] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [processLoadingState, setProcessLoadingState] = useState({});
    const [vendorId, setVendorId] = useState('');



    const instance = useAxios(token);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState(
        null
    );
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 50,
    });
    const [name, setName] = useState("");
    const [selected, setSelected] = useState("All");
    // const router = useRouter();
    const navigate = useNavigate();


    if (allProducts) {
        console.log(allProducts, "jsdahfaksdjhf")
    }


    const getOrdersByVendorId = async () => {
        try {
            setLoading(true)
            const res = await instance.get(`/vendor/getOrderByVendorId/${vendorId}`)
            if (res.data) {
                setLoading(false)
                setAllOrders(res.data.orders)
            }


        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }
    // const getProductsByAdmin = async () => {
    //     try {
    //         setLoading(true)
    //         const res = await instance.get("/admin/products")
    //         if (res.data) {
    //             setLoading(false)
    //             setAllProducts(res.data.products)
    //         }


    //     } catch (error) {
    //         setLoading(false)
    //         console.log(error);
    //     }
    // }

    const getVendorDetails = async () => {
        console.log(token, "tokeeen")
        try {
            const res = await instance.get(
                `/vendor/getVendorIdByToken`
            );
            if (res.data) {
                console.log(res.data.id, "yuyiyui")
                setVendorId(res.data.id)
            }
        } catch (e) {
            setLoading(false);
            console.log(e)
            // ErrorDispaly(e);
        }
    }


    useEffect(() => {
        if (token) {
            getVendorDetails()
        }
    }, [token])


    useEffect(() => {
        if (vendorId) {
            getOrdersByVendorId()
        }
    }, [vendorId])


    useEffect(() => {
        if (cookies && cookies.vendorToken) {
            console.log(cookies.vendorToken, "fdsfsdfsf")
            setToken(cookies.vendorToken);
        }
    }, [cookies]);

    // async function deleteOrder() {
    //     try {
    //         setDeleteLoading(true);
    //         const res = await instance.delete("/order/" + deleteId);
    //         if (res.data) {
    //             toast.success("Order Deleted Successfully");
    //             setDeleteLoading(false);
    //             setDeleteOpen(false);
    //             getOrdersByAdmin();
    //             // getAllUsers();
    //         }
    //     } catch (e) {
    //         setDeleteLoading(false);
    //         // ErrorDispaly(e);
    //     }
    // }

    // Process Order

    // const processOrder = async (processId) => {

    //     try {
    //         setProcessLoading(true);
    //         const res = await instance.put("/order/" + processId);
    //         if (res.data) {
    //             toast.success("Order Processed Successfully");
    //             setProcessLoading(false);
    //             setDeleteOpen(false);
    //             getOrdersByAdmin();
    //             // getAllUsers();
    //         }
    //     } catch (e) {
    //         setProcessLoading(false);
    //         // ErrorDispaly(e);
    //     }



    // }

    // const processOrder = async (processId) => {
    //     try {
    //         // Set loading state to true for the specific order
    //         setProcessLoadingState((prev) => ({ ...prev, [processId]: true }));

    //         const res = await instance.put("/order/" + processId);

    //         if (res.data) {
    //             toast.success("Order Processed Successfully");

    //             // Clear loading state for the specific order
    //             setProcessLoadingState((prev) => ({ ...prev, [processId]: false }));
    //             setDeleteOpen(false);
    //             getOrdersByAdmin();
    //         }
    //     } catch (e) {
    //         // Handle errors here
    //         console.error(e);

    //         // Clear loading state for the specific order on error
    //         setProcessLoadingState((prev) => ({ ...prev, [processId]: false }));
    //     }
    // };



    const all_customer_columns = [
        {
            flex: 0.25,
            minWidth: 150,

            field: "name",
            headerName: "Customer Name",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <Typography variant="body1" fontWeight={500}>
                    {row?.user?.name}
                </Typography>
            ),
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "createdAt",
            headerName: "Order Date",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true, renderCell: ({ row }) => (
                <Typography variant="body1" fontWeight={500}>
                    {new Date(row?.createdAt).toLocaleDateString('en-GB')}
                </Typography>
            ),
        },
        // {
        //     minWidth: 150,

        //     flex: 0.25,
        //     field: "Order Type",
        //     headerName: "Order Type",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        // },
        // {
        //     minWidth: 150,

        //     flex: 0.25,
        //     field: "_id",
        //     headerName: "Order Id",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        // },
        {
            minWidth: 150,

            flex: 0.25,
            field: "subtotal",
            headerName: "Subtotal",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "tax",
            headerName: "Tax",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },

        {
            minWidth: 120,

            field: "discount",
            headerName: "Discount",
            flex: 0.2,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 120,

            field: "shippingCharges",
            headerName: "Shipping Charges",
            flex: 0.2,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "total",
            headerName: "Order Total",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        // {
        //     minWidth: 120,

        //     field: "paymentInfo.status",
        //     headerName: "Payment Status",
        //     flex: 0.2,
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        //     valueGetter: (params) => params.row.paymentInfo.status,
        // },
        {
            minWidth: 120,

            field: "status",
            headerName: "Order Status",
            flex: 0.2,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        // {
        //     minWidth: 150,

        //     field: "action",
        //     headerName: "ACTION",
        //     flex: 0.15,
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        //     renderCell: ({ row }) => (
        //         <Box>
        //             <Tooltip title="Process">
        //                 <IconButton
        //                     onClick={() => processOrder(row._id)}
        //                     color="primary"
        //                 >
        //                     {processLoadingState[row._id] ? <CircularProgress size={24} /> : <FcProcess />}
        //                 </IconButton>
        //             </Tooltip>
        //             <Tooltip title="Delete">
        //                 <IconButton
        //                     onClick={() => {
        //                         setDeleteId(row?._id);
        //                         setDeleteOpen(true);
        //                     }}
        //                     color="error"
        //                 >
        //                     <MdDeleteForever />
        //                 </IconButton>
        //             </Tooltip>
        //         </Box>
        //     ),
        // },
    ];

    return (
        <div>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    {/* <main> */}
                    {loading ? <div className="flex items-center justify-center text-3xl h-full">
                        <CircularProgress className="text-3xl" />
                    </div> : <div className='bg-gray-50'>
                        <AdminNavbar />
                        <div className="flex justify-between items-center mt-8 mb-6">
                            <div className=" text-sm px-3">
                                {/* <button
                                    // onClick={() => router.push("/admin/customers/add")}
                                    className=" px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
                                > */}
                                {/* <span> */}
                                {/* <TbEdit /> */}
                                {/* </span> */}
                                {/* <span>Order Summary</span> */}
                                {/* <OrderDetailsModal
                                        buttonText="Order Summary"
                                        modalTitle="Order Details"

                                    /> */}
                                {/* </button> */}
                            </div>
                            <div className=" text-sm px-3">
                                {/* <button
                                    // onClick={() => router.push("/admin/customers/add")}
                                    className=" px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
                                >
                                    <span>
                                        <TbEdit />
                                    </span> */}
                                {/* <span>Create New Order</span> */}
                                {/* <OrderModal
                                        buttonText="Create New Order"
                                        modalTitle="Create New Order"
                                        // onSubmit={projectSubmit}
                                        products={allProducts}
                                    /> */}
                                {/* </button> */}
                            </div>
                        </div>

                        {/* <div className="flex md:justify-between md:items-center md:flex-row flex-col justify-center items-center mt-8 mb-6 gap-3 px-3">
                            <div className="basis-[35%] p-4 rounded-2xl bg-white ">
                                <div className="flex justify-between items-center">
                                    <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                        <FaCartArrowDown />
                                    </div>
                                    <button className="flex justify-between items-center gap-3 text-gray-400">
                                        This week <FaArrowDown />
                                    </button>
                                </div>
                                <div className="mt-8 flex items-center justify-start gap-20 w-full">
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            All Orders
                                        </p>
                                        <p className="text-xl font-bold">
                                            960
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Pending
                                        </p>
                                        <p className="text-xl font-bold">
                                            407
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Completed
                                        </p>
                                        <p className="text-xl font-bold">
                                            103
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <div className="basis-[35%] p-4 rounded-2xl bg-white ">
                                <div className="flex justify-between items-center">
                                    <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                        <FaCartArrowDown />
                                    </div>
                                    <button className="flex justify-between items-center gap-3 text-gray-400">
                                        This week <FaArrowDown />
                                    </button>
                                </div>
                                <div className="mt-8 flex items-center justify-start gap-20 w-full">
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            All Orders
                                        </p>
                                        <p className="text-xl font-bold">
                                            960
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Pending
                                        </p>
                                        <p className="text-xl font-bold">
                                            407
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Completed
                                        </p>
                                        <p className="text-xl font-bold">
                                            103
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <div className="basis-[25%]  p-4 rounded-2xl bg-white ">
                                <div className="flex justify-between items-center">
                                    <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                        <FaCartArrowDown />
                                    </div>
                                    <button className="flex justify-between items-center gap-3 text-gray-400">
                                        This week <FaArrowDown />
                                    </button>
                                </div>
                                <div className="mt-8 flex items-center justify-start gap-20 w-full">
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Abandoned Cart
                                        </p>
                                        <p className="text-xl font-bold">
                                            09% <span className="text-green-400 text-sm">+0.005%</span>
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Customers
                                        </p>
                                        <p className="text-xl font-bold">
                                            45
                                        </p>
                                    </div>


                                </div>

                            </div>
                        </div> */}

                        {/* <div className="flex justify-between items-center mb-8 px-4">
                            <div className="space-x-5">
                                <p className="text-2xl ">Customer Orders</p>
                            </div>

                           
                        </div> */}
                        {/* dashboard caerd */}

                        <div className="flex justify-between items-center mb-8  px-10">
                            <div className="space-x-5">
                                <p className="text-2xl ">Orders </p>
                            </div>


                            <div className="flex space-x-[12px]">
                                <div className="flex items-center bg-white p-2 rounded-lg space-x-3">
                                    <AiOutlineSearch className="text-xl" />
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        // value={searchQuery}
                                        // onChange={handleSearchQueryChange}
                                        placeholder="search"
                                        className="outline-none"
                                    />
                                </div>
                            </div>
                        </div>


                        <Grid container spacing={6} sx={{ pb: 38, px: 4 }}>
                            <Grid item xs={12}>
                                <Card sx={{ borderRadius: 2 }}>
                                    <DataGrid
                                        rows={allOrders || []}
                                        columns={all_customer_columns}
                                        getRowId={(row) => row._id}
                                        autoHeight
                                        components={{
                                            LoadingOverlay: LinearProgress,
                                        }}
                                        loading={loading}
                                        getRowHeight={() => "auto"}

                                        pagination
                                        paginationModel={paginationModel}
                                        pageSizeOptions={[25, 50, 75, 100]}
                                        rowCount={pagination?.totalUsers}
                                        paginationMode="server"
                                        onPaginationModelChange={setPaginationModel}


                                        // pagination
                                        // rowsPerPageOptions={[5, 10, 25]}
                                        // rowCount={pagination?.totalUsers || 0}
                                        // page={pageState.page - 1}
                                        // pageSize={pageState.pageSize}
                                        // paginationMode="server"
                                        // onPageChange={(newPage: number) => {
                                        //   setPageState((old) => ({ ...old, page: newPage + 1 }));
                                        // }}
                                        // onPageSizeChange={(newPageSize: number) =>
                                        //   setPageState((old) => ({ ...old, pageSize: newPageSize }))
                                        // }
                                        sx={tableStyles}
                                    />
                                </Card>
                            </Grid>
                        </Grid>

                        {/* <ConfirmBox
                            title="Order"
                            name="order"
                            open={deleteOpen}
                            closeDialog={() => setDeleteOpen(false)}
                            toDoFunction={deleteOrder}
                            loading={deleteLoading}
                            sx={{ pb: 4, border: "2px solid red" }}
                        /> */}
                    </div>}
                </div>
                {/* </main> */}
            </div>
        </div >

        // </div>
    );
};

export default VendorOrdersPage;
