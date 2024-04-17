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
import { Chip, CircularProgress, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { Textarea } from '@mui/joy';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { useAxios } from '../../../utils/axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputField from '../../InputField';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';





const CreateBannerModel = ({ buttonText, modalTitle, SetIsBannerAdded }) => {
    // const instance = useAxios();
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [cookies, setCookies] = useCookies(["adminToken"]);
    const instance = useAxios(token);

    const [bannerCategory, setBannerCategory] = useState("");
    const [filesToupload, setFilesToUpload] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    const [selectedOption, setSelectedOption] = useState('');


    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = async () => {

        setLoading(true)
        var BannerFormData = new FormData();

        for (let i of filesToupload) {
            BannerFormData.append('bannerImage', i);
        }

        // BannerFormData.append('categories', selectedCategories);
        selectedCategories.forEach(category => {
            BannerFormData.append('categories', category);
        });
        BannerFormData.append('subCategory', selectedOption);
        try {

            const res = await instance.post("/admin/banner/new", BannerFormData);

            if (res.data) {
                setLoading(false)
                toast("Banner added successfully")
                setOpen(false);
                SetIsBannerAdded(true)
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
        width: 900,
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



    // Image Upload FUnction

    useEffect(() => {
        console.log(filesToupload, "mainImage")
    }, [filesToupload])


    const handleImageChange = (e) => {
        if (e.target.files) {
            setFilesToUpload((prev) => {
                let prevs = [...filesToupload];
                console.log(e.target.files);
                prevs.push(e.target.files[0]);
                console.log(prevs);
                return prevs;
            });
        }
        e.target.files = null;
    };
    const dleteImage = (file) => {
        setFilesToUpload((prev) => {
            let imgs = [...filesToupload];
            const index = imgs.indexOf(file);
            if (index > -1) {
                imgs.splice(index, 1);
            }
            return imgs;
        });
    };

    const renderPhotos = (source) => {

        return source.map((photo, index) => {
            return (
                <div
                    className="w-max h-40 flex justify-center items-center  relative max-w-[200px]"
                    key={index}
                >
                    <button
                        onClick={() => {
                            dleteImage(photo);
                        }}
                        className="text-white bg-red-500 h-6 w-6 flex rounded-full items-center justify-center absolute top-1 right-0"
                    >
                        <AiOutlineClose />
                    </button>
                    <img
                        className=" h-full object-cover"
                        src={URL.createObjectURL(photo)}
                        alt=""
                        key={photo}
                    />
                </div>
            );
        });
    };






    // Validation Logics


    const validateCouponName = (value) => {
        // Add specific validation logic for product name
        const regex = /^[a-zA-Z ]+$/; // Only allow letters and spaces
        return regex.test(value) ? null : 'Invalid characters in category ';
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
    const validateLimit = (value) => {
        const floatValue = parseFloat(value);

        // Add specific validation logic for discount amount
        if (isNaN(floatValue) || floatValue <= 0) {
            return 'Invalid limit';
        }

        // Regular expression to allow only digits and optionally a decimal point
        const validInputRegex = /^\d+(\.\d{1,2})?$/;

        if (!validInputRegex.test(value)) {
            return 'Invalid characters in limit';
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

    async function getAllCategories() {
        try {
            console.log(token, "jsakdfjkladsj")
            const instance = useAxios(token);
            setLoading(true);
            const res = await instance.get(
                `/admin/getAllCategories`
            );
            if (res.data) {
                setAllCategories(res.data.categories)
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            console.log(e)
            // ErrorDispaly(e);
        }
    }


    useEffect(() => {
        getAllCategories();
    }, [token]);


    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;

        // Update the array of selected categories
        setSelectedCategories((prevCategories) => [...prevCategories, selectedCategory]);

        // Reset the Select component to default state
        setSelectedCategory("Select");
    };


    const handleRemoveCategory = (index) => {
        // Create a copy of the selectedCategories array
        const updatedCategories = [...selectedCategories];

        // Remove the selected category at the specified index
        updatedCategories.splice(index, 1);

        // Update the state with the modified array
        setSelectedCategories(updatedCategories);
    };

    return (
        <>
            {/* <p></p> */}
            <Button sx={{
                color: "white", borderRadius: "10px", padding: "7px 15px", backgroundColor: "#04a7ff",
                //  "&:hover": {
                //     backgroundColor: '#db8e57'
                // },
            }} className="px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg flex space-x-2 items-center transition transform active:scale-95 duration-200" onClick={handleOpen}>{buttonText}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        {modalTitle}
                    </Typography>
                    {/* <Typography sx={{ my: 1, color: "gray" }} id="modal-modal-title" variant="p" component="p">
                        Banner Information
                    </Typography> */}
                    <form>

                        {/* <InputField
                            label="Description"
                            type="text"
                            value={bannerCategory}
                            onChange={(e) =>
                                setBannerCategory(e)
                            }
                            validate={validateCouponName}
                        /> */}

                        <div className="w-full px-7 ">
                            <div>
                                {/* <p className='text-center text-xl my-8 '>Add Images</p> */}

                                <div className="mt-12">
                                    {/* <label className="inline-block mb-2 text-gray-500">
                            Select Product Images (for Multiple images please upload one after one)
                        </label> */}
                                    <div className="flex items-center flex-col gap-4  w-full ">

                                        <label className=" pb-4 flex flex-col w-full border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                            <div className="flex flex-col items-center justify-center py-7 ">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                    Upload Image
                                                </p>
                                                <p className="pt-3 text-sm tracking-wider text-gray-400 group-hover:text-gray-600 text-center">Upload a cover image for your product.</p>
                                                <p className="  text-sm tracking-wider text-gray-400 group-hover:text-gray-600 text-center">File Format jpeg, png Recommened Size 600x600 (1:1)</p>
                                            </div>
                                            <input
                                                onChange={handleImageChange}
                                                type="file"
                                                className="opacity-0"
                                            />
                                        </label>
                                        <p>Additional Images</p>
                                        <div className="w-full flex items-center justify-center gap-8  flex-wrap">
                                            {renderPhotos(filesToupload)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex gap-4 items-center justify-center my-4'>
                                <Select
                                    labelId="brand-select-label"
                                    id="brand-select"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    label="Category"
                                >
                                    <MenuItem value="Select" disabled>Select</MenuItem>
                                    {allCategories?.map((category) => (
                                        <MenuItem key={category._id} value={category.categoryName}>
                                            {category.categoryName}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <div className='flex gap-4 flex-wrap'>
                                    {selectedCategories?.map((category, index) => (
                                        <p className='cursor-pointer' key={index} onClick={() => handleRemoveCategory(index)}>
                                            {index + 1}. {category}
                                        </p>
                                    ))}
                                </div>

                            </div>

                            <div className='flex items-center justify-center gap-4'>
                                <label htmlFor="bannerType">Select Banner Type: </label>
                                <select id="bannerType" value={selectedOption} onChange={handleSelectChange}>
                                    <option value="">Select...</option>
                                    <option value="mainbanner">Main Banner</option>
                                    <option value="productbanner">Product Banner</option>
                                </select>

                                {/* <p>You selected: {selectedOption}</p> */}
                                {/* You can use the selectedOption state wherever you need it in your component */}
                            </div>

                        </div>




                        {/* Add margin-top to separate form fields and button */}

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, mt: 3 }}>

                            {loading ? <CircularProgress /> : selectedCategories.length >= 2 ? <Button
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{
                                    marginTop: 2,
                                    backgroundColor: '#04a7ff',
                                    flexBasis: "45%",
                                    color: 'white',
                                    borderRadius: "15px",
                                    padding: "15px 0" // Set the text color
                                }}
                                className="bg-[#04a7ff] text-white"
                            >
                                Add
                            </Button> : <p>Please select at least 2 images and categories</p>}

                        </Box>

                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default CreateBannerModel;
