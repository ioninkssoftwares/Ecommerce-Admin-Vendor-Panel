import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CircularProgress, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { useAxios } from '../../../utils/axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import InputField from '../../InputField';
// import { useAxios } from '../../utills/axios';







const CustomerModal = ({ buttonText, modalTitle, onSubmit }) => {
    // const instance = useAxios();
    const [open, setOpen] = useState(false);
    // const theme = useTheme();
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false)
    const [selectedClient, setSelectedClient] = useState('');
    const [clients, setClients] = useState(null)
    const [token, setToken] = useState("");
    const [clientNames, setClientNames] = useState([]);
    const [cookies, setCookies] = useCookies(["adminToken"]);
    const [sameAddress, setSameAddress] = useState(false);
    const [newCustomerData, setNewCustomerData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        password: 'defaultPassword',
        address: '',
        landmark: '',
        state: '',
        city: '',
        sameCustomerAddress: sameAddress
    });

    const instance = useAxios(token);
    const [switchState, setSwitchState] = useState(false);

    const handleSwitchChange = (event) => {
        setSwitchState(event.target.checked);
    };

    const handleAddressSwitchChange = (event) => {
        setSameAddress(event.target.checked);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        setLoading(true)
        // onSubmit(newCustomerData);
        // setOpen(false);
        try {

            const res = await instance.post("/admin/createcustomer", newCustomerData);

            if (res.data) {
                setLoading(false);
                console.log(res.data);
                toast("Customer added successfully");
                setOpen(false);
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error(error.response.data.message || error.message)
        }

    };

    useEffect(() => {
        if (cookies && cookies.adminToken) {
            console.log(cookies.adminToken, "fdsfsdfsf")
            setToken(cookies.adminToken);
        }
    }, [cookies]);



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        maxHeight: "90%",
        bgcolor: 'white', // Changed background color to white
        boxShadow: 24,
        p: 3, // Adjust padding as needed
        // borderRadius: 4, // Add border radius for rounded corners
        outline: 'none', // Remove default focus outline
        overflowY: 'auto',
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
    //     setNewCustomerData({
    //         ...newCustomerData,
    //         status: event.target.value
    //     });
    // };



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



    // const handleClient = (event) => {
    //     console.log(event.target.value, "clieee")
    //     setSelectedClient(event.target.value)
    //     setNewCustomerData({
    //         ...newCustomerData,
    //         clientEmail: event.target.value.clientEmail
    //     });
    // };




    // if (newCustomerData) {
    //     console.log(newCustomerData, "project")
    // }


    // Validation Logics


    const validateCustomerName = (value) => {
        // Add specific validation logic for product name
        const regex = /^[a-zA-Z ]+$/; // Only allow letters and spaces
        return regex.test(value) ? null : 'Invalid characters in customer name';
    };
    const validateLandmark = (value) => {
        // Add specific validation logic for product name
        const regex = /^[a-zA-Z ]+$/; // Only allow letters and spaces
        return regex.test(value) ? null : 'Invalid characters in landmark';
    };
    const validateState = (value) => {
        // Add specific validation logic for product name
        const regex = /^[a-zA-Z ]+$/; // Only allow letters and spaces
        return regex.test(value) ? null : 'Invalid characters in state';
    };
    const ValidateCity = (value) => {
        // Add specific validation logic for product name
        const regex = /^[a-zA-Z ]+$/; // Only allow letters and spaces
        return regex.test(value) ? null : 'Invalid characters in city';
    };


    const validateEmail = (value) => {
        // Basic email validation regex
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        // Add specific validation logic for product name
        return emailRegex.test(value) ? null : 'Invalid email address';
    };

    // Numeric Regex Logic
    const validatePhoneNumber = (value) => {
        const floatValue = parseFloat(value);
        const mobileNumberRegex = /^\d{10}$/;

        if (!mobileNumberRegex.test(value)) {
            return 'Invalid mobile number';
        }

        return null;
    };





    return (
        <>
            {/* <p></p> */}
            <Button sx={{
                color: "white", borderRadius: "10px", padding: "7px 15px", backgroundColor: "#04a7ff",
                //  "&:hover": {
                //     backgroundColor: '#db8e57'
                // },
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
                    <Typography sx={{ my: 1, color: "gray" }} id="modal-modal-title" variant="p" component="p">
                        Customer Information
                    </Typography>
                    <form>
                        {/* Add margin-bottom to separate form fields */}

                        <InputField
                            label="Customer Name"
                            type="text"
                            value={newCustomerData.name}
                            onChange={(e) =>
                                setNewCustomerData({ ...newCustomerData, name: e })
                            }
                            validate={validateCustomerName}
                        />

                        <InputField
                            label="Phone Number"
                            type="text"
                            value={newCustomerData.mobileNo}
                            onChange={(e) =>
                                setNewCustomerData({ ...newCustomerData, mobileNo: e })
                            }
                            validate={validatePhoneNumber}
                        />


                        <InputField
                            label="Email"
                            type="text"
                            value={newCustomerData.email}
                            onChange={(e) =>
                                setNewCustomerData({ ...newCustomerData, email: e })
                            }
                            validate={validateEmail}
                        />


                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={switchState} onChange={handleSwitchChange} />}
                                label="Add a new address"
                            />
                        </FormGroup>


                        {switchState ? <>
                            <TextField
                                label="Building No., Street Address"
                                fullWidth
                                margin="normal"
                                value={newCustomerData.address}
                                onChange={(e) =>
                                    setNewCustomerData({ ...newCustomerData, address: e.target.value })
                                }
                            />

                            <InputField
                                label="Landmark"
                                type="text"
                                value={newCustomerData.landmark}
                                onChange={(e) =>
                                    setNewCustomerData({ ...newCustomerData, landmark: e })
                                }
                                validate={validateLandmark}
                            />

                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>


                                <InputField
                                    label="State"
                                    type="text"
                                    value={newCustomerData.state}
                                    onChange={(e) =>
                                        setNewCustomerData({ ...newCustomerData, state: e })
                                    }
                                    validate={validateState}
                                />


                                <InputField
                                    label="City"
                                    type="text"
                                    value={newCustomerData.city}
                                    onChange={(e) =>
                                        setNewCustomerData({ ...newCustomerData, city: e })
                                    }
                                    validate={ValidateCity}
                                />
                            </Box>

                            <Box sx={{ marginTop: 1 }}>

                                <Typography sx={{ marginRight: 2, display: "inline-block" }}>Billing Address</Typography> <Typography sx={{ display: "inline-block", marginRight: 2 }}> Same as Customer Address</Typography>
                                <FormGroup sx={{ display: "inline-block" }}>
                                    <FormControlLabel
                                        control={<Switch defaultChecked={sameAddress} onChange={handleSwitchChange} />}
                                    />
                                </FormGroup>
                            </Box>






                        </> : null}


                        {/* Add margin-top to separate form fields and button */}
                        {loading ? <CircularProgress /> : <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                marginTop: 2,
                                backgroundColor: '#04a7ff', // Set the background color
                                // '&:hover': {
                                //     backgroundColor: '#db8e57', // Set the hover background color
                                // },
                                color: 'white', // Set the text color
                            }}
                            className="bg-[#04a7ff] text-white"
                        >
                            Submit
                        </Button>}
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default CustomerModal;
