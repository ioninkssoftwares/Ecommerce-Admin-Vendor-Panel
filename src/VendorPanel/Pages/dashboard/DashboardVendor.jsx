import React from "react";
import Sidebar from "../../Components/sidebar/Siderbar"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BarChartOne from "../../../Page/Charts/BarChartOne";
import BarChartTwo from "../../../Page/Charts/BarChartTwo";
import PieChartThree from "../../../Page/Charts/PieChartThree";
import RangeChartFour from "../../../Page/Charts/RangeChartFour";
import TableChartFive from "../../../Page/Charts/TableChartFive";
import CardChartSix from "../../../Page/Charts/CardChartSix";
import SellingProducts from "../../../Page/Charts/DashboardSections/SellingProducts";
import CustomersOrders from "../../../Page/Charts/DashboardSections/CustomersOrders";
import SaleVsDate from "../../../Page/Charts/DashboardSections/SaleVsDate";
import { useMediaQuery } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useAxios } from "../../../utils/axios";
import { MdInventory } from "react-icons/md";
import VendorNavbar from "../../Components/navbar/VendorNavbar";

const DashboardVendor = () => {
    const [time, setTime] = React.useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [cookies, setCookies] = useCookies(["vendorToken"]);
    const [allOrders, setAllOrders] = useState([]);
    const [vendorProducts, setVendorProducts] = useState([]);
    const [vendorId, setVendorId] = useState('');


    const instance = useAxios(token);
    const handleChange = (event) => {
        setTime(event.target.value);
    };
    const isMobile = useMediaQuery('(max-width:600px)');


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
            getProductsByVendors()
        }
    }, [vendorId])


    useEffect(() => {
        if (cookies && cookies.vendorToken) {
            console.log(cookies.vendorToken, "fdsfsdfsf")
            setToken(cookies.vendorToken);
        }
    }, [cookies]);

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
          <div className="relative flex flex-1 flex-col bg-gray-50 overflow-y-auto overflow-x-hidden">
            <VendorNavbar />
            <main className="mx-10 mb-10 ">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ marginTop: "5px" }} variant="h5">
                  Welcome back, Vendor
                </Typography>
                {/* <FormControl sx={{
                                m: 1,
                                minWidth: 250,
                            }} size="small">
                                {isMobile ? "" : <>  <InputLabel id="demo-select-small-label">Today</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={time}
                                        label="Time"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={7}>Weekly</MenuItem>
                                        <MenuItem value={30}>Monthly</MenuItem>
                                        <MenuItem value={365}>Yearly</MenuItem>
                                    </Select> </>}
                            </FormControl> */}
              </Box>

              <Box
                sx={{
                  // justifyContent: "space-between",
                  marginTop: "15px",
                  marginBottom: "25px",
                  display: "flex",
                  // display: isMobile ? 'none' : 'flex'
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <BarChartOne
                  allProductsCount={vendorProducts && vendorProducts.length}
                  activeProductsCount={
                    vendorProducts &&
                    vendorProducts.filter(
                      (product) => product.isVerified === "true"
                    ).length
                  }
                  inactiveProductsCount={
                    vendorProducts &&
                    vendorProducts.filter(
                      (product) => product.isVerified === "false"
                    ).length
                  }
                  loading={loading}
                />

                <BarChartTwo
                  allOrdersCount={allOrders && allOrders.length}
                  processingOrders={
                    allOrders &&
                    allOrders.filter(
                      (product) => product.status === "Processing"
                    ).length
                  }
                  shippedOrders={
                    allOrders &&
                    allOrders.filter((product) => product.status === "Shipped")
                      .length
                  }
                  deliveredOrders={
                    allOrders &&
                    allOrders.filter(
                      (product) => product.status === "Delivered"
                    ).length
                  }
                  returnedOrders={
                    allOrders &&
                    allOrders.filter((product) => product.status === "Returned")
                      .length
                  }
                  cancelledOrders={
                    allOrders &&
                    allOrders.filter(
                      (product) => product.status === "Cancelled"
                    ).length
                  }
                  deliveredPercentage={deliveredPercentage}
                  loading={loading}
                />
                {/* <PieChartThree /> */}
              </Box>

              <Box
                sx={{
                  // justifyContent: "space-between",
                  marginTop: "30px",
                  marginBottom: "25px",
                  display: "flex",
                  // display: isMobile ? 'none' : 'flex'
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <div
                  style={{
                    width: isMobile ? "100%" : "32%",
                    marginBottom: isMobile ? "30px" : "0",
                    marginRight: isMobile ? "0" : "30px",
                    marginLeft: isMobile ? "0" : "30px",
                  }}
                  className="p-3 bg-white rounded-lg ml-6"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-5 items-center justify-center">
                      <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                        <MdInventory />
                      </div>
                      <div>
                        <p className="text-primary-blue font-bold text-xl">
                          Products Summary
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-start gap-20 w-full">
                    <div className="flex flex-col items-start justify-center">
                      <p className="text-gray-400">All Products</p>
                      <Typography
                        paragraph
                        style={{ fontWeight: "500", color: "black" }}
                      >
                        {vendorProducts && vendorProducts.length}
                      </Typography>
                    </div>
                    <div className="flex flex-col ml-11 items-start justify-center">
                      <p className=" text-gray-400">Active Products</p>
                      <Typography
                        paragraph
                        style={{ fontWeight: "500", color: "black" }}
                      >
                        {vendorProducts &&
                          vendorProducts.filter(
                            (product) => product.isVerified === "true"
                          ).length}
                      </Typography>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <p className=" text-gray-400">Inactive Products</p>
                      <Typography
                        paragraph
                        style={{ fontWeight: "500", color: "black" }}
                      >
                        {vendorProducts &&
                          vendorProducts.filter(
                            (product) => product.isVerified === "false"
                          ).length}
                      </Typography>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: isMobile ? "100%" : "32%",
                    marginBottom: isMobile ? "30px" : "0",
                    marginRight: isMobile ? "0" : "30px",
                    marginLeft: isMobile ? "0" : "30px",
                  }}
                  className="p-3 bg-white rounded-lg ml-6"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-5 items-center justify-center">
                      <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                        <PeopleOutlineIcon />
                      </div>
                      <div>
                        <p className="text-primary-blue font-bold text-xl">
                          {" "}
                          Orders Summary
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="mt-8 flex items-center justify-start gap-20 w-full">
                      <div className="flex flex-col items-start justify-center">
                        <p className="text-gray-400">All Orders</p>
                        <Typography
                          paragraph
                          style={{ fontWeight: "500", color: "black" }}
                        >
                          {allOrders && allOrders.length}
                          {/* <span
                                                    style={{
                                                        fontSize: "12px",
                                                        color: "green",
                                                        marginLeft: "4px",
                                                    }}
                                                >

                                                    {allOrders && allOrders.length > 0 && `+${deliveredPercentage}%`}
                                                </span> */}
                        </Typography>
                      </div>
                      <div className="flex flex-col ml-11 items-start justify-center">
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
                    </div>
                    <div className="mt-2 flex items-center justify-start gap-20 w-full">
                      <div className="flex flex-col items-start justify-center">
                        <p className="text-gray-400">Processing Orders</p>
                        <Typography
                          paragraph
                          style={{ fontWeight: "500", color: "black" }}
                        >
                          {allOrders &&
                            allOrders.filter(
                              (product) => product.status === "Processing"
                            ).length}
                        </Typography>
                      </div>
                      <div className="flex flex-col items-start justify-center">
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
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        <p className=" text-gray-400">Cancelled Orders</p>
                        <Typography
                          paragraph
                          style={{ fontWeight: "500", color: "black" }}
                        >
                          {allOrders &&
                            allOrders.filter(
                              (product) => product.status === "Cancelled"
                            ).length}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
              {/* <Box
                            sx={{
                                justifyContent: "space-between",
                                marginTop: "15px",
                                marginBottom: "15px",
                                display: isMobile ? 'none' : 'flex'
                            }}
                        >
                            <RangeChartFour />
                            <TableChartFive />
                            <CardChartSix />
                        </Box> */}

              {/* <Box sx={{
                            display: isMobile ? 'none' : 'block'
                        }}>
                            <SellingProducts />
                            <CustomersOrders />
                            <SaleVsDate />
                        </Box> */}
            </main>
          </div>
        </div>
      </div>
    );
}
export default DashboardVendor