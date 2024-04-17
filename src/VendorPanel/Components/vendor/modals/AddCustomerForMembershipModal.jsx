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
import { Checkbox, CircularProgress, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { useAxios } from '../../../utils/axios';


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



const AddCustomerForMembershipModal = ({ buttonText, modalTitle, onSubmit }) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(dayjs('2022-04-17'));
    // const theme = useTheme();
    const [status, setStatus] = useState('');
    const [token, setToken] = useState("");
    const [selectedClient, setSelectedClient] = useState('');
    const [clients, setClients] = useState(null)
    const [loading, setLoading] = useState(false)
    const [cookies, setCookies] = useCookies(["adminToken"]);
    const [clientNames, setClientNames] = useState([]);
    const [service, setService] = useState([]);
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        serviceType: '',
        project_categories: '',
    });
    const instance = useAxios(token);
    const [age, setAge] = React.useState('');

    const handleChangeService = (event) => {
        setCustomerData({ ...customerData, serviceType: event.target.value })
    };

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

        setLoading(true)
        try {
            const res = await instance.post("/admin/addMember", customerData);
            if (res.data) {
                setLoading(false)
                console.log(res.data)
            }

        } catch (error) {
            setLoading(false)
            console.log(error, "sadfhjfas")
            toast.error(error.response.data.message || error.message)
        }

    };

    const style = {
        position: 'absolute',
        top: '50%',
        maxHeight: '600px', // Set a maximum height for the container
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1200,
        bgcolor: 'white', // Changed background color to white
        boxShadow: 24,
        p: 3, // Adjust padding as needed
        borderRadius: 4, // Add border radius for rounded corners
        outline: 'none', // Remove default focus outline
        overflowY: 'auto', // or 'scroll'
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
        setCustomerData({
            ...customerData,
            status: event.target.value
        });
    };



    // Get all Clients
    const getAllClients = async () => {

    };



    const handleClient = (event) => {
        console.log(event.target.value, "clieee")
        setSelectedClient(event.target.value)
        setCustomerData({
            ...customerData,
            clientEmail: event.target.value.clientEmail
        });
    };

    useEffect(() => {
        if (cookies && cookies.adminToken) {
            console.log(cookies.adminToken, "fdsfsdfsf")
            setToken(cookies.adminToken);
        }
    }, [cookies]);




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
                    <Box sx={{ display: "flex", gap: 7 }}>
                        <Box sx={{ flexBasis: "45%" }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {modalTitle}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                                <Typography sx={{ color: "gray" }} id="modal-modal-title" variant="p" component="p">
                                    Customer Information
                                </Typography>
                                {/* <FormGroup>
                                    <FormControlLabel
                                        label="New Customer"
                                        control={<Switch defaultChecked />}

                                    />
                                </FormGroup> */}
                            </Box>

                            <form>
                                {/* Add margin-bottom to separate form fields */}

                                <TextField
                                    label="Enter Name"
                                    fullWidth
                                    margin="normal"
                                    value={customerData.name}
                                    onChange={(e) =>
                                        setCustomerData({ ...customerData, name: e.target.value })
                                    }
                                />
                                <TextField
                                    label="Enter Email"
                                    fullWidth
                                    margin="normal"
                                    value={customerData.email}
                                    onChange={(e) =>
                                        setCustomerData({ ...customerData, email: e.target.value })
                                    }
                                />
                                <TextField
                                    label="Enter Mobile No."
                                    fullWidth
                                    margin="normal"
                                    value={customerData.phone}
                                    onChange={(e) =>
                                        setCustomerData({ ...customerData, phone: e.target.value })
                                    }
                                />

                                <FormGroup>
                                    <FormControlLabel
                                        label="Add Address"
                                        control={<Switch defaultChecked />}

                                    />
                                </FormGroup>

                            </form>
                        </Box>

                        <Box sx={{ flexBasis: "45%" }}>

                            <Box sx={{ marginTop: 9 }}>
                                <TextField
                                    label="Enter Address"
                                    fullWidth
                                    margin="normal"
                                    value={customerData.address}
                                    onChange={(e) =>
                                        setCustomerData({ ...customerData, address: e.target.value })
                                    }
                                />
                                <TextField
                                    label="Stree no. "
                                    fullWidth
                                    margin="normal"
                                    value={customerData.project_name}
                                    onChange={(e) =>
                                        setCustomerData({ ...customerData, project_name: e.target.value })
                                    }
                                />

                                <Box sx={{ display: "flex", marginTop: 2, gap: 2 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">City</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={clients}
                                            label="Select Customer"
                                        // onChange={handleClient}
                                        >
                                            {/* { clients && clients.map((name) => (
                                            <MenuItem
                                                key={name?.clientName}
                                                value={name?.clientName}
                                            // style={getStyles(name, personName, theme)}
                                            >
                                                {name?.clientName}
                                            </MenuItem>
                                        ))} */}
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">State</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={clients}
                                            label="Select Customer"
                                        // onChange={handleClient}
                                        >
                                            {/* { clients && clients.map((name) => (
                                            <MenuItem
                                                key={name?.clientName}
                                                value={name?.clientName}
                                            // style={getStyles(name, personName, theme)}
                                            >
                                                {name?.clientName}
                                            </MenuItem>
                                        ))} */}
                                        </Select>
                                    </FormControl>

                                </Box>

                                <Box sx={{ marginTop: 1, display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                                    <Typography sx={{ my: 1, color: "gray" }} id="modal-modal-title" variant="p" component="p">
                                        Billing Address
                                    </Typography>x
                                    <FormGroup>
                                        <FormControlLabel
                                            label="Same as Customer Address"
                                            control={<Switch defaultChecked />}
                                        />
                                    </FormGroup>
                                </Box>


                            </Box>

                        </Box>


                    </Box>

                    <Box>
                        {/* <Typography sx={{ mt: 5, mb: 2, color: "gray" }} id="modal-modal-title" variant="p" component="p">
                            Select Service Type
                        </Typography> */}
                        <Box sx={{ maxWidth: 220 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label"> Select Service Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={service}
                                    label="Age"
                                    onChange={handleChangeService}
                                >
                                    <MenuItem value={10}>Bronze Service</MenuItem>
                                    <MenuItem value={20}>Silver Service</MenuItem>
                                    <MenuItem value={30}>Gold Service</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <p className='my-4'>Select Any 4 items</p>

                        <Box sx={{ display: "flex", gap: 3 }}>
                            <Box sx={{ display: 'inline-block', border: "2px solid gray", padding: 2, borderRadius: "15px" }}>
                                <p className='mb-4 font-semibold'>Television</p>
                                <p className='mb-1 font-semibold'>20” , 21” - 29” </p>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="L.C.D" />
                                    </FormGroup>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="L.E.D" />
                                    </FormGroup>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Plasma" />
                                    </FormGroup>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Smart T.V" />
                                    </FormGroup>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'inline-block', border: "2px solid gray", padding: 2, borderRadius: "15px" }}>
                                <p className='mb-4 font-semibold'>Air Conditioner</p>
                                {/* <p className='mb-1 font-semibold'>20” , 21” - 29” </p> */}
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Window A/C" />
                                    </FormGroup>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Split A/C" />
                                    </FormGroup>

                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ marginTop: 4, display: "flex", gap: 3 }}>
                            <Box sx={{ display: 'inline-block', border: "2px solid gray", padding: 2, borderRadius: "15px" }}>
                                <p className='mb-4 font-semibold'>Fridge</p>
                                <p className='mb-1 font-semibold'>Household </p>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Classic Single door Fridge" />
                                    </FormGroup>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Top Freezer" />
                                    </FormGroup>

                                </Box>
                                <p className='my-2 font-semibold'>Commercial </p>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Visi Cooler" />
                                    </FormGroup>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Deep Freezer" />
                                    </FormGroup>

                                </Box>
                            </Box>


                            <Box sx={{ display: 'inline-block', border: "2px solid gray", padding: 2, borderRadius: "15px" }}>
                                <p className='mb-4 font-semibold'>Microwave</p>
                                <p className='mb-1 font-semibold'>Household </p>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Microvave" />
                                    </FormGroup>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="O.T.G." />
                                    </FormGroup>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Convection Oven" />
                                    </FormGroup>

                                </Box>
                                <p className='my-2 font-semibold'>Commercial </p>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Standard Oven" />
                                    </FormGroup>
                                    {/* <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="L.E.D" />
                                    </FormGroup> */}

                                </Box>
                            </Box>



                        </Box>

                        <Box sx={{ marginTop: 4, display: "flex", gap: 3 }}>


                            <Box sx={{ display: 'inline-block', border: "2px solid gray", padding: 2, borderRadius: "15px" }}>
                                <p className='mb-4 font-semibold'>Washing Machine</p>
                                {/* <p className='mb-1 font-semibold'>20” , 21” - 29” </p> */}
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Top Load Agitator" />
                                    </FormGroup>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Top load Impeller" />
                                    </FormGroup>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'inline-block', border: "2px solid gray", padding: 2, borderRadius: "15px" }}>
                                <p className='mb-4 font-semibold'>Mixing</p>
                                {/* <p className='mb-1 font-semibold'>20” , 21” - 29” </p> */}
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Juicer" />
                                    </FormGroup>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Mixer Grinder" />
                                    </FormGroup>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Water Filter" />
                                    </FormGroup>
                                </Box>
                            </Box>



                        </Box>



                    </Box>


                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "15px", gap: 4 }}>

                        {/* <button className='bg-primary-blue text-white px-8 py-3 rounded-lg '>
                            Cancel
                        </button> */}

                        {loading ? <CircularProgress /> : <button onClick={handleSubmit} className='bg-primary-blue text-white px-8 py-3 rounded-lg '>
                            Add
                        </button>}
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default AddCustomerForMembershipModal;
