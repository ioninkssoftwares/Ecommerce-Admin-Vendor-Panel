import {
    Box,
    Card,
    CircularProgress,
    Grid,
    IconButton,
    LinearProgress,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { ReactElement, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { toast } from "react-toastify";
import { FaArrowDown, FaCartArrowDown, FaEye } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { FcProcess } from "react-icons/fc";
import Sidebar from "../../Components/sidebar/Siderbar";
import AdminNavbar from "../../Components/navbar/VendorNavbar";
import { useAxios } from "../../../utils/axios";
import { tableStyles } from "../../Components/vendor/shared/ConfirmDialog";
import ConfirmBox from "../../Components/vendor/shared/ConfirmDialog";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import OrderDetailsModal from "../../Components/vendor/modals/OrderDetailsModal";
// import { DatePicker} from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import format from 'date-fns/format';
import dayjs from 'dayjs'; // Import dayjs for date manipulation
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMemo } from "react";
// import 'dayjs/locale/en'; // Optionally, set locale


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
    const [orderId, setOrderId] = useState("");
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

    const sortedOrders = useMemo(() => {
        return [...allOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [allOrders]);


    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRows, setFilteredRows] = useState(allOrders);
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    if (filteredRows) console.log(filteredRows, "dlkfsjkldsjflk")

    useEffect(() => {
        applyFilters();
    }, [searchQuery, statusFilter, selectedDate]);

    const handleSearchQueryChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    const handleStatusFilterChange = (event) => {
        const status = event.target.value;
        setStatusFilter(status);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const clearDateFilter = () => {
        setSelectedDate(null);
    };



    const applyFilters = () => {
        let searchFilteredRows = filterBySearchQuery(allOrders, searchQuery);
        let statusFilteredRows = filterByStatus(searchFilteredRows, statusFilter);
        let dateFilteredRows = filterByDate(statusFilteredRows, selectedDate);

        if (!searchQuery && !statusFilter && !selectedDate) {
            dateFilteredRows = allOrders;
        }

        setFilteredRows(dateFilteredRows);
    };

    const filterBySearchQuery = (rows, query) => {
        if (!query) return rows;
        return rows.filter((row) => {
            const { product, _id } = row;
            const { name, brand, category, subCategory } = product;
            const searchFields = [name, category, subCategory, brand, _id];
            return searchFields.some((field) =>
                field.toLowerCase().includes(query.toLowerCase())
            );
        });
    };

    const filterByStatus = (rows, status) => {
        if (!status) return rows;
        return rows.filter((row) => row.status === status);
    };

    const filterByDate = (rows, date) => {
        if (!date) return rows;
        return rows.filter((row) => {
            const createdAt = dayjs(row.createdAt);
            const selectedDateFormatted = date.format('YYYY-MM-DD');
            const rowDateFormatted = createdAt.format('YYYY-MM-DD');
            return selectedDateFormatted === rowDateFormatted;
        });
    };



    if (allOrders) {
        console.log(allOrders, "jsdahfaksdjhf")
    }


    const getOrdersByVendorId = async () => {
        try {
            setLoading(true)
            const res = await instance.get(`/vendor/getOrderByVendorId/${vendorId}`)
            if (res.data) {
                setLoading(false)
                setAllOrders(res.data.data)
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

    const processOrder = async (processId) => {
        try {
            // Set loading state to true for the specific order
            setProcessLoadingState((prev) => ({ ...prev, [processId]: true }));

            const res = await instance.put("/order/" + processId);

            if (res.data) {
                toast.success("Order Processed Successfully");

                // Clear loading state for the specific order
                setProcessLoadingState((prev) => ({ ...prev, [processId]: false }));
                setDeleteOpen(false);
                getOrdersByVendorId()
            }
        } catch (e) {
            // Handle errors here
            console.error(e);

            // Clear loading state for the specific order on error
            setProcessLoadingState((prev) => ({ ...prev, [processId]: false }));
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleOpenModal = (id) => {
        setOrderId(id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const all_customer_columns = [
        {
            minWidth: 120,

            flex: 0.25,
            field: "_id",
            headerName: "Order Id",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            flex: 0.25,
            minWidth: 150,
            field: "name",
            headerName: "User Name",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <Typography variant="body1" fontWeight={500} style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                    {row?.user?.name}
                </Typography>
            ),
        },
        {
            flex: 0.25,
            minWidth: 250,
            field: "productName",
            headerName: "Product Name",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            valueGetter: (params) => params.row.product?.name,
            renderCell: ({ row }) => (
                <Typography
                    variant="body1"
                    fontWeight={500}
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px' }}
                >
                    {row?.product?.name}
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

        {
            minWidth: 150,
            flex: 0.25,
            field: "actualPrice",
            headerName: "Price",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            valueGetter: (params) => {
                const { product, user } = params.row;
                if (!product || !user) return '';

                switch (user.userType) {
                    case 'freeUser':
                        return product.freeUser;
                    case 'goldUser':
                        return product.goldUser;
                    case 'silverUser':
                        return product.silverUser;
                    default:
                        return '';
                }
            },
            renderCell: ({ row }) => (
                <Typography variant="body1" fontWeight={500}>
                    {row?.product && row?.user && (
                        (() => {
                            switch (row.user.userType) {
                                case 'freeUser':
                                    return row.product.freeUser;
                                case 'goldUser':
                                    return row.product.goldUser;
                                case 'silverUser':
                                    return row.product.silverUser;
                                default:
                                    return '';
                            }
                        })()
                    )}
                </Typography>
            ),
        },


        {
            minWidth: 120,

            flex: 0.25,
            field: "quantity",
            headerName: "Quantity",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },

        // {
        //     minWidth: 150,

        //     flex: 0.25,
        //     field: "subtotal",
        //     headerName: "Subtotal",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        // },

        // {
        //     minWidth: 150,

        //     flex: 0.25,
        //     field: "discount",
        //     headerName: "Discount",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        // },
        // {
        //     minWidth: 150,

        //     field: "shippingCharges",
        //     headerName: "Shipping Charges",
        //     flex: 0.25,
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        // },
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
        //     field: 'orderTotal',
        //     headerName: 'Order Total',
        //     minWidth: 150,
        //     flex: 0.25,
        //     align: "left",
        //     headerAlign: "left",
        //     valueGetter: (params) => {
        //         return params.row.product?.price * params.row.quantity;
        //     },
        // },

        {
            minWidth: 150,

            field: "status",
            headerName: "Order Status",
            flex: 0.25,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 150,

            field: "action",
            headerName: "ACTION",
            flex: 0.25,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <Box>
                    <Tooltip title="View Order Details">
                        <IconButton onClick={() => handleOpenModal(row._id)} color="error">
                            <FaEye />
                        </IconButton>
                    </Tooltip>

                    {/* <Tooltip title="Process">
                        <IconButton
                            onClick={() => processOrder(row._id)}
                            color="primary"
                        >
                            {processLoadingState[row._id] ? <CircularProgress size={24} /> : <FcProcess />}
                        </IconButton>
                    </Tooltip> */}

                </Box>
            ),
        },
    ];

    const deliveredOrders =
        allOrders?.filter((order) => order.status === "Delivered") || [];
    const deliveredPercentage =
        allOrders && allOrders.length > 0
            ? ((deliveredOrders.length / allOrders.length) * 100).toFixed(2)
            : 0;

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
                        <div className="flex md:justify-between md:items-center md:flex-row flex-col justify-center items-center mt-8 mb-6 gap-3 px-3">

                            {/* <div> */}
                            <div className="p-3 w-full bg-white rounded-lg mx-6">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-5 items-center justify-center">
                                        <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                            <PeopleOutlineIcon />
                                        </div>
                                        <div>
                                            <p className="text-primary-blue font-bold text-xl">Summary</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-[8.8rem] mt-4">
                                    {/* <div className="mt-8 flex items-center justify-start gap-20 w-full"> */}
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-gray-400">
                                            All Orders
                                        </p>
                                        <Typography
                                            paragraph
                                            style={{ fontWeight: "500", color: "black" }}
                                        >
                                            {allOrders && allOrders.length}
                                            <span
                                                style={{
                                                    fontSize: "12px",
                                                    color: "green",

                                                }}
                                            >

                                                {allOrders && allOrders.length > 0 && `+${deliveredPercentage}%`}
                                            </span>
                                        </Typography>

                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className=" text-gray-400">
                                            Delivered Orders
                                        </p>
                                        <Typography
                                            paragraph
                                            style={{ fontWeight: "500", color: "black" }}
                                        >
                                            {allOrders &&
                                                allOrders.filter((product) => product.status === "Delivered")
                                                    .length}
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className=" text-gray-400">
                                            Shipped Orders
                                        </p>
                                        <Typography
                                            paragraph
                                            style={{ fontWeight: "500", color: "black" }}
                                        >
                                            {allOrders &&
                                                allOrders.filter((product) => product.status === "Shipped")
                                                    .length}
                                        </Typography>
                                    </div>

                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-gray-400">
                                            Processing Orders
                                        </p>
                                        <Typography
                                            paragraph
                                            style={{ fontWeight: "500", color: "black" }}
                                        >
                                            {allOrders &&
                                                allOrders.filter((product) => product.status === "Processing")
                                                    .length}
                                        </Typography>

                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className=" text-gray-400">
                                            Returned Orders
                                        </p>
                                        <Typography
                                            paragraph
                                            style={{ fontWeight: "500", color: "black" }}
                                        >
                                            {allOrders &&
                                                allOrders.filter((product) => product.status === "Returned")
                                                    .length}
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className=" text-gray-400">
                                            Cancelled Orders
                                        </p>
                                        <Typography
                                            paragraph
                                            style={{ fontWeight: "500", color: "black" }}
                                        >
                                            {allOrders &&
                                                allOrders.filter((product) => product.status === "Cancelled")
                                                    .length}
                                        </Typography>
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>











                        </div>

                        <div className="flex justify-between items-center mb-8 mt-4  px-10">
                            <div className="space-x-5">
                                <p className="text-2xl ">Orders </p>
                            </div>


                            <div className="flex space-x-[12px]">
                                <div className="flex items-center bg-white p-2 rounded-lg space-x-3">
                                    <AiOutlineSearch className="text-xl" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchQueryChange}
                                        placeholder="search"
                                        className="outline-none"
                                    />
                                </div>
                                <div className="flex items-center bg-white p-2 rounded-lg space-x-3">
                                    <select
                                        value={statusFilter}
                                        onChange={handleStatusFilterChange}
                                        className="outline-none p-2 rounded-lg px-8"
                                    >
                                        <option value="">None</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>
                                <div className="flex items-center bg-white p-2 rounded-lg space-x-3">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Date Range"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    {selectedDate && (
                                        <IconButton onClick={clearDateFilter} size="small">
                                            <AiOutlineCloseCircle />
                                        </IconButton>
                                    )}
                                </div>


                            </div>
                        </div>


                        <Grid container spacing={6} sx={{ pb: 38, px: 4, overflowX: 'scroll' }}>
                            <Grid item xs={12}>
                                <Card sx={{ borderRadius: 2 }}>
                                    <DataGrid
                                        rows={filteredRows.length ? filteredRows : sortedOrders}
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
                                        sx={tableStyles}
                                    />
                                </Card>
                            </Grid>
                        </Grid>



                        <OrderDetailsModal
                            open={isModalOpen}
                            onClose={handleCloseModal}
                            orderId={orderId}
                            modalTitle="Order Details"
                            buttonText="Order Details"
                        />

                    </div>}
                </div>
                {/* </main> */}
            </div>
        </div >

        // </div>
    );
};

export default VendorOrdersPage;
