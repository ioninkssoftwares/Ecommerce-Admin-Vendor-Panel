import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { CiLogout } from "react-icons/ci";
import { FaStoreAlt, FaUserCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxios } from "../../../utils/axios";




const VendorNavbar = () => {
    const navigate = useNavigate()

    const [cookies, setCookies, removeCookies] = useCookies(['vendorToken']);
    const [token, setToken] = useState("");

    // Todo-localStorageUsed
    const isAdmin = localStorage.getItem("isAdmin");


    const handleLogout = () => {
        toast("Logout Successfully")
        // Remove cookies
        removeCookies('vendorToken');
        // Clear localStorage
        localStorage.removeItem("vendorToken");
        // localStorage.removeItem("token");
        navigate("/vendor/login")
        // Add any other cleanup code here
    };



    const [vendorId, setVendorId] = useState('');
    const [vendorDetails, setVendorDetails] = useState({});
    const [loading, setLoading] = useState(false);

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



    return (
        <nav className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-end">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* <!-- Mobile menu button--> */}
                        {/* <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>

                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button> */}
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        {/* <!-- Profile dropdown --> */}
                        <div className="relative ml-3">
                            <div className="flex items-center justify-center gap-2">



                                {/* <button className=" hidden bg-primary-blue px-5 py-2 rounded-lg md:flex items-center justify-center gap-3"><FaStoreAlt />Visit My Store</button> */}


                                <div onClick={() => navigate("/vendor/profile")}>

                                    <FaUserCircle className="h-10 w-10 rounded-full text-gray-400 cursor-pointer" />
                                </div>

                                {vendorDetails && vendorDetails.name && (
                                    <span onClick={() => navigate("/vendor/profile")} className="text-black cursor-pointer">{vendorDetails.name}</span>
                                )}

                                {/* {isAdmin ? (<div onClick={handleLogout} style={{ width: "28px", height: "28px", borderRadius: "50%" }}>
                                    <CiLogout className='w-full h-full cursor-pointer hover:text-primary-blue' />
                                </div>) : ""} */}

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Mobile menu, show/hide based on menu state. --> */}
            {/* <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">

                    <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
                </div>
            </div> */}
        </nav>




    )
}
export default VendorNavbar