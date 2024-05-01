
import React, { useEffect, useState } from 'react';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { BiSolidCoupon, BiSolidUser } from 'react-icons/bi';
import { FaArrowRight, FaArrowLeft, FaAddressBook } from 'react-icons/fa'; // Import arrow icons from react-icons
import { MdAnalytics, MdInventory, MdOutlineSettings } from 'react-icons/md';
import { TbBrandProducthunt } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        console.log(location.pathname, "path")
    }, [])


    return (
        <>
            <aside className={`flex bg-primary-blue transition-all duration-300 ${isExpanded ? 'w-60' : 'w-16'}`}>
                <div className=" bg-primary-blue flex relative flex-col items-center w-full h-screen p-2 space-y-3   dark:bg-gray-900 dark:border-gray-700">

                    <button style={{ border: "2px solid white" }} className={`z-50 mt-10 p-3 relative transition-all duration-300 ${isExpanded ? ' top-0 left-[120px]' : 'top-0 left-8'}   rounded-full text-gray-500 focus:outline-none transition-colors duration-200 bg-primary-blue dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100`} onClick={toggleSidebar}>
                        {isExpanded ? <FaArrowLeft /> : <FaArrowRight />}
                    </button>

                    {/* <div className={`flex gap-1 items-center hover:bg-white hover:text-primary-blue justify-start w-full `}>
                        <div className='p-2'>
                            <FaAddressBook className="w-auto h-6 text-white" />
                        </div>
                        {isExpanded ? <p className='text-white' >Dashboard</p> : ""}
                    </div> */}
                    {/* <div onClick={() => navigate("/admin")} className={`flex ${location?.pathname === "/admin" ? "bg-white" "text-primary-blue" : "bg-primary-blue" "text-white"} gap-1 items-center justify-start w-full  hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-white' : 'text-white'}`}>
                        <div className='p-2'>
                            <FaAddressBook className="w-auto h-6" />
                        </div>
                        {isExpanded && <p>Dashboard</p>}
                    </div> */}
                    {/* ${pathName.includes(menuItem.id) && "bg-[#FF730F] rounded-r-[30px]"} */}
                    <div onClick={() => navigate("/vendor/dashboard")} className={`flex ${location?.pathname === "/admin" && "bg-gray-400 text-indigo-500"} gap-1 items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-white' : 'text-white'}`}>
                        <div className='p-2'>
                            <FaAddressBook className="w-auto h-6" />
                        </div>
                        {isExpanded && <p>Dashboard</p>}
                    </div>



                    <div
                        // onClick={() => navigate("/admin/orders")}
                        className={`flex gap-1 ${location?.pathname === "/admin/orders" ? "bg-gray-400 text-indigo-500" : "bg-primary-blue text-white"} items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-white' : 'text-white'} `}>
                        <div className='p-2'>
                            {/* <img className="w-auto h-6" src="https://merakiui.com/images/logo.svg" alt="" /> */}
                            <AiOutlineOrderedList className="w-auto h-6 " />
                        </div>
                        {isExpanded ? <p className='' >Orders</p> : ""}
                    </div>
                    <div
                        onClick={() => navigate("/vendor/productManagement")}
                        className={`flex ${location?.pathname === "/admin/productManagement" ? "bg-gray-400 text-indigo-500" : "bg-primary-blue text-white"} gap-1 items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-white' : 'text-white'} `}>
                        <div className='p-2'>
                            {/* <img className="w-auto h-6" src="https://merakiui.com/images/logo.svg" alt="" /> */}
                            <TbBrandProducthunt className="w-auto h-6" />
                        </div>
                        {isExpanded ? <p className='' >Product</p> : ""}
                    </div>
                    <div
                        // onClick={() => navigate("/admin/userManagement")}
                        className={`flex ${location?.pathname === "/admin/userManagement" ? "bg-gray-400 text-indigo-500" : "bg-primary-blue text-white"} gap-1 items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-white' : 'text-white'} `}>
                        <div className='p-2'>
                            {/* <img className="w-auto h-6" src="https://merakiui.com/images/logo.svg" alt="" /> */}
                            <TbBrandProducthunt className="w-auto h-6" />
                        </div>
                        {isExpanded ? <p className='' >Customers</p> : ""}
                    </div>

                    <div
                        // onClick={() => navigate("/admin/membership")}
                        className={`flex ${location?.pathname === "/admin/membership" ? "bg-gray-400 text-indigo-500" : "bg-primary-blue text-white"} gap-1 items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-white' : 'text-white'} `}>
                        <div className='p-2'>
                            {/* <img className="w-auto h-6" src="https://merakiui.com/images/logo.svg" alt="" /> */}
                            <BiSolidCoupon className="w-auto h-6 " />
                        </div>
                        {isExpanded ? <p className='transition-all duration-300' >Membership Plans</p> : ""}
                    </div>
                    <div
                        // onClick={() => navigate("/admin/partnerCoupon")} 
                        className={`flex  ${location?.pathname === "/admin/partnerCoupon" ? "bg-gray-400 text-indigo-500" : "bg-primary-blue text-white"} gap-1 items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-white' : 'text-white'} `}>
                        <div className='p-2'>
                            {/* <img className="w-auto h-6" src="https://merakiui.com/images/logo.svg" alt="" /> */}
                            <BiSolidCoupon className="w-auto h-6 " />
                        </div>
                        {isExpanded ? <p className='' >Coupon Codes</p> : ""}
                    </div>
                    <div
                        // onClick={() => navigate("/admin/inventory")} 
                        className={`flex ${location?.pathname === "/admin/inventory" ? "bg-gray-400 text-indigo-500" : "bg-primary-blue text-white"} gap-1 items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-white' : 'text-white'} `}>
                        <div className='p-2'>
                            {/* <img className="w-auto h-6" src="https://merakiui.com/images/logo.svg" alt="" /> */}
                            <MdInventory className="w-auto h-6" />
                        </div>
                        {isExpanded ? <p className='' >Inventory</p> : ""}
                    </div>

                    {/* <div
                        // onClick={() => navigate("/admin/payment")}
                        className={`flex ${location?.pathname === "/admin/payment" ? "bg-gray-400 text-indigo-500" : "bg-primary-blue text-white"} gap-1 items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-white' : 'text-white'} `}>
                        <div className='p-2'>
                
                            <MdInventory className="w-auto h-6" />
                        </div>
                        {isExpanded ? <p className='' >Payment Section</p> : ""}
                    </div> */}

                    {/* <div
                        // onClick={() => navigate("/admin/siteSettings")} 
                        className={`flex  ${location?.pathname === "/admin/siteSettings" ? "bg-gray-400 text-indigo-500" : "bg-primary-blue text-white"} gap-1 items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-white' : 'text-white'} `}>
                        <div className='p-2'>
                     
                            <MdAnalytics className="w-auto h-6" />
                        </div>
                        {isExpanded ? <p className='' >Analytics and Reports</p> : ""}
                    </div> */}

                    {/* <div
                        // onClick={() => navigate("/admin")} 
                        className={`flex gap-1 items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-white' : 'text-white'} `}>
                        <div className='p-2'>
    
                            <MdOutlineSettings className="w-auto h-6 " />
                        </div>
                        {isExpanded ? <p className='' >Settings</p> : ""}
                    </div> */}
                    <div
                        onClick={() => navigate("/vendor/profile")}
                        className={`flex gap-1 items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-white' : 'text-white'} `}>
                        <div className='p-2'>
                            {/* <img className="w-auto h-6" src="https://merakiui.com/images/logo.svg" alt="" /> */}
                            <BiSolidUser className="w-auto h-6 " />
                        </div>
                        {isExpanded ? <p className='' >Profile</p> : ""}
                    </div>

                    <div
                        //  onClick={() => navigate("/admin")} 
                        className={`flex gap-1 items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-white' : 'text-white'} `}>
                        <div className='p-2'>
                            {/* <img className="w-auto h-6" src="https://merakiui.com/images/logo.svg" alt="" /> */}
                            <BiSolidUser className="w-auto h-6 " />
                        </div>
                        {isExpanded ? <p className='' >Logout</p> : ""}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
