import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CircularProgress,
    Grid,
    LinearProgress,
    // Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import dayjs from 'dayjs';


import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import { AiOutlineSearch } from 'react-icons/ai';
import { tableStyles } from '../../vendor/shared/ConfirmDialog'
import { FiUser, FiUsers } from 'react-icons/fi';
import { useAxios } from '../../../../utils/axios';
import { LuMapPin } from 'react-icons/lu';
import { toast } from 'react-toastify';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginTop: 2,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '80%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));



const OrderDetailsModal = ({ open, onClose, modalTitle, orderId, buttonText }) => {
    const instance = useAxios();

    const [loading, setLoading] = useState(false);
    const [orderDetails, setOrderDetails] = useState({});
    const [orderGridDetails, setOrderGridDetails] = useState([]);
    const [projectData, setProjectData] = useState({
        project_name: '',
        status: '',
        clientEmail: '',
        startDate: '',
        endDate: '',
        project_company: '',
        project_categories: '',
    });

    const [shippingPartner, setShippingPartner] = useState("");
    const [trackingId, setTrackingId] = useState("");
    const [trackingLink, setTrackingLink] = useState("");
    const [processLoadingState, setProcessLoadingState] = useState({});


    if (orderDetails) {
        console.log(orderDetails, "lkjlkjlkkl")
    }

    const getOrderDetailsByOrderId = async (id) => {
        try {
            const res = await instance.get(
                `/order/orderByorderId/${id}`
            );
            if (res.data) {
                setOrderDetails(res.data.data)
                setOrderGridDetails([res.data.data])
            }
        } catch (e) {
            setLoading(false);
            console.log(e)
            // ErrorDispaly(e);
        }
    }


    useEffect(() => {
        if (orderId) {
            getOrderDetailsByOrderId(orderId)
        }

        return () => {
            setTrackingId('');
            setTrackingLink('');
            setShippingPartner('');
        };
    }, [orderId])

    useEffect(() => {
        if (orderDetails) {
            setTrackingId(orderDetails?.trackingDetails?.trackingId)
            setTrackingLink(orderDetails?.trackingDetails?.trackingLink)
            setShippingPartner(orderDetails?.trackingDetails?.shippingPartner)
        }


        return () => {
            setTrackingId('');
            setTrackingLink('');
            setShippingPartner('');
        };
    }, [orderDetails])

    const isTrackingDetailsEmpty =
        !orderDetails?.trackingDetails?.trackingId ||
        !orderDetails?.trackingDetails?.trackingLink ||
        !orderDetails?.trackingDetails?.shippingPartner;


    console.log(isTrackingDetailsEmpty, "trackiiiii")

    const processOrder = async (processId) => {
        try {
            // Set loading state to true for the specific order
            setProcessLoadingState((prev) => ({ ...prev, [processId]: true }));

            const res = await instance.put("/order/" + processId);

            if (res.data) {
                toast.success("Order Processed Successfully");

                // Clear loading state for the specific order
                setProcessLoadingState((prev) => ({ ...prev, [processId]: false }));
                // setDeleteOpen(false);
                getOrderDetailsByOrderId(orderId)
            }
        } catch (e) {
            // Handle errors here
            console.error(e);

            // Clear loading state for the specific order on error
            setProcessLoadingState((prev) => ({ ...prev, [processId]: false }));
        }
    };





    const [pagination, setPagination] = useState(
        null
    );

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 50,
    });

    if (orderDetails) console.log(orderDetails, "oooooo")



    const style = {
        position: 'absolute',
        // display: "flex",
        gap: 7,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1200,
        height: "90%",
        bgcolor: '#fcfcfc', // Changed background color to white
        boxShadow: 24,
        p: 3, // Adjust padding as needed
        borderRadius: 4, // Add border radius for rounded corners
        outline: 'none', // Remove default focus outline

    };

    // MUI DropDown

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        'Completed',
        "Ongoing",
        "Onhold",
        "Pending",
    ];


    // const clientNames = [
    //     'Completed',
    //     "Ongoing",
    //     "Onhold",
    //     "Pending",
    // ];



    // const handleChange = (event) => {
    //     console.log(event.target.value, "clieee")

    //     setStatus(event.target.value);
    //     setProjectData({
    //         ...projectData,
    //         status: event.target.value
    //     });
    // };


    const all_customer_columns = [
        {
            flex: 0.25,
            minWidth: 120,
            field: "user.name",
            headerName: "Customer Name",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) => (

                <Typography variant="body1" fontWeight={500}>
                    {row.user.name}
                </Typography>
            )
        },
        {
            minWidth: 120,

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
            minWidth: 120,

            flex: 0.25,
            field: "quantity",
            headerName: "Quantity",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 120,

            flex: 0.25,
            field: "subtotal",
            headerName: "Subtotal",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },


        {
            minWidth: 120,

            flex: 0.25,
            field: "discount",
            headerName: "Discount",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 120,

            field: "shippingCharges",
            headerName: "Shipping Charges",
            flex: 0.25,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },

        {
            minWidth: 120,

            field: "status",
            headerName: "Status",
            flex: 0.25,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },

    ];

    const formatAddress = (shippingInfo) => {
        const { address, city, state, country, pinCode } = shippingInfo;
        return `${address}, ${city}, ${state}, ${country}, ${pinCode}`;
    };


    const formatDate = (dateString) => {
        const optionsDate = { day: '2-digit', month: 'short', year: 'numeric' };
        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };

        const date = new Date(dateString);

        const formattedDate = date.toLocaleDateString('en-US', optionsDate).replace(/ /g, '-');
        const formattedTime = date.toLocaleTimeString('en-US', optionsTime).toLowerCase();

        return `${formattedDate} - ${formattedTime}`;
    };


    const updateTrackingDetials = async () => {
        setLoading(true)
        try {
            const shippingData = {
                trackingLink,
                trackingId,
                shippingPartner
            }
            const res = await instance.put(
                `/orders/${orderId}/tracking`, shippingData
            );
            if (res.data) {
                toast("Update Tracking Details Successfully")
                setLoading(false);
                getOrderDetailsByOrderId(orderId)
                // setTrackingId("")
                // setTrackingLink("")
                // setShippingPartner("")


            }
        } catch (e) {
            setLoading(false);
            console.log(e)
        }

    }


    return (
        <>
            {/* <p></p> */}
            <Button sx={{
                color: "white", borderRadius: "10px", padding: "7px 15px", backgroundColor: "#04a7ff",
                //  "&:hover": {
                //     backgroundColor: '#db8e57'
                // },
            }} className="px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200" >{buttonText}</Button>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {modalTitle}
                    </Typography>


                    <div className="flex m-7 ">
                        {/* <p className="mr-9">SAMSUNG 8 kg Fully Automatic Washing Machine</p> */}
                        {orderDetails && orderDetails.product && (<p className="mr-9">{orderDetails.product.name}</p>)}

                        <p className="mr-2">Date Added</p>
                        {orderDetails && orderDetails.createdAt ? (
                            <span className="text-gray-400 mr-12">{formatDate(orderDetails.createdAt)}</span>
                        ) : (
                            <span className="text-gray-400 mr-12">Date not available</span>
                        )}
                        <p className="mr-2">Product URL</p>
                        {/* <span className="text-blue-600 mr-12">coolzone.in/samsung-fu..</span> */}


                    </div>


                    <div className="flex  gap-10 ">

                        <div className="basis-[25%]  p-3 bg-white rounded-lg">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-5">
                                    <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                        <FiUser />
                                    </div>
                                    <div>
                                        {/* <p className="text-gray-400">Sravan Kumar</p> */}
                                        {/* {orderDetails && orderDetails.user && (
                                            <p className="text-gray-400">{orderDetails.user._id}</p>
                                            
                                            )} */}
                                        {orderDetails && orderDetails.user && (<p className="text-gray-400 mt-3">{orderDetails.user.name}</p>)}
                                    </div>
                                </div>

                                <p className="flex px-3 py-2 text-xs justify-between items-center gap-3 rounded-xl bg-red-100 text-black">
                                    {orderDetails && (<p>{orderDetails.status}</p>)}
                                </p>
                            </div>
                            <div className="mt-8 flex items-center justify-start gap-20 w-full">
                                <div className="flex flex-col items-start justify-center">
                                    <p className="text-gray-400">
                                        Phone
                                    </p>
                                    {/* <p className=" font-bold ">
                                        878787787                              </p> */}
                                    {orderDetails && orderDetails.user && (<p className=" font-bold ">{orderDetails.user.mobileNo}</p>)}
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <p className=" text-gray-400">
                                        Email
                                    </p>
                                    <p className=" font-bold">
                                        swapnil.hi@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="basis-[25%]  p-3 bg-white rounded-lg">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-5">
                                    <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                        <FiUsers />
                                    </div>
                                    {/* <div>
                                        <p className="text-gray-400">Sravan Kumar</p>
                                        <p>Last Order 12 Sept 2023</p>
                                    </div> */}
                                </div>


                            </div>
                            <div className="mt-8 flex items-center justify-start  w-full">
                                <div className="flex  w-full flex-col items-start justify-center">
                                    <p className="text-gray-400">
                                        Home Address
                                    </p>
                                    {/* <p className=" text-xs font-bold w-full">
                                        {formatAddress(orderDetails.shippingInfo)}                           </p> */}
                                    {orderDetails && orderDetails.shippingInfo ? (
                                        <p className=" text-xs font-bold w-full">{formatAddress(orderDetails.shippingInfo)}</p>
                                    ) : (
                                        <p className=" text-xs font-bold w-full">Address not avialable</p>
                                    )}
                                </div>

                            </div>
                        </div>

                        <div className="basis-[50%]  p-3 bg-white rounded-lg">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-5">
                                    <div className="bg-[#04A7FF29] p-3 w-12 h-12 text-primary-blue rounded-xl text-xl">
                                        <LuMapPin className='w-full h-full ' />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 mb-2">Tracking Details</p>
                                        <div>
                                            <span>Shipping Partner -</span>
                                            <input type="text" onChange={(e) => setShippingPartner(e.target.value)} className="rounded-md" value={shippingPartner} />
                                        </div>
                                    </div>
                                </div>

                                {/* <p className="flex px-3 py-2 mb-20 text-xs justify-between items-center gap-3 rounded-xl bg-red-100 text-black">
                                    {orderDetails && (<p>{orderDetails.status}</p>)}
                                </p> */}
                                {orderDetails && orderDetails.status === "Processing" && (
                                    <p className="flex px-3 py-2 mb-20 text-xs justify-between items-center gap-3 rounded-xl bg-red-100 text-black whitespace-nowrap">
                                        Pending
                                    </p>
                                )}
                                {orderDetails && orderDetails.status === "Shipped" && (
                                    <p className="flex px-3 py-2 mb-20 text-xs justify-between items-center gap-3 rounded-xl bg-orange-400 text-black whitespace-nowrap">
                                        In-Transit
                                    </p>
                                )}
                                {orderDetails && orderDetails.status === "Delivered" && (
                                    <p className="flex px-3 py-2 mb-20 text-xs justify-between items-center gap-3 rounded-xl bg-green-400 text-black whitespace-nowrap">
                                        Delivered
                                    </p>
                                )}
                            </div>
                            <div className="mt-2 flex items-center justify-start gap-20 w-full">
                                <div className="flex flex-col items-start justify-center">
                                    <p className="text-gray-400">
                                        Tracking ID
                                    </p>
                                    <input type="text" onChange={(e) => setTrackingId(e.target.value)} className="rounded-md" value={trackingId} />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <p className=" text-gray-400">
                                        Tracking Link
                                    </p>
                                    <input type="text" onChange={(e) => setTrackingLink(e.target.value)} className="rounded-md" value={trackingLink} />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* <div className="flex justify-between items-center px-4">
                        <div className="space-x-5">
                            <p className="text-2xl ">Item's <span className='text-blue-600'>3</span></p>
                        </div>

                        <div className="flex my-1  space-x-[12px]">
                            <div className="flex items-center bg-white p-2 rounded-lg space-x-3">
                                <AiOutlineSearch className="text-xl" />
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    placeholder="search"
                                    className="outline-none"
                                />
                            </div>
                        </div>
                    </div> */}

                    <Grid container spacing={6} sx={{}}>
                        <Grid item xs={12}>
                            <Card sx={{ borderRadius: 2 }}>
                                <DataGrid
                                    rows={orderGridDetails || []}
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

                    <div className="flex justify-end gap-12 mt-3">

                        {orderDetails?.status === "Processing" ? (
                            <button
                                onClick={() => !isTrackingDetailsEmpty && processOrder(orderId)}
                                disabled={loading || isTrackingDetailsEmpty}
                                className={`px-7 text-white font-medium bg-primary-blue rounded-lg py-3 items-center transition transform active:scale-95 duration-200 ${loading || isTrackingDetailsEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Mark as Shipped"}
                            </button>
                        ) : orderDetails?.status === "Shipped" ? (
                            <button
                                onClick={() => processOrder(orderId)}
                                disabled={loading}
                                className={`px-7 text-white font-medium bg-primary-blue rounded-lg py-3 items-center transition transform active:scale-95 duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Mark as Delivered"}
                            </button>
                        ) : (
                            <button
                                disabled
                                className="px-7 text-gray-400 font-medium bg-gray-300 rounded-lg py-3 items-center"
                            >
                                Delivered
                            </button>
                        )}

                        {loading ? <CircularProgress /> : <button
                            onClick={updateTrackingDetials}
                            className=" px-7 text-white font-medium bg-primary-blue rounded-lg py-3  items-center transition transform active:scale-95 duration-200  "
                        >
                            Update Tracking
                        </button>}
                        <button
                            // onClick={() => router.push("/admin/customers/add")}
                            className=" px-7 text-white font-medium bg-red-600 rounded-lg py-3  items-center transition transform active:scale-95 duration-200  "
                        >
                            Cancel Order
                        </button>
                    </div>


                </Box>
            </Modal>
        </>
    );
};

export default OrderDetailsModal;
