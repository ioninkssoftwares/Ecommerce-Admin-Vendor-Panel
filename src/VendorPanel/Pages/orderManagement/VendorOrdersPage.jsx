import {
  Box,
  Card,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
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
import DateRangeIcon from "@mui/icons-material/DateRange";
import { tableStyles } from "../../Components/vendor/shared/ConfirmDialog";
import ConfirmBox from "../../Components/vendor/shared/ConfirmDialog";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import OrderDetailsModal from "../../Components/vendor/modals/OrderDetailsModal";
// import { DatePicker} from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import format from 'date-fns/format';
import dayjs from "dayjs"; // Import dayjs for date manipulation
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useMemo } from "react";
import Button from "@mui/material/Button";
// import 'dayjs/locale/en'; // Optionally, set locale

// export const Button = ({ name, Icon, Color }) => {
//   return (
//     <div
//       className={
//         Color +
//         " bg-white font-bold w-full rounded-sm shadow-sm flex space-x-1 items-center justify-center px-4 p-1 max-w-max border border-[#DEDEDE]"
//       }
//     >
//       <div className="text-xs">{<Icon />}</div>
//       <div>
//         <p className=" text-[10px]">{name}</p>
//       </div>
//     </div>
//   );
// };

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
  const [vendorId, setVendorId] = useState("");

  const instance = useAxios(token);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [name, setName] = useState("");
  const [selected, setSelected] = useState("All");
  // const router = useRouter();
  const navigate = useNavigate();

  const sortedOrders = useMemo(() => {
    return [...allOrders].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [allOrders]);

  const statusOptions = [
    "None",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState(allOrders);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [openDateRangePicker, setOpenDateRangePicker] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] =
    React.useState("None");
  const [searchText, setSearchText] = React.useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (filteredRows) console.log(filteredRows, "dlkfsjkldsjflk");

  const handleStatusFilterChange = (event) => {
    setSelectedStatusFilter(event.target.value);
  };

  const clearDateRangeFilter = () => {
    setFromDate(""); // Clear from date
    setToDate(""); // Clear to date
  };

  // useEffect(() => {
  //   applyFilters();
  // }, [searchQuery, statusFilter, selectedDate]);

  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  // const handleStatusFilterChange = (event) => {
  //   const status = event.target.value;
  //   setStatusFilter(status);
  // };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const clearDateFilter = () => {
    setSelectedDate(null);
  };

  const clearAllFilters = () => {
    setSearchQuery(""); // Clear the search text
    setSelectedStatusFilter("None"); // Reset the status filter to "None"
    setFromDate(null); // Reset the from date filter
    setToDate(null); // Reset the to date filter
  };

  // const applyFilters = () => {
  //     let searchFilteredRows = filterBySearchQuery(allOrders, searchQuery);
  //     let statusFilteredRows = filterByStatus(searchFilteredRows, statusFilter);
  //     let dateFilteredRows = filterByDate(statusFilteredRows, selectedDate);

  //     if (!searchQuery && !statusFilter && !selectedDate) {
  //         dateFilteredRows = allOrders;
  //     }

  //     setFilteredRows(dateFilteredRows);
  // };

  // const filterBySearchQuery = (rows, query) => {
  //     if (!query) return rows;
  //     return rows.filter((row) => {
  //         const { product, _id } = row;
  //         const { name, brand, category, subCategory } = product;
  //         const searchFields = [name, category, subCategory, brand, _id];
  //         return searchFields.some((field) =>
  //             field.toLowerCase().includes(query.toLowerCase())
  //         );
  //     });
  // };

  // const filterByStatus = (rows, status) => {
  //     if (!status) return rows;
  //     return rows.filter((row) => row.status === status);
  // };

  // const filterByDate = (rows, date) => {
  //     if (!date) return rows;
  //     return rows.filter((row) => {
  //         const createdAt = dayjs(row.createdAt);
  //         const selectedDateFormatted = date.format('YYYY-MM-DD');
  //         const rowDateFormatted = createdAt.format('YYYY-MM-DD');
  //         return selectedDateFormatted === rowDateFormatted;
  //     });
  // };

  const filteredOrders = allOrders.filter((order) => {
    // Search conditions
    const nameMatch = order?.user?.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const productNameMatch = order?.product?.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // const orderDateMatch = order.createdAt
    //   ? formatDate(order.createdAt).includes(searchQuery)
    //   : false;
    const subtotalMatch = order.subtotal
      ? order.subtotal.toString().includes(searchQuery)
      : false;
    const discountMatch = order.discount
      ? order.discount.toString().includes(searchQuery)
      : false;
    const shippingMatch = order.shippingCharges
      ? order.shippingCharges.toString().includes(searchQuery)
      : false;
    const totalMatch = order.total
      ? order.total.toString().includes(searchQuery)
      : false;
    const statusMatch = order.status
      ? order.status.toLowerCase().includes(searchQuery.toLowerCase())
      : false;
    const orderIdMatch = order._id
      ? order._id.toLowerCase().includes(searchQuery.toLowerCase())
      : false;

    // Combine search text filters
    const isMatch =
      nameMatch ||
      productNameMatch ||
      // orderDateMatch ||
      subtotalMatch ||
      discountMatch ||
      shippingMatch ||
      totalMatch ||
      statusMatch ||
      orderIdMatch;

    // Status filter - For any status except "Cancelled", isCancelled should be false
    const statusFilterMatch =
      selectedStatusFilter === "None" ||
      (selectedStatusFilter === "Cancelled" && order.isCancelled) ||
      (selectedStatusFilter !== "Cancelled" &&
        order.status === selectedStatusFilter &&
        order.isCancelled === false);

    // Date range filter
    const orderDate = new Date(order.createdAt);
    const isAfterFromDate =
      !fromDate ||
      new Date(
        orderDate.getFullYear(),
        orderDate.getMonth(),
        orderDate.getDate()
      ) >= new Date(fromDate);
    const isBeforeOrEqualToToDate =
      !toDate ||
      new Date(
        orderDate.getFullYear(),
        orderDate.getMonth(),
        orderDate.getDate()
      ) <= new Date(toDate);

    // Final condition combining all filters
    return (
      isMatch && statusFilterMatch && isAfterFromDate && isBeforeOrEqualToToDate
    );
  });

  if (filteredOrders) {
    console.log(filteredOrders, "jsdahfaksdjhf");
  }

  const getOrdersByVendorId = async () => {
    try {
      setLoading(true);
      const res = await instance.get(`/vendor/getOrderByVendorId/${vendorId}`);
      if (res.data) {
        setLoading(false);
        setAllOrders(res.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
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
    console.log(token, "tokeeen");
    try {
      const res = await instance.get(`/vendor/getVendorIdByToken`);
      if (res.data) {
        console.log(res.data.id, "yuyiyui");
        setVendorId(res.data.id);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      // ErrorDispaly(e);
    }
  };

  useEffect(() => {
    if (token) {
      getVendorDetails();
    }
  }, [token]);

  useEffect(() => {
    if (vendorId) {
      getOrdersByVendorId();
    }
  }, [vendorId]);

  useEffect(() => {
    if (cookies && cookies.vendorToken) {
      console.log(cookies.vendorToken, "fdsfsdfsf");
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
        getOrdersByVendorId();
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
        <Typography
          variant="body1"
          fontWeight={500}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "150px",
          }}
        >
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
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "250px",
          }}
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
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Typography variant="body1" fontWeight={500}>
          {new Date(row?.createdAt).toLocaleDateString("en-GB")}
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
        if (!product || !user) return "";

        switch (user.userType) {
          case "freeUser":
            return product.freeUser;
          case "goldUser":
            return product.goldUser;
          case "silverUser":
            return product.silverUser;
          default:
            return "";
        }
      },
      renderCell: ({ row }) => (
        <Typography variant="body1" fontWeight={500}>
          {row?.product &&
            row?.user &&
            (() => {
              switch (row.user.userType) {
                case "freeUser":
                  return row.product.freeUser;
                case "goldUser":
                  return row.product.goldUser;
                case "silverUser":
                  return row.product.silverUser;
                default:
                  return "";
              }
            })()}
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
      valueFormatter: (params) => {
        const value = Number(params.value);

        // If the value has decimal places, format to 2 decimal places, otherwise show as a whole number
        return Number.isInteger(value) ? value.toString() : value.toFixed(2);
      },
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

    // {
    //     minWidth: 150,

    //     field: "status",
    //     headerName: "Order Status",
    //     flex: 0.25,
    //     align: "left",
    //     headerAlign: "left",
    //     disableColumnMenu: true,
    // },

    {
      minWidth: 150,
      field: "status",
      headerName: "Order Status",
      flex: 0.25,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) =>
        row.isCancelled ? (
          <span style={{ color: "red" }}>Cancelled</span>
        ) : (
          row.status
        ),
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
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <main> */}
          {loading ? (
            <div className="flex items-center justify-center text-3xl h-full">
              <CircularProgress className="text-3xl" />
            </div>
          ) : (
            <div className="bg-gray-50">
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
                        <p className="text-primary-blue font-bold text-xl">
                          Summary
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[8.8rem] mt-4">
                    {/* <div className="mt-8 flex items-center justify-start gap-20 w-full"> */}
                    <div className="flex flex-col items-start justify-center">
                      <p className="text-gray-400">All Orders</p>
                      <Typography
                        paragraph
                        style={{
                          fontWeight: "500",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        {allOrders && allOrders.length}
                        {/* <span
                            style={{
                              fontSize: "12px",
                              color: "green",
                            }}
                          >
                            {allOrders &&
                              allOrders.length > 0 &&
                              `+${deliveredPercentage}%`}
                          </span> */}
                      </Typography>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <p className=" text-gray-400">Delivered Orders</p>
                      <Typography
                        paragraph
                        style={{ fontWeight: "500", color: "black" }}
                      >
                        {allOrders &&
                          allOrders.filter(
                            (product) => product.status === "Delivered"
                          ).length}
                      </Typography>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <p className=" text-gray-400">Shipped Orders</p>
                      <Typography
                        paragraph
                        style={{ fontWeight: "500", color: "black" }}
                      >
                        {allOrders &&
                          allOrders.filter(
                            (product) => product.status === "Shipped"
                          ).length}
                      </Typography>
                    </div>

                    <div className="flex flex-col items-start justify-center">
                      <p className="text-gray-400">Processing Orders</p>
                      <Typography
                        paragraph
                        style={{ fontWeight: "500", color: "black" }}
                      >
                        {allOrders &&
                          allOrders.filter(
                            (product) =>
                              product.status === "Processing" &&
                              product.isCancelled === false
                          ).length}
                      </Typography>
                    </div>
                    {/* <div className="flex flex-col items-start justify-center">
                        <p className=" text-gray-400">Returned Orders</p>
                        <Typography
                          paragraph
                          style={{ fontWeight: "500", color: "black" }}
                        >
                          {allOrders &&
                            allOrders.filter(
                              (product) => product.status === "Returned"
                            ).length}
                        </Typography>
                      </div> */}
                    <div className="flex flex-col items-start justify-center">
                      <p className=" text-gray-400">Cancelled Orders</p>
                      <Typography
                        paragraph
                        style={{ fontWeight: "500", color: "black" }}
                      >
                        {/* {allOrders &&
                            allOrders.filter(
                              (product) => product.status === "Cancelled"
                            ).length} */}

                        {allOrders
                          ? allOrders.filter((order) => order.isCancelled)
                              .length
                          : 0}
                      </Typography>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>

              <div className="flex justify-between mb-8 mt-4  px-10">
                <div className="space-x-5">
                  <p className="text-2xl ">Orders </p>
                </div>
                <div className="flex">
                  <IconButton onClick={() => setOpenDateRangePicker(true)}>
                    <DateRangeIcon /> {/* Date range icon */}
                    <span style={{ fontSize: "0.8rem" }}>Date Range</span>
                  </IconButton>
                  <FormControl sx={{ ml: 2, minWidth: 120 }}>
                    <InputLabel id="status-filter-label">
                      Status Filter
                    </InputLabel>
                    <Select
                      labelId="status-filter-label"
                      id="status-filter-select"
                      value={selectedStatusFilter}
                      label="Status Filter"
                      onChange={handleStatusFilterChange}
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Paper
                    component="form"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: 400,
                      ml: 2,
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search Orders"
                      inputProps={{ "aria-label": "search orders" }}
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                    />
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>

                  <Tooltip title="Clear filter">
                    <IconButton
                      onClick={clearAllFilters}
                      sx={{ p: "10px" }}
                      aria-label="clear filter"
                    >
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>

              <Grid
                container
                spacing={6}
                sx={{ pb: 38, px: 4, overflowX: "scroll" }}
              >
                <Grid item xs={12}>
                  <Card sx={{ borderRadius: 2 }}>
                    <DataGrid
                      rows={
                        filteredOrders.length ? filteredOrders : sortedOrders
                      }
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
                      pageSizeOptions={[10, 25, 50, 75, 100]}
                      rowCount={pagination?.totalUsers}
                      // paginationMode="server"
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
            </div>
          )}
        </div>
        {/* </main> */}
      </div>
      <Dialog
        open={openDateRangePicker}
        onClose={() => setOpenDateRangePicker(false)}
      >
        <DialogTitle>Select Date Range</DialogTitle>
        <DialogContent>
          {/* Date pickers for selecting from and to dates */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              id="from-date"
              label="From Date"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginTop: "2%" }}
            />
            <TextField
              id="to-date"
              label="To Date"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setOpenDateRangePicker(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={clearDateRangeFilter}
              sx={{ marginLeft: 2, background: "orange" }}
            >
              Clear Date Range
            </Button>
            <Button
              variant="contained"
              onClick={() => setOpenDateRangePicker(false)}
              sx={{ marginLeft: 2, background: "orange" }}
            >
              Apply
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>

    // </div>
  );
};

export default VendorOrdersPage;
