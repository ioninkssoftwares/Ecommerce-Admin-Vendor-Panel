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

const DashboardVendor = () => {
    const [time, setTime] = React.useState("");

    const handleChange = (event) => {
        setTime(event.target.value);
    };
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <div>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    <main className="mx-10 mb-10">
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h5">Welcome back, Vendor</Typography>
                            <FormControl sx={{
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
                            </FormControl>
                        </Box>

                        <Box
                            sx={{
                                // justifyContent: "space-between",
                                marginTop: "15px",
                                marginBottom: "25px",
                                display: 'flex',
                                // display: isMobile ? 'none' : 'flex'
                                flexDirection: isMobile ? 'column' : 'row'


                            }}
                        >
                            <BarChartOne />
                            <BarChartTwo />
                            <PieChartThree />
                        </Box>
                        <Box
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
                        </Box>

                        <Box sx={{
                            display: isMobile ? 'none' : 'block'
                        }}>
                            <SellingProducts />
                            <CustomersOrders />
                            <SaleVsDate />
                        </Box>
                    </main>
                </div>
            </div>
        </div>
    )
}
export default DashboardVendor