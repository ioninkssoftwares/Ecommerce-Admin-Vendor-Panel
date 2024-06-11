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
import { CircularProgress, FormControlLabel, FormGroup, Grid, Switch } from '@mui/material';
import { Textarea } from '@mui/joy';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { useAxios } from '../../../../utils/axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputField from '../../InputField';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCopy } from 'react-icons/ai';



const UpdatePasswordModal = ({ open, onClose, buttonText, modalTitle, vendorId }) => {
    // const instance = useAxios();
    const navigate = useNavigate()
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [cookies, setCookies, removeCookie] = useCookies(["vendorToken"]);
    const instance = useAxios(token);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        if (newPassword !== event.target.value) {
            setError('New passwords do not match');
        } else {
            setError('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            setLoading(false);
            return;
        }
        if (!vendorId) {
            toast.error('Vendor ID not found');
            setLoading(false);
            return;
        }
        const updatedPassword = {
            oldPassword,
            newPassword
        }
        try {

            const res = await instance.put(`/vendors/${vendorId}/password`, updatedPassword)
            if (res.data) {
                setLoading(false);
                toast.success('Password updated successfully');
                navigate('/vendor/login');
                removeCookie('vendorToken', { path: '/' });


            }

        } catch (error) {
            setLoading(false);
            console.log(error)
            toast.error('Failed to update password');
        }
    };


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        overflowY: "auto",
        maxHeight: 600,
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
        if (cookies && cookies.vendorToken) {
            console.log(cookies.vendorToken, "fdsfsdfsf")
            setToken(cookies.vendorToken);
        }
    }, [cookies]);




    return (
        <>
            {/* <p></p> */}
            {/* <div onClick={handleOpen} className='flex flex-col gap-2 '>
                <button

                    className=" text-lg font-semibold text-start" >{buttonText}</button>
                <p>Manage your Password </p>
            </div> */}
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5" component="h2">Update Password</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Old Password"
                            type="password"
                            value={oldPassword}
                            onChange={handleOldPasswordChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="New Password"
                            type="password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Confirm New Password"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            fullWidth
                            margin="normal"
                            required
                            error={!!error}
                            helperText={error}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={newPassword !== confirmPassword || newPassword === '' || loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Update Password'}
                        </Button>
                    </form>

                </Box>
            </Modal>
        </>
    );
};

export default UpdatePasswordModal;
