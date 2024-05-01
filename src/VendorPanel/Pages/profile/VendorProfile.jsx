import { CircularProgress } from "@mui/material"
import VendorNavbar from "../../Components/navbar/VendorNavbar"
import Sidebar from "../../Components/sidebar/Siderbar"
import { useCookies } from "react-cookie";
import { useAxios } from "../../../utils/axios";
import { useEffect, useState } from "react";


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

    return (
        <div>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    {/* <main> */}
                    {loading ? <div className="flex items-center justify-center text-3xl h-full">
                        <CircularProgress className="text-3xl" />
                    </div> : <div className='bg-gray-50'>
                        <VendorNavbar />
                        {/* <h1>Vendor profile</h1> */}
                        <div className=" mx-28 my-5">

                            <div className="flex justify-between w-full">
                                <h1 className="text-3xl leading-9 tracking-tight text-gray-900 max-sm:text-2xl">Profile</h1>
                                {/* <button className="py-1 px-4 rounded-lg bg-gray-200 text-primary-blue">
                                    Edit
                                </button> */}
                            </div>
                            <div>
                                <div className="mt-2 border-t border-gray-100">
                                    <dl className="divide-y divide-gray-100">
                                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
                                            <dt
                                                className="text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {vendorDetails?.name}</dt>
                                        </div>
                                        {/* <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Display Name</dt>
                                            <dt
                                                className="text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                Mohsin.B.W.</dt>
                                        </div> */}
                                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                                            <dt
                                                className="text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {vendorDetails?.email}</dt>
                                        </div>
                                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Phone</dt>
                                            <dt
                                                className="text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {vendorDetails?.mobileNo}</dt>
                                        </div>
                                        {/* <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Date of Birth</dt>
                                            <dt
                                                className="text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                08/07/1988</dt>
                                        </div> */}

                                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                                            <dt
                                                className="text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {vendorDetails?.address}</dt>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                        </div>




                    </div>}
                </div>
                {/* </main> */}
            </div>
        </div >
    )
}
export default VendorProfile