import React from "react";
import { useEffect, useState } from "react";
import SideBar from "../../Component/SideBar";
import ModalTable from "./ModalTable";
import OderManagementTable from "./OrderManagementTable";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PaymentIcon from "@mui/icons-material/Payment";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { saveAs } from "file-saver"; // Import saveAs from file-saver
import * as XLSX from "xlsx";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ToastContainer } from "react-toastify";

export default function OrderManagement() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const [orders, setOrders] = useState([]);
  const [time, setTime] = React.useState("");
  const [open, openchange] = React.useState(false);
  useEffect(() => {
    const token = cookies.token;

    if (!token) {
      navigate("/loginadmin");
    } else {
      setTokenAvailable(true);
    }
  }, [cookies, navigate]);
  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const functionopenpopup = () => {
    openchange(true);
  };

  const closepopup = () => {
    openchange(false);
  };
  const [tokenAvailable, setTokenAvailable] = useState(false);

  useEffect(() => {
    const token = cookies.token;

    if (!token) {
      navigate("/loginadmin");
    } else {
      setTokenAvailable(true);
    }
  }, [cookies, navigate]);

  const fetchData = async () => {
    const token = cookies.token;
    if (!token) {
      navigate("/loginadmin");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/orders/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      if (data.success && data.orders) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDownloadExcel = () => {
    const workbook = XLSX.utils.book_new();

    const ordersData = orders.map((order, index) => {
      const orderData = {
        User: order.user || "undefined",
        Subtotal: order.subtotal,
        "Shipping Charges": order.shippingCharges,
        Discount: order.discount,
        Total: order.total,
        Status: order.status,
        "Shipping Address": `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}, ${order.shippingInfo.pinCode}`,
      };

      // Adding order items
      order.orderItems.forEach((item, itemIndex) => {
        orderData[`Order Item ${itemIndex + 1} - Item Name`] = item.name;
        orderData[`Order Item ${itemIndex + 1} - Item Price`] = item.price;
        orderData[`Order Item ${itemIndex + 1} - Item Quantity`] =
          item.quantity;
        orderData[`Order Item ${itemIndex + 1} - Item Warranty Period`] =
          item.warrantyPeriod;
        orderData[`Order Item ${itemIndex + 1} - Item Product ID`] =
          item.productId;
      });

      return orderData;
    });

    const worksheet = XLSX.utils.json_to_sheet(ordersData, {
      header: Object.keys(ordersData[0]), // Use the header from the first order
    });
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "orders.xlsx");
  };

  const countOrdersByStatus = (status) => {
    return orders.filter((order) => order.status === status).length;
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Box sx={{ marginTop: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleDownloadExcel}
              sx={{ background: "orange" }}
              variant="contained"
            >
              Order Summary
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
            marginBottom: "20px",
          }}
        >
          <div className="OrderManagement01">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ShoppingBagIcon
                sx={{
                  color: "orange",
                  background: "#ffeb99",
                  p: 1,
                  fontSize: "40px",
                  borderRadius: "10px",
                }}
              />
              <FormControl
                sx={{ m: 1, minWidth: 120, alignSelf: "flex-start" }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">Today</InputLabel>
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
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "15px" }}>
                All Orders
                <br />
                <Typography paragraph style={{ fontWeight: "800" }}>
                  {orders.length}
                </Typography>
              </Typography>

              <Typography variant="h6" sx={{ fontSize: "15px" }}>
                Pending
                <br />
                <Typography paragraph style={{ fontWeight: "800" }}>
                  {countOrdersByStatus("Pending")}
                </Typography>
              </Typography>

              <Typography variant="h6" sx={{ fontSize: "15px" }}>
                Completed
                <br />
                <Typography paragraph style={{ fontWeight: "800" }}>
                  {countOrdersByStatus("Delivered")}
                </Typography>
              </Typography>
            </Box>
          </div>

          <div className="OrderManagement01">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ShoppingBagIcon
                sx={{
                  color: "orange",
                  background: "#ffeb99",
                  p: 1,
                  fontSize: "40px",
                  borderRadius: "10px",
                }}
              />
              <FormControl
                sx={{ m: 1, minWidth: 120, alignSelf: "flex-start" }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">Today</InputLabel>
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
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "15px" }}>
                Cancelled
                <br />
                <Typography paragraph style={{ fontWeight: "800" }}>
                  90
                  <span
                    style={{
                      color: "orange",
                      fontSize: "12px",
                      fontWeight: "200",
                    }}
                  >
                    -20%
                  </span>
                </Typography>
              </Typography>

              <Typography variant="h6" sx={{ fontSize: "15px" }}>
                Returned
                <br />
                <Typography paragraph style={{ fontWeight: "800" }}>
                  20
                </Typography>
              </Typography>

              <Typography variant="h6" sx={{ fontSize: "15px" }}>
                Damaged
                <br />
                <Typography paragraph style={{ fontWeight: "800" }}>
                  9
                </Typography>
              </Typography>
            </Box>
          </div>

          <div className="OrderManagement01">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ShoppingCartIcon
                sx={{
                  color: "orange",
                  background: "#ffeb99",
                  p: 1,
                  fontSize: "40px",
                  borderRadius: "10px",
                }}
              />
              <FormControl
                sx={{ m: 1, minWidth: 120, alignSelf: "flex-start" }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">Today</InputLabel>
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
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: "15px", color: "orange" }}
              >
                Abandoned Cart
                <br />
                <Typography
                  paragraph
                  style={{ fontWeight: "800", color: "black" }}
                >
                  09%
                  <span
                    style={{
                      color: "green",
                      fontSize: "12px",
                      fontWeight: "200",
                    }}
                  >
                    +0.00%
                  </span>
                </Typography>
              </Typography>

              <Typography variant="h6" sx={{ fontSize: "15px" }}>
                Customers
                <br />
                <Typography paragraph style={{ fontWeight: "800" }}>
                  45
                </Typography>
              </Typography>
            </Box>
          </div>
        </Box>

        <OderManagementTable />
      </Box>
      <ToastContainer/>
    </Box>
  );
}
