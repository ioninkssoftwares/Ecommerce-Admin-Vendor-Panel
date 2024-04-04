import React, { useEffect, useState } from "react";

import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import UserManagementDetailsTable from "./UserManagementDetailsTable";
import FormLabel from "@mui/material/FormLabel";
import Switch from "@mui/base/Switch";
import PlaceIcon from "@mui/icons-material/Place";
import ClearIcon from "@mui/icons-material/Clear";
import { useCookies } from "react-cookie";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
export default function UserManagement() {
  const navigate = useNavigate();
  const [time, setTime] = React.useState("");
  const [open, openchange] = React.useState(false);
  const [isFirstChecked, setIsFirstChecked] = useState(true);
  const [cookies, setCookie] = useCookies(["token"]);

  const [tokenAvailable, setTokenAvailable] = useState(false);

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
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Box sx={{ marginTop: "1rem" }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <DialogTitle sx={{ fontWeight: "700" }}>
                    Add a New Customer
                  </DialogTitle>
                  <DialogTitle>
                    <ClearIcon
                      sx={{
                        color: "black",
                        background: "#ffeb99",
                        p: 1,
                        fontSize: "40px",
                        borderRadius: "10px",
                      }}
                    />
                  </DialogTitle>
                </Box>

                <DialogContent>
                  <DialogContentText>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "-20px",
                      }}
                    >
                      <Typography variant="h6">Customer Information</Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "25px",
                        marginBottom: "15px",
                      }}
                    >
                      <div className="UserManagementModal01">
                        <Box>
                          <Box>
                            <div className="UserManagementModal0101">
                              <Box>
                                <Box>
                                  <TextField
                                    id="outlined-basic"
                                    label="Customer Name"
                                    variant="outlined"
                                    sx={{ mt: 1, mb: 1, width: "100%" }}
                                  />
                                </Box>
                                <Box>
                                  <TextField
                                    id="outlined-basic"
                                    label="Customer Email"
                                    variant="outlined"
                                    sx={{ mt: 1, mb: 1, width: "100%" }}
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Box>
                                    <FormControl sx={{ mt: 1, mb: 1 }}>
                                      <InputLabel id="demo-select-small-label">
                                        <PlaceIcon />
                                        +00
                                      </InputLabel>
                                      <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={time}
                                        label="State"
                                        onChange={handleChange}
                                        sx={{
                                          pr: 12,
                                          pl: 12,
                                        }}
                                      >
                                        <MenuItem value="">
                                          <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={91}>+91</MenuItem>
                                        <MenuItem value={92}>+92</MenuItem>
                                        <MenuItem value={93}>+93</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Box>
                                  <Box>
                                    <TextField
                                      id="outlined-basic"
                                      label="Mobile Number"
                                      variant="outlined"
                                      sx={{ mt: 1, mb: 1, width: "100%" }}
                                    />
                                  </Box>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mt: 1,
                                    mb: 1,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <FormLabel
                                      id="demo-radio-buttons-group-label"
                                      sx={{ mr: 1 }}
                                    >
                                      Add Address
                                    </FormLabel>
                                    <div>
                                      <Switch
                                        onChange={() =>
                                          setIsFirstChecked(!isFirstChecked)
                                        }
                                      />
                                    </div>
                                  </Box>
                                </Box>
                                {isFirstChecked ? (
                                  ""
                                ) : (
                                  <Box>
                                    <Box>
                                      <TextField
                                        id="outlined-basic"
                                        label="Building No. Streel Address"
                                        variant="outlined"
                                        sx={{ mt: 1, mb: 1, width: "100%" }}
                                      />
                                    </Box>

                                    <Box>
                                      <TextField
                                        id="outlined-basic"
                                        label="Landmark"
                                        variant="outlined"
                                        sx={{ mt: 1, mb: 1, width: "100%" }}
                                      />
                                    </Box>

                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Box sx={{ width: "49%" }}>
                                        <FormControl
                                          sx={{ mt: 1, mb: 1, width: "100%" }}
                                        >
                                          <InputLabel id="demo-select-small-label">
                                            State
                                          </InputLabel>
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
                                            <MenuItem value={7}>
                                              Weekly
                                            </MenuItem>
                                            <MenuItem value={30}>
                                              Monthly
                                            </MenuItem>
                                            <MenuItem value={365}>
                                              Yearly
                                            </MenuItem>
                                          </Select>
                                        </FormControl>
                                      </Box>

                                      <Box sx={{ width: "49%" }}>
                                        <FormControl
                                          sx={{ mt: 1, mb: 1, width: "100%" }}
                                        >
                                          <InputLabel id="demo-select-small-label">
                                            City
                                          </InputLabel>
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
                                            <MenuItem value={7}>
                                              Weekly
                                            </MenuItem>
                                            <MenuItem value={30}>
                                              Monthly
                                            </MenuItem>
                                            <MenuItem value={365}>
                                              Yearly
                                            </MenuItem>
                                          </Select>
                                        </FormControl>
                                      </Box>
                                    </Box>

                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mt: 1,
                                        mb: 1,
                                      }}
                                    >
                                      <FormLabel id="demo-radio-buttons-group-label">
                                        Billing Address
                                      </FormLabel>

                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}
                                      >
                                        <FormLabel
                                          id="demo-radio-buttons-group-label"
                                          sx={{ color: "black" }}
                                        >
                                          <span style={{ marginRight: "1rem" }}>
                                            Same as Customer Address
                                          </span>
                                        </FormLabel>
                                        <div>
                                          <Switch defaultChecked />
                                        </div>
                                      </Box>
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            </div>
                          </Box>
                        </Box>
                      </div>
                    </Box>
                  </DialogContentText>
                </DialogContent>
                <DialogActions
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    onClick={closepopup}
                    sx={{ color: "orange", borderColor: "orange" }}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={closepopup}
                    sx={{
                      background: "orange",
                      color: "white",
                    }}
                    variant="contained"
                  >
                    Add
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "25px",
                  marginBottom: "20px",
                }}
              >
                <div
                  className="ProductManagementProductDetailsSecond00"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4rem",
                    }}
                  >
                    <PeopleOutlineIcon
                      sx={{
                        color: "black",
                        background: "#ffffcc",
                        p: 1,
                        fontSize: "40px",
                        borderRadius: "10px",
                      }}
                    />
                    <FormControl
                      sx={{ minWidth: 100, alignSelf: "flex-start" }}
                      size="small"
                    >
                      <InputLabel id="demo-select-small-label">
                        Today
                      </InputLabel>
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
                      sx={{ fontSize: "14px", color: "grey" }}
                    >
                      All Customers
                      <br />
                      <Typography
                        paragraph
                        style={{ fontWeight: "500", color: "black" }}
                      >
                        1,250
                        <span
                          style={{
                            fontSize: "12px",
                            color: "green",
                            marginLeft: "4px",
                          }}
                        >
                          +15.80%
                        </span>
                      </Typography>
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{ fontSize: "14px", color: "grey" }}
                    >
                      Active
                      <br />
                      <Typography
                        paragraph
                        style={{ fontWeight: "500", color: "black" }}
                      >
                        1,180
                        <span
                          style={{
                            fontSize: "12px",
                            color: "green",
                            marginLeft: "4px",
                          }}
                        >
                          +85%
                        </span>
                      </Typography>
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{ fontSize: "14px", color: "grey" }}
                    >
                      In-Active
                      <br />
                      <Typography
                        paragraph
                        style={{ fontWeight: "500", color: "black" }}
                      >
                        70
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            marginLeft: "4px",
                          }}
                        >
                          -10%
                        </span>
                      </Typography>
                    </Typography>
                  </Box>
                </div>

                <div
                  className="ProductManagementProductDetailsSecond00"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4rem",
                    }}
                  >
                    <ShoppingBagIcon
                      sx={{
                        color: "black",
                        background: "#ffffcc",
                        p: 1,
                        fontSize: "40px",
                        borderRadius: "10px",
                      }}
                    />
                    <FormControl
                      sx={{ minWidth: 100, alignSelf: "flex-start" }}
                      size="small"
                    >
                      <InputLabel id="demo-select-small-label">
                        Today
                      </InputLabel>
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
                      sx={{ fontSize: "14px", color: "grey" }}
                    >
                      All Customers
                      <br />
                      <Typography
                        paragraph
                        style={{ fontWeight: "500", color: "black" }}
                      >
                        30
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            marginLeft: "4px",
                          }}
                        >
                          -20%
                        </span>
                      </Typography>
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{ fontSize: "14px", color: "grey" }}
                    >
                      Active
                      <br />
                      <Typography
                        paragraph
                        style={{ fontWeight: "500", color: "black" }}
                      >
                        657
                      </Typography>
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{ fontSize: "14px", color: "grey" }}
                    >
                      Abandoned Carts
                      <br />
                      <Typography
                        paragraph
                        style={{ fontWeight: "500", color: "black" }}
                      >
                        5
                      </Typography>
                    </Typography>
                  </Box>
                </div>
              </Box>
              <Box>
                <UserManagementDetailsTable />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
