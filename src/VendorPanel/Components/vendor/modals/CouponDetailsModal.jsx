import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    Grid,
    IconButton,
    LinearProgress,
    Tooltip,
    // Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers';
// import { Search } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { FiUser, FiUsers } from 'react-icons/fi';
import { FaArrowDown } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { tableStyles } from "../../../components/admin/shared/ConfirmDialog";
// import { useAxios } from '../../utills/axios';



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
    height: '100%',
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



const CouponDetailsModal = ({ buttonText, modalTitle, products }) => {
    // const instance = useAxios();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(dayjs('2022-04-17'));
    // const theme = useTheme();
    const [status, setStatus] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [clients, setClients] = useState(null)
    const [clientNames, setClientNames] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState({
        project_name: '',
        status: '',
        clientEmail: '',
        startDate: '',
        endDate: '',
        project_company: '',
        project_categories: '',
    });


    if (products) {
        console.log(products, "lkjlkjlkkl")
    }
    const [pagination, setPagination] = useState(
        null
    );

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 50,
    });

    // const [switchState, setSwitchState] = useState(false);

    // const handleSwitchChange = (event) => {
    //     setSwitchState(event.target.checked);
    // };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        // onSubmit(projectData);
        // setOpen(false);
        try {

            const res = await instance.post("/project/addProject/admin", projectData);

            if (res.data) {
                console.log(res.data)
            }

        } catch (error) {
            console.log(error)
        }

    };

    const style = {
        position: 'absolute',
        // display: "flex",
        gap: 7,
        maxHeight: 700,
        top: '50%',
        left: '50%',
        overflowY: "auto",
        transform: 'translate(-50%, -50%)',
        width: 1200,
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



    const handleChange = (event) => {
        console.log(event.target.value, "clieee")

        setStatus(event.target.value);
        setProjectData({
            ...projectData,
            status: event.target.value
        });
    };



    // Get all Clients
    const getAllClients = async () => {
        // try {
        //     const res = await instance.get("/client/allclientlist/admin");

        //     if (res.data.TaskList) {
        //         setClients(res?.data?.TaskList);

        //         console.log(res.data.TaskList, "task")
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    };


    // useEffect(() => {
    //     console.log("API call started");
    //     getAllClients(); // Make the API call
    // }, []);



    const handleClient = (event) => {
        console.log(event.target.value, "clieee")
        setSelectedClient(event.target.value)
        setProjectData({
            ...projectData,
            clientEmail: event.target.value.clientEmail
        });
    };




    // if (projectData) {
    //     console.log(projectData, "project")
    // }


    const all_customer_columns = [
        // {
        //     flex: 0.25,
        //     minWidth: 150,

        //     field: "name",
        //     headerName: "Customer Name",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        //     renderCell: ({ row }) => (
        //         <Typography variant="body1" fontWeight={500}>
        //             {row?.name}
        //         </Typography>
        //     ),
        // },
        {
            minWidth: 150,

            flex: 0.25,
            field: "productName",
            headerName: "Product Name",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "price",
            headerName: "Unit Price",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "stock",
            headerName: "Qty",
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

            field: "orderTotal",
            headerName: "Order Total",
            flex: 0.2,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 120,

            field: "status",
            headerName: "Status",
            flex: 0.2,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 120,

            field: "action",
            headerName: "Action",
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
        //             <Tooltip title="Edit">
        //                 <IconButton
        //                     // onClick={() => router.push(`/admin/customers/${row._id}`)}
        //                     color="primary"
        //                 >
        //                     <BsEyeFill />
        //                 </IconButton>
        //             </Tooltip>
        //             <Tooltip title="Edit">
        //                 <IconButton
        //                     // onClick={() => router.push(`/admin/customers/edit/${row._id}`)}
        //                     color="primary"
        //                 >
        //                     <BsPencilFill />
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
        <>
            {/* <p></p> */}
            <Button sx={{
                color: "white", borderRadius: "10px", padding: "7px 15px", backgroundColor: "#04a7ff",
            }} className="px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200" onClick={handleOpen}>{buttonText}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {modalTitle}
                    </Typography>

                    <div className="flex m-7 ">
                        <p className="mr-9">SAMSUNG 8 kg Fully Automatic Washing Machine</p>
                        <p className="mr-2">Date Added</p>
                        <span className="text-gray-400 mr-12"> 01-Jan-2023 - 03:21 pm</span>
                        <p className="mr-2">Product URL</p>
                        <span className="text-blue-600 mr-12">coolzone.in/samsung-fu..</span>
                    </div>


                    <div className="flex  gap-10 ">

                        <div className="basis-[33%]  p-3 bg-white rounded-lg">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-5">
                                    <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                        <FiUsers />
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Flat 50% Off Coupon</p>
                                        <p className='text-xs'>Active since - 12 Sept 2022</p>
                                    </div>
                                </div>

                                <button className="flex px-3 py-2 text-xs justify-between items-center gap-3 rounded-xl bg-red-100 text-black">
                                    Active
                                </button>
                            </div>
                            <div className="mt-8 flex items-center justify-start gap-20 w-full">
                                <div className="flex flex-col items-start justify-center">
                                    <p className="text-gray-400">
                                        Coupon Code
                                    </p>
                                    <p className=" font-bold text-">
                                        CoolZoneSK56485#665                           </p>
                                </div>
                                {/* <div className="flex flex-col items-start justify-center">
                                    <p className=" text-gray-400">
                                        Email
                                    </p>
                                    <p className=" font-bold">
                                        swapnil.hi@gmail.com
                                    </p>
                                </div> */}
                            </div>
                        </div>


                        <div className="basis-[33%]  p-3 bg-white rounded-lg">
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
                                        Coupon Description
                                    </p>
                                    <p className=" text-xs font-bold w-full">
                                        Offer available on installation of Air Conditioner. Get 50% off on installation of selected Products & on installation accessories.                            </p>
                                </div>

                            </div>
                        </div>

                        <div className="basis-[33%]  p-3 bg-white rounded-lg">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-5">
                                    <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                        <FiUsers />
                                    </div>
                                </div>

                            </div>
                            <div className="mt-8 flex items-center justify-start gap-20 w-full">
                                <div className="flex flex-col items-start justify-center">
                                    <p className="text-gray-400">
                                        Coupon Type
                                    </p>
                                    <p className=" font-bold">
                                        Limited                              </p>
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <p className=" text-gray-400">
                                        Expiry Date
                                    </p>
                                    <p className=" font-bold">
                                        31-03-2025
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-3 bg-white rounded-lg">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-5">
                                <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                    <FiUsers />
                                </div>

                            </div>


                        </div>
                        <div className="mt-8 flex items-center justify-start gap-20 w-full">

                            <div className="flex flex-col items-start justify-center">
                                <p className="text-gray-400">
                                    Coupon Segments
                                </p>
                                <p className=" font-bold text-">
                                    Air Conditioner                        </p>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <p className="text-gray-400">
                                    Coupon Max Cap
                                </p>
                                <p className=" font-bold text-">
                                    ₹6,00,000.00                      </p>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <p className="text-gray-400">
                                    Last Purchase Date
                                </p>
                                <p className=" font-bold text-">
                                    12/09/2023 11:20:00 AM                      </p>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <p className="text-gray-400">
                                    Last Purchase Amount
                                </p>
                                <p className=" font-bold text-">
                                    ₹53,540.00                      </p>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <p className="text-gray-400">
                                    Discount Given (all-time)
                                </p>
                                <p className=" font-bold text-">
                                    ₹11,834.90                     </p>
                            </div>

                        </div>
                    </div>


                    <div className="flex justify-between items-center mb-8 px-4">
                        <div className="space-x-5">
                            <p className="text-2xl ">Purchasing <span className='text-blue-600'>3</span></p>
                        </div>

                        <div className="flex my-6 space-x-[12px]">
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
                    </div>

                    <Grid container spacing={6} sx={{}}>
                        <Grid item xs={12}>
                            <Card sx={{ borderRadius: 2 }}>
                                <DataGrid
                                    rows={users || []}
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

                    <div className="flex justify-end gap-12 my-7">

                        <button
                            // onClick={() => router.push("/admin/customers/add")}
                            className=" px-7 text-red-600 font-medium border-red-600 border-2 rounded-lg py-3  items-center transition transform active:scale-95 duration-200  "
                        >
                            Change Expiry
                        </button>
                        <button
                            // onClick={() => router.push("/admin/customers/add")}
                            className=" px-7 text-red-600 font-medium border-red-600 border-2 rounded-lg py-3  items-center transition transform active:scale-95 duration-200  "
                        >
                            Change Segments
                        </button>
                        <button
                            // onClick={() => router.push("/admin/customers/add")}
                            className=" px-7 text-red-600 font-medium border-red-600 border-2 rounded-lg py-3  items-center transition transform active:scale-95 duration-200  "
                        >
                            Reduce Limit
                        </button>
                        <button
                            // onClick={() => router.push("/admin/customers/add")}
                            className=" px-7 text-white font-medium bg-red-600 rounded-lg py-3  items-center transition transform active:scale-95 duration-200  "
                        >
                            Deactivate Coupon
                        </button>
                    </div>


                </Box>
            </Modal>
        </>
    );
};

export default CouponDetailsModal;
