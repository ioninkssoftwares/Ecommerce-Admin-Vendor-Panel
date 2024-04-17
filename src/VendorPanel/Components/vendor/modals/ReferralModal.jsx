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
import { Textarea } from '@mui/joy';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { useAxios } from '../../../utils/axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputField from '../../InputField';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCopy } from 'react-icons/ai';






const ReferralModal = ({ buttonText, modalTitle, userDetails }) => {
    // const instance = useAxios();
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [cookies, setCookies] = useCookies(["adminToken"]);
    const instance = useAxios(token);

    const [date, setDate] = useState(null); // Initialize with null or a default date
    const [copySuccess, setCopySuccess] = useState('');
    const [couponData, setCouponData] = useState({
        // name: '',
        // expiry: date,
        // coupontype: '',
        coupon: "",
        // percentage: discountPercentage,
        amount: '',
        // CouponSegment: '',
        // maxUsePerCustomer: '',
        description: '',
    });

    if (userDetails) console.log(userDetails, "sdfkjld")


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        // onSubmit(couponData);
        // setOpen(false);
        setLoading(true)
        try {

            const res = await instance.post("/coupon/new", couponData);

            if (res.data) {
                setLoading(false)
                toast("Coupon added successfully")
                setOpen(false);
                isCouponAdded(true)
                console.log(res.data)
            }

        } catch (error) {
            setLoading(false)

            console.log(error)
            toast.error(error.response.data.message || error.message)
        }

    };


    const handleDateChange = (event) => {
        console.log(event, "hjsdjkfh");
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        overflowY: "auto",
        maxHeight: 700,
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'white', // Changed background color to white
        boxShadow: 24,
        p: 4, // Adjust padding as needed
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



    useEffect(() => {
        if (cookies && cookies.adminToken) {
            console.log(cookies.adminToken, "fdsfsdfsf")
            setToken(cookies.adminToken);
        }
    }, [cookies]);




    // if (couponData) {
    //     console.log(couponData, "project")
    // }

    // Validation Logics


    const validateCouponName = (value) => {
        // Add specific validation logic for product name
        const regex = /^[a-zA-Z ]+$/; // Only allow letters and spaces
        return regex.test(value) ? null : 'Invalid characters in coupon name';
    };
    const validateDescription = (value) => {
        // Add specific validation logic for product name
        const regex = /^[a-zA-Z ]+$/; // Only allow letters and spaces
        return regex.test(value) ? null : 'Invalid characters in description';
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
    const validateDiscountAmount = (value) => {
        const floatValue = parseFloat(value);

        // Add specific validation logic for discount amount
        if (isNaN(floatValue) || floatValue <= 0) {
            return 'Invalid discount amount';
        }

        // Regular expression to allow only digits and optionally a decimal point
        const validInputRegex = /^\d+(\.\d{1,2})?$/;

        if (!validInputRegex.test(value)) {
            return 'Invalid characters in discount amount';
        }

        return null;
    };
    const validateMaxUsers = (value) => {
        const floatValue = parseFloat(value);

        // Add specific validation logic for discount amount
        if (isNaN(floatValue) || floatValue <= 0) {
            return 'Invalid max users count';
        }

        // Regular expression to allow only digits and optionally a decimal point
        const validInputRegex = /^\d+(\.\d{1,2})?$/;

        if (!validInputRegex.test(value)) {
            return 'Invalid characters in max users count';
        }

        return null;
    };

    // Referral Logics


    function handleCopyClick() {
        navigator.clipboard.writeText(referralMessage);
        setCopySuccess('Copied!');
    }


    // const referralLink = `${userId}`;
    const referralLink = `${userDetails?._id}`;

    // const referralLinkInput = document.getElementById('referralLinkInput');
    // referralLinkInput.value = referralLink;

    const extensionLink = "https://coolzone.vercel.app/";

    const referralMessage = `Use your friend’s referral link to get 25 more credits. Then, your friend will get 50 more credits in return. The link of the website is ${extensionLink} so Sign up for the Coolzone today and both you and your friend will get a free credits. Your referral code is ${referralLink}`;



    return (
        <>
            {/* <p></p> */}
            <div onClick={handleOpen} className='flex flex-col gap-2 '>
                <button

                    className=" text-lg font-semibold text-start" >{buttonText}</button>
                <p>Manage your Membership </p>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",

                    }}>

                        <Typography id="modal-modal-title" sx={{
                            '@media (max-width: 600px)': {
                                display: "none"
                            },
                        }} variant="h5" component="h2">
                            {modalTitle}
                        </Typography>
                        <Typography id="modal-modal-title" sx={{
                            '@media (max-width: 600px)': {
                                ml: "5.7rem"
                            },
                        }} variant="h5" component="h2">
                            Refferal Score:{userDetails?.referralCount}
                        </Typography>
                    </Box>

                    <Typography sx={{
                        my: 3, color: "black", textAlign: "center", fontWeight: "bold",
                        '@media (max-width: 600px)': {
                            fontWeight: "medium"
                        },
                    }} id="modal-modal-title" variant="h5" component="p">
                        Refer your friends, get 50 credits!
                    </Typography>

                    <Box sx={{ padding: "0 5rem" }}>
                        <div class="flex flex-col items-center justify-center w-245 bg-gray-300 rounded-lg py-3">
                            <p class="font-montserrat my-1">Your Referral code is</p>
                            <div class="flex justify-center items-center my-2 mx-4 gap-2">
                                <input class="text-lg" value={referralLink} />
                                <AiOutlineCopy onClick={handleCopyClick} className="text-3xl cursor-pointer" />
                                {copySuccess && <span>{copySuccess}</span>}
                            </div>
                        </div>
                    </Box>

                    {/* <p>Your </p> */}
                    <p></p>
                </Box>
            </Modal>
        </>
    );
};

export default ReferralModal;
