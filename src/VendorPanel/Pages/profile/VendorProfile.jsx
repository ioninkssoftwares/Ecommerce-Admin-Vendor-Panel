import { CircularProgress } from "@mui/material"
import VendorNavbar from "../../Components/navbar/VendorNavbar"
import Sidebar from "../../Components/sidebar/Siderbar"
import { useCookies } from "react-cookie";
import { useAxios } from "../../../utils/axios";
import { useEffect, useState } from "react";
import { MdInventory } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { IoIosDocument } from "react-icons/io";
import UpdatePasswordModal from "../../Components/vendor/modals/UpdatePasswordModal";


const VendorProfile = () => {
    const [cookies, setCookies] = useCookies(["vendorToken"]);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [vendorId, setVendorId] = useState('');
    const [vendorDetails, setVendorDetails] = useState({});

    const instance = useAxios(token);


    useEffect(() => {
        if (cookies && cookies.vendorToken) {
            console.log(cookies.vendorToken, "fdsfsdfsf")
            setToken(cookies.vendorToken);
        }
    }, [cookies]);


    const getVendorId = async () => {
        setLoading(true)
        try {
            const res = await instance.get(
                `/vendor/getVendorIdByToken`
            );
            if (res.data) {
                console.log(res.data.id, "yuyiyui")
                setVendorId(res.data.id)
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            console.log(e)
            // ErrorDispaly(e);
        }
    }

    useEffect(() => {
        getVendorId()
    }, [token])

    const getVendorDetails = async () => {
        setLoading(true)
        try {
            const res = await instance.get(
                `/vendor/vendorByVendorId/${vendorId}`
            );
            if (res.data) {
                console.log(res.data, "sdasdfdf")
                setLoading(false)
                setVendorDetails(res.data.data)
            }
        } catch (e) {
            setLoading(false);
            console.log(e)
            // ErrorDispaly(e);
        }
    }

    useEffect(() => {
        if (vendorId) {
            getVendorDetails()
        }
    }, [vendorId])


    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    {/* <main> */}
                    {loading ? <div className="flex items-center justify-center text-3xl h-full">
                        <CircularProgress className="text-3xl" />
                    </div> : <div className='bg-gray-50 h-screen'>
                        <VendorNavbar />
                        <div className="flex justify-between mt-4 mx-6">
                            <h1 className="text-3xl font-semibold">Profile</h1>
                            <button
                                onClick={() => handleOpenModal()}
                                className={`px-7 text-white font-medium bg-primary-blue rounded-lg py-3 items-center transition transform active:scale-95 duration-200`}
                            >Update Password</button>
                        </div>

                        <div className="mx-6 flex items-center justify-center gap-4 mt-8">
                            <div className=" p-4  bg-white rounded-lg w-full ">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-5 items-center justify-center">
                                        <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                            <FaUser />
                                        </div>
                                        <div>
                                            <p className="text-primary-blue font-bold text-xl">Personal Info</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 my-2">
                                    <span className="font-bold">Name:</span><span>{vendorDetails?.name}</span>
                                </div>
                                <div className="flex gap-2 my-2">
                                    <span className="font-bold">Email:</span><span>{vendorDetails?.email}</span>
                                </div>
                                <div className="flex gap-2 my-2">
                                    <span className="font-bold">Mobile Number:</span><span>{vendorDetails?.mobileNo}</span>
                                </div>
                                <div className="flex gap-2 my-2">
                                    <span className="font-bold">Address1:</span>{vendorDetails?.address1}<span>{vendorDetails?.address1}</span>
                                </div>
                                <div className="flex gap-2 my-2">
                                    <span className="font-bold">Address2:</span>{vendorDetails?.address1}<span>{vendorDetails?.address2}</span>
                                </div>



                            </div>
                            <div className=" p-4  bg-white rounded-lg w-full ">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-5 items-center justify-center">
                                        <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                            <BsBank2 />
                                        </div>
                                        <div>
                                            <p className="text-primary-blue font-bold text-xl">Banking Info</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 my-2">
                                    <span className="font-bold">Bank Name:</span><span>{vendorDetails?.bankName}</span>
                                </div>
                                <div className="flex gap-2 my-2">
                                    <span className="font-bold">IFSC:</span><span>{vendorDetails?.ifsc}</span>
                                </div>
                                <div className="flex gap-2 my-2">
                                    <span className="font-bold">Account Number:</span><span>{vendorDetails?.accountNo}</span>
                                </div>
                                <div className="flex gap-2 my-2">
                                    <span className="font-bold">UPI ID:</span><span>{vendorDetails?.upiId}</span>
                                </div>



                            </div>
                            <div className=" p-4  bg-white rounded-lg w-full  ">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-5 items-center justify-center">
                                        <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                            <IoIosDocument />
                                        </div>
                                        <div>
                                            <p className="text-primary-blue font-bold text-xl">Documental Info</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 my-2">
                                    <span className="font-bold">Aadhaar Card Number:</span><span>{vendorDetails?.adhaarCardNo}</span>
                                </div>
                                <div className="flex gap-2 my-2">
                                    <span className="font-bold">PAN Card Number:</span><span>{vendorDetails?.pancardNo}</span>
                                </div>
                                <div className="flex mb-10 gap-2 my-2">
                                    <span className="font-bold">GST Number:</span><span>{vendorDetails?.gstNo}</span>
                                </div>

                            </div>
                        </div>
                    </div>}
                    <UpdatePasswordModal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        vendorId={vendorId}
                        modalTitle="Order Details"
                        buttonText="Order Details"
                    />
                </div>
            </div>
        </div >
    )
}
export default VendorProfile


