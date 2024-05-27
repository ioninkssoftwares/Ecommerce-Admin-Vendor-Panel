import {
    Box,
    Button,
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
// import Link from "next/link";
// import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsEyeFill, BsPencil, BsPencilFill } from "react-icons/bs";
import { MdDeleteForever, MdInventory } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { VscListFilter } from "react-icons/vsc";
import { toast } from "react-toastify";
// import { location, newResponse, Pagination, response, User } from "src/@types";
// import { AdminCustomers } from "../../../componets/user/adminCustomer";
// import AdminsideNav from "../../../componets/admin/adminDasboardnav";
// import ConfirmBox from "../../../components/admin/shared/ConfirmDialog";
import ConfirmBox from "../../Components/vendor/shared/ConfirmDialog";
// import DashBoardLayout from "src/Layout/DasboardsLayout";
// import { useFetch } from "src/lib/hooks/useFetch";
import { useAxios } from "../../../utils/axios";
import { tableStyles } from "../../Components/vendor/shared/ConfirmDialog";
import Sidebar from "../../Components/sidebar/Siderbar";
import AdminNavbar from "../../Components/navbar/VendorNavbar";
import { FaArrowDown, FaCartArrowDown, FaCheckCircle, FaEye, FaTimesCircle } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
// import CustomPagination from "src/componets/customPagination";
// import { ErrorDispaly } from "../property";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// import * as XLSX from 'xlsx';
import ExcelJS from "exceljs";
import { CiExport } from "react-icons/ci";
import { PiWarningCircleBold } from "react-icons/pi";
import { CircleOutlined } from "@mui/icons-material";
import { GrStatusGood } from "react-icons/gr";
import StockPopup from "./StockPopup";



const toDataURL = (url) => {
    const promise = new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.readAsDataURL(xhr.response);
            reader.onloadend = function () {
                resolve({ base64Url: reader.result });
            };
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
    });

    return promise;
};



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
const rows = [
    { id: 1, totalOrder: 10000, name: 'Blutooth Devices', price: 14, totalSales: 123456 },
    { id: 2, totalOrder: 10000, name: 'Airpods', price: 31, totalSales: 123456 },
    { id: 3, totalOrder: 10000, name: 'Neck Band', price: 71, totalSales: 123456 },
    { id: 4, totalOrder: 10000, name: 'IR Remote', price: 31, totalSales: 123456 },
    { id: 5, totalOrder: 10000, name: 'Smart Watch', price: 40, totalSales: 123456 },
    { id: 6, totalOrder: 10000, name: 'Power Bank', price: 150, totalSales: 123456 },
];

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        renderCell: (params) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <AccountCircleIcon style={{ marginRight: '5px' }} />
                {params.value}
            </div>
        ),
        editable: true,
    },
    {
        field: 'totalOrder',
        headerName: 'Total Order',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'totalSales',
        headerName: 'Total Sales',
        type: 'number',
        width: 110,
        editable: true,
    },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.row.firstName || ''} ${params.row.totalOrder || ''}`,
    // },
];

// give main area a max widht
const ProductManagementVendor = () => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const instance = useAxios(token);
    const [allProducts, setAllProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState(
        null
    );
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 100,
    });
    const [name, setName] = useState("");
    const [selected, setSelected] = useState("All");
    const [cookies, setCookies] = useCookies(["vendorToken"]);
    const navigate = useNavigate();


    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRows, setFilteredRows] = useState([]);
    const [vendorProducts, setVendorProducts] = useState([]);
    const [vendorId, setVendorId] = useState('');

    const [popupOpen, setPopupOpen] = useState(false);

    if (vendorProducts) console.log("Vendor Products:", vendorProducts);

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
        filterRows(event.target.value);
    };

    const filterRows = (query) => {
        const filtered = vendorProducts.filter((row) => {
            const { name, category, subCategory, brand, stock } = row;
            const searchFields = [name, category, subCategory, brand, stock.toString()];
            return searchFields.some((field) =>
                field.toLowerCase().includes(query.toLowerCase())
            );
        });
        setFilteredRows(filtered);
    };

    // Low stock Functionalities
    const lowStockProducts = vendorProducts.filter((product) => product.stock < 5 && product.isVerified === "true");

    if (lowStockProducts) console.log("Low Stock Products:", lowStockProducts);

    const handleStockCheck = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };


    if (vendorProducts) {
        console.log(vendorProducts, "dshfsjkdfsjk")
    }


    useEffect(() => {
        if (cookies && cookies.vendorToken) {
            console.log(cookies.vendorToken, "fdsfsdfsf")
            setToken(cookies.vendorToken);
        }
    }, [cookies]);



    const getProductsByVendors = async () => {
        setLoading(true)
        try {

            const res = await instance.get(`/product/getProductByVendorId/${vendorId}`)
            if (res.data) {
                // setAllProducts(res.data.products)
                console.log(res.data.data, "productsss")
                setVendorProducts(res.data.data)
                setLoading(false)
            }


        } catch (error) {
            console.log(error);
            setLoading(false)
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
        }
    }, [token])

    useEffect(() => {
        if (vendorId) {
            getProductsByVendors()
        }
    }, [vendorId])


    async function deleteProduct() {
        try {
            setDeleteLoading(true);
            const res = await instance.delete("/admin/product/" + deleteId);
            if (res.data) {
                toast.success("Product Deleted Successfully");
                setDeleteLoading(false);
                setDeleteOpen(false);
                getProductsByVendors();
                // getAllUsers();
            }
        } catch (e) {
            setDeleteLoading(false);
            console.log(e)
            // ErrorDispaly(e);
        }
    }



    const all_customer_columns = [
        {
            flex: 0.25,
            minWidth: 150,

            field: "productName",
            headerName: "Product Name",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <Typography variant="body1" fontWeight={500}>
                    {row?.name}
                </Typography>
            ),
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "category",
            headerName: "Category",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "subCategory",
            headerName: "Sub Category",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "brand",
            headerName: "Brand",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "price",
            headerName: "Selling Price",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "stock",
            headerName: "In-Stock",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },

        {
            minWidth: 150,

            field: "isVerified",
            headerName: "Status",
            flex: 0.15,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) => {
                // Convert string to boolean
                const isActive = row.isVerified === "true";

                return (
                    <Box>
                        <Tooltip title="Verification Status">
                            <IconButton>
                                {isActive ? <FaCheckCircle style={{ color: 'green' }} /> : <FaTimesCircle style={{ color: 'red' }} />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            }

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
                        <IconButton onClick={() => navigate(`/vendor/product/${row._id}`)} color="error">
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


    const exportExcelFile = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("My Sheet");
        sheet.properties.defaultRowHeight = 80;

        // sheet.getRow(1).border = {
        //     top: { style: "thick", color: { argb: "FFFF0000" } },
        //     left: { style: "thick", color: { argb: "000000FF" } },
        //     bottom: { style: "thick", color: { argb: "F08080" } },
        //     right: { style: "thick", color: { argb: "FF00FF00" } },
        // };

        // sheet.getRow(1).fill = {
        //     type: "pattern",
        //     pattern: "darkVertical",
        //     // fgColor: { argb: "#04a7ff" },
        // };

        sheet.getRow(1).font = {
            name: "Comic Sans MS",
            family: 4,
            size: 16,
            bold: true,
        };

        sheet.columns = [
            {
                header: "Id",
                key: "_id",
                width: 10,
            },
            { header: "Name", key: "name", width: 45 },
            {
                header: "Brand",
                key: "brand",
                width: 20,
            },
            {
                header: "Category",
                key: "category",
                width: 20,
            },
            {
                header: "Sub Category",
                key: "subCategory",
                width: 20,
            },
            {
                header: "Price",
                key: "price",
                width: 15,
            },
            {
                header: "MRP",
                key: "mrp",
                width: 15,
            },
            {
                header: "Stock",
                key: "stock",
                width: 15,
            },
            {
                header: "Warranty Period",
                key: "warrantyPeriod",
                width: 15,
            },
            // {
            //     header: "Description",
            //     key: "description",
            //     width: 10,
            // },
            // {
            //     header: "Photo",
            //     key: "thumbnail",
            //     width: 30,
            // },
        ];

        const promise = Promise.all(
            vendorProducts?.map(async (product, index) => {
                const rowNumber = index + 1;
                sheet.addRow({
                    _id: product?._id,
                    name: product?.name,
                    brand: product?.brand,
                    category: product?.category,
                    subCategory: product?.subCategory,
                    price: product?.price,
                    mrp: product?.mrp,
                    stock: product?.stock,
                    warrantyPeriod: product?.warrantyPeriod,

                });
                // Function to inser the images to

                // console.log(product?.thumbnail);
                // const result = await toDataURL(product?.thumbnail);
                // const splitted = product?.thumbnail.split(".");
                // const extName = splitted[splitted.length - 1];

                // const imageId2 = workbook.addImage({
                //   base64: result.base64Url,
                //   extension: extName,
                // });

                // sheet.addImage(imageId2, {
                //   tl: { col: 6, row: rowNumber },
                //   ext: { width: 100, height: 100 },
                // });
            })
        );

        promise.then(() => {

            //FUnction to style the particular cell

            //   const priceCol = sheet.getColumn(5);

            // iterate over all current cells in this column
            //   priceCol.eachCell((cell) => {
            //     const cellValue = sheet.getCell(cell?.address).value;
            //     // add a condition to set styling
            //     if (cellValue > 50 && cellValue < 1000) {
            //       sheet.getCell(cell?.address).fill = {
            //         type: "pattern",
            //         pattern: "solid",
            //         fgColor: { argb: "FF0000" },
            //       };
            //     }
            //   });

            workbook.xlsx.writeBuffer().then(function (data) {
                const blob = new Blob([data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                const url = window.URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.href = url;
                anchor.download = "download.xlsx";
                anchor.click();
                window.URL.revokeObjectURL(url);
            });
        });
    };


    //     const deliveredOrders =
    //     allProducts?.filter((order) => order.status === "Delivered") || [];
    // const deliveredPercentage =
    //     allOrders && allOrders.length > 0
    //         ? ((deliveredOrders.length / allOrders.length) * 100).toFixed(2)
    //         : 0;



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

                        <div className="flex justify-between mt-4 ">
                            <div className="ml-6">
                                <div className="p-3 bg-white rounded-lg ml-6">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-5 items-center justify-center">
                                            <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                                <MdInventory />
                                            </div>
                                            <div>
                                                <p className="text-primary-blue font-bold text-xl">Summary</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex items-center justify-start gap-20 w-full">
                                        <div className="flex flex-col items-start justify-center">
                                            <p className="text-gray-400">
                                                All Products
                                            </p>
                                            <Typography
                                                paragraph
                                                style={{ fontWeight: "500", color: "black" }}
                                            >
                                                {vendorProducts && vendorProducts.length}

                                            </Typography>

                                        </div>
                                        <div className="flex flex-col ml-11 items-start justify-center">
                                            <p className=" text-gray-400">
                                                Active Products
                                            </p>
                                            <Typography
                                                paragraph
                                                style={{ fontWeight: "500", color: "black" }}
                                            >
                                                {vendorProducts &&
                                                    vendorProducts.filter((product) => product.isVerified === "true")
                                                        .length}
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col items-start justify-center">
                                            <p className=" text-gray-400">
                                                Inactive Products
                                            </p>
                                            <Typography
                                                paragraph
                                                style={{ fontWeight: "500", color: "black" }}
                                            >
                                                {vendorProducts &&
                                                    vendorProducts.filter((product) => product.isVerified === "false")
                                                        .length}
                                            </Typography>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="flex justify-end items-center mt-8 mb-6 px-4">
                                <Button
                                    sx={{
                                        background: lowStockProducts.length > 0 ? "red" : "green",
                                        display: "flex",
                                        gap: "10px",
                                    }}
                                    variant="contained"
                                    onClick={handleStockCheck}
                                    disabled={loading} // Disable button when loading
                                >

                                    {loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : (
                                        "Stock"
                                    )}
                                    {lowStockProducts.length > 0 ? (
                                        <PiWarningCircleBold
                                            sx={{ position: "absolute", top: "5px", right: "5px", width: "20px", height: "20px" }}
                                        />
                                    ) : (
                                        <GrStatusGood
                                            sx={{ position: "absolute", top: "5px", right: "5px", width: "20px", height: "20px" }}
                                        />
                                    )}
                                </Button>
                                <div className=" text-sm px-3 flex gap-4">
                                    <button
                                        onClick={() => navigate("/vendor/addProduct")}
                                        className=" px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
                                    >
                                        <span>
                                            <TbEdit className="w-6 h-6" />
                                        </span>
                                        <span>Add Product</span>
                                    </button>
                                    {/* <button
                                    onClick={exportExcelFile}
                                    className=" px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
                                >
                                    <span> 
                                        <CiExport className="w-6 h-6 font-bold" />
                                    </span>
                                    <span>Export Products</span>
                                </button> */}
                                </div>
                            </div>

                        </div>


                        <div className="flex justify-between items-center mb-8  px-4">
                            <div className="space-x-5">
                                <p className="text-2xl ">Inventory Items</p>
                            </div>


                            <div className="flex space-x-[12px]">
                                <div className="flex items-center bg-white p-2 rounded-lg space-x-3">
                                    <AiOutlineSearch className="text-xl" />
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={searchQuery}
                                        onChange={handleSearchQueryChange}
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
                                        rows={searchQuery ? filteredRows : vendorProducts}
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
                                        pageSizeOptions={[25, 50, 500, 1000]}
                                        rowCount={pagination?.totalUsers}
                                        paginationMode="server"
                                        onPaginationModelChange={setPaginationModel}
                                        sx={tableStyles}
                                    />
                                </Card>
                            </Grid>
                        </Grid>

                        <ConfirmBox
                            title="Product"
                            name="product"
                            open={deleteOpen}
                            closeDialog={() => setDeleteOpen(false)}
                            toDoFunction={deleteProduct}
                            loading={deleteLoading}
                            sx={{ pb: 4, border: "2px solid red" }}
                        />

                        <StockPopup
                            open={popupOpen}
                            handleClose={handleClosePopup}
                            products={lowStockProducts}
                        />
                    </div>}
                </div>
                {/* </main> */}
            </div>
        </div >

        // </div>
    );
};

export default ProductManagementVendor;
