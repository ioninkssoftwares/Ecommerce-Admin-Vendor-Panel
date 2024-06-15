import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    CircularProgress,
    ToggleButton,
    ToggleButtonGroup,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    DialogContentText,
    Tooltip,
    Card,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Grid, Divider, MenuItem } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import DoneIcon from "@mui/icons-material/Done";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DescriptionIcon from "@mui/icons-material/Description";
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
import { FaMoneyBillTransfer } from "react-icons/fa6";
// import 'dayjs/locale/en'; // Optionally, set locale


// export const Button = ({
//     name,
//     Icon,
//     Color,
// }) => {
//     return (
//         <div
//             className={
//                 Color +
//                 " bg-white font-bold w-full rounded-sm shadow-sm flex space-x-1 items-center justify-center px-4 p-1 max-w-max border border-[#DEDEDE]"
//             }
//         >
//             <div className="text-xs">{<Icon />}</div>
//             <div>
//                 <p className=" text-[10px]">{name}</p>
//             </div>
//         </div>
//     );
// };

const userTypes = ["All", "Premium"];

// give main area a max widht
const TransactionsPage = () => {
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
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const pendingAmount = totalAmount - totalPaid;
    const [vendorWithdrawInfo, setVendorWithdrawInfo] = useState({});
    const [view, setView] = useState("transactions");

    const instance = useAxios(token);
    const [allVendors, setAllVendors] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [pagination, setPagination] = useState(
        null
    );
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 50,
    });


    if (vendorWithdrawInfo) {
        console.log(vendorWithdrawInfo, "jsdahfaksdjhf")
    }

    function filterVendor() {
        const filteredVendor = allVendors.find((vendor) => {
            return vendor._id === vendorId;
        });
        console.log(filteredVendor, "filteredVendor")
        setVendorWithdrawInfo(filteredVendor);

        let vendorTotalWithdrawal = 0;
        if (filteredVendor && filteredVendor.withdrawalInfo) {
            vendorTotalWithdrawal = filteredVendor.withdrawalInfo.reduce(
                (sum, withdrawal) => {
                    return sum + withdrawal.amount;
                },
                0
            );
        }
        setTotalPaid(vendorTotalWithdrawal);
    }

    useEffect(() => {
        if (allVendors && vendorId) {
            filterVendor()
        }
    }, [allVendors, vendorId])


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





    useEffect(() => {
        const deliveredOrders = allOrders.filter(
            (order) => order.status === "Delivered"
        );
        setDeliveredOrders(deliveredOrders || [])
        console.log(deliveredOrders, "hjhjjhjhj")

        const totalAmount = deliveredOrders.reduce((sum, order) => {
            return sum + order.product.price * order.quantity;
        }, 0);

        setTotalAmount(totalAmount);
    }, [allVendors, allOrders])


    const getAllVendors = async () => {
        try {
            setLoading(true)
            const res = await instance.get(`/vendor/get`)
            if (res.data) {
                setLoading(false)
                setAllVendors(res.data.data)
            }


        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

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
            getAllVendors()
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
            field: "transactionId",
            headerName: "Transaction Id",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },

        {
            minWidth: 120,

            flex: 0.25,
            field: "date",
            headerName: "Date",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true, renderCell: ({ row }) => (
                <Typography variant="body1" fontWeight={500}>
                    {new Date(row?.date).toLocaleDateString('en-GB')}
                </Typography>
            ),
        },

        {
            minWidth: 150,

            flex: 0.25,
            field: "transactionType",
            headerName: "Transaction Type",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },

        {
            minWidth: 150,

            flex: 0.25,
            field: "amount",
            headerName: "Amount",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true, renderCell: ({ row }) => (
                <Typography variant="body1" fontWeight={500}>
                    ₹{row?.amount}
                </Typography>
            ),
        },

    ];

    const all_customer_columns_for_orders = [
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
            flex: 0.25,
            minWidth: 150,
            field: "productPrice",
            headerName: "Price",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            valueGetter: (params) => params.row.product?.price,
            renderCell: ({ row }) => (
                <Typography
                    variant="body1"
                    fontWeight={500}
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px' }}
                >
                    {row?.product?.price}
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

        //     field: "shippingCharges",
        //     headerName: "Shipping Charges",
        //     flex: 0.25,
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        // },
        {
            field: 'orderTotal',
            headerName: 'Order Total',
            minWidth: 150,
            flex: 0.25,
            align: "left",
            headerAlign: "left",
            valueGetter: (params) => {
                return params.row.product?.price * params.row.quantity;
            },
        },

        {
            minWidth: 150,

            field: "status",
            headerName: "Order Status",
            flex: 0.25,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },

    ];


    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setView(newView);
        }
    };


    const sortedDeliveredOrders = useMemo(() => {
        return [...deliveredOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [deliveredOrders]);


    const sortedTransactions = useMemo(() => {
        if (!vendorWithdrawInfo?.withdrawalInfo) return [];

        return [...vendorWithdrawInfo.withdrawalInfo].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [vendorWithdrawInfo]);

    if (sortedTransactions) console.log(sortedTransactions, "hjhj");

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
                                {/* <p style={{ borderBottom: "2px solid gray" }} className=" text-center w-full pb-2 font-bold text-xl">Transactions</p> */}
                                <div className="flex gap-5 items-center justify-center mb-3">
                                    <div className="bg-[#04A7FF29] p-2 text-primary-blue rounded-xl text-lg">
                                        <FaMoneyBillTransfer />
                                    </div>
                                    <div>
                                        <p className="text-primary-blue font-bold text-xl">Transactions</p>
                                    </div>
                                </div>
                                <Divider />
                                <Grid container spacing={2} sx={{ marginTop: 1 }}>

                                    <Grid item xs={4}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <PaymentIcon color="primary" />

                                            <Box sx={{ marginLeft: 1 }}>
                                                <Typography variant="subtitle1">Total Amount</Typography>
                                                <Typography variant="h6" color="textSecondary">
                                                    ₹{totalAmount}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <DoneIcon color="secondary" />
                                            <Box sx={{ marginLeft: 1 }}>
                                                <Typography variant="subtitle1">Total Paid</Typography>
                                                <Typography variant="h6" color="textSecondary">
                                                    ₹{totalPaid || 0}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <HourglassEmptyIcon color="error" />
                                            <Box sx={{ marginLeft: 1 }}>
                                                <Typography variant="subtitle1">
                                                    Pending Amount
                                                </Typography>
                                                <Typography variant="h6" color="textSecondary">
                                                    ₹{pendingAmount}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                </Grid>
                                {/* <div className="flex justify-center items-center ">
                                    <div className="flex gap-5 items-center justify-center">
                                        <div className="w-full border-2 border-b-gray-400">
                                            <p className=" font-bold text-xl">Transactions</p>
                                        </div>
                                    </div>
                                </div> */}

                                {/* </div> */}
                            </div>



                        </div>

                        {/* <div className="flex justify-between items-center mb-8 mt-4  px-10">
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
                        </div> */}

                        <ToggleButtonGroup
                            value={view}
                            exclusive
                            onChange={handleViewChange}
                            aria-label="view toggle"
                            sx={{ marginBottom: 3, marginLeft: 4, marginRight: 2 }}
                        >
                            <ToggleButton value="orders" aria-label="orders view">
                                Orders
                            </ToggleButton>
                            <ToggleButton
                                value="transactions"
                                aria-label="transactions view"
                            >
                                Transactions
                            </ToggleButton>
                        </ToggleButtonGroup>

                        {view === "transactions" && (
                            <Grid container spacing={6} sx={{ pb: 38, px: 4, overflowX: 'scroll' }}>
                                <Grid item xs={12}>
                                    <Card sx={{ borderRadius: 2 }}>
                                        <DataGrid
                                            rows={sortedTransactions ? sortedTransactions : []}
                                            columns={all_customer_columns}
                                            getRowId={(row) => row.transactionId}
                                            autoHeight
                                            // components={{
                                            //     LoadingOverlay: LinearProgress,
                                            // }}
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
                            </Grid>)
                        }
                        {view === "orders" && (
                            <Grid container spacing={6} sx={{ pb: 38, px: 4, overflowX: 'scroll' }}>
                                <Grid item xs={12}>
                                    <Card sx={{ borderRadius: 2 }}>
                                        <DataGrid
                                            rows={sortedDeliveredOrders ? sortedDeliveredOrders : []}
                                            columns={all_customer_columns_for_orders}
                                            getRowId={(row) => row._id}
                                            autoHeight
                                            // components={{
                                            //     LoadingOverlay: LinearProgress,
                                            // }}
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
                            </Grid>)
                        }


                        {/* <ConfirmBox
                            title="Order"
                            name="order"
                            open={deleteOpen}
                            closeDialog={() => setDeleteOpen(false)}
                            toDoFunction={deleteOrder}
                            loading={deleteLoading}
                            sx={{ pb: 4, border: "2px solid red" }}
                        /> */}


                        {/* <OrderDetailsModal
                            orderId={orderId}
                            open={deleteOpen}
                            modalTitle="Order Details"
                            buttonText="Order Details"
                            onClose={handleCloseModal}
                        /> */}

                        {/* <OrderDetailsModal
                            open={isModalOpen}
                            onClose={handleCloseModal}
                            orderId={orderId}
                            modalTitle="Order Details"
                            buttonText="Order Details"
                        /> */}

                    </div>}
                </div>
                {/* </main> */}
            </div>
        </div >

        // </div>
    );
};

export default TransactionsPage;
