// import { useSelector, useDispatch } from 'react-redux';
// import { selectError, selectLoggedInUser } from './authSlice';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { useAxios } from "../../../utils/axios"


export default function Login() {

    // const dispatch = useDispatch();
    const navigate = useNavigate()
    const instance = useAxios();
    const [cookies, setCookies] = useCookies(["vendorToken"]);
    // const error = useSelector(selectError);
    // const user = useSelector(selectLoggedInUser);
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (cookies && cookies.vendorToken) {
            navigate("/vendor/dashboard")
        }
    }, [cookies]);


    // useEffect(() => {
    //     if (user?.user.role === "user") {
    //         console.log(user, "hjfdsfsj")
    //         setCookies("token", user.token);
    //         localStorage.setItem("isAdmin", false);
    //         localStorage.setItem("userId", user.user._id);
    //         localStorage.setItem("token", user.token);
    //         toast(" User Login Successful")
    //         navigate("/")
    //     } else if (user?.user.role === "admin") {
    //         console.log(user, "hjfdsfsj")
    //         setCookies("adminToken", user.token);
    //         localStorage.setItem("isAdmin", true);
    //         localStorage.setItem("adminId", user.user._id);
    //         localStorage.setItem("adminToken", user.token);
    //         toast(" Admin Login Successful")
    //         navigate("/admin")
    //     }
    // }, [user])
    // useEffect(() => {
    //     if (user?.success) {
    //         console.log(user, "hjfdsfsj")
    //         setCookies("token", user.token);
    //         localStorage.setItem("isAdmin", false);
    //         localStorage.setItem("userId", user.user._id);
    //         localStorage.setItem("token", user.token);
    //         toast(" User Login Successful")
    //         navigate("/")
    //     }
    // }, [user])

    // useEffect(() => {
    //     if (error) {
    //         setLoading(false)
    //     }
    // }, [error])


    // try {

    //     const res = await instance.post("/login", data)

    //     if (res.data) {
    //         setCookies("token", user.token);
    //                 localStorage.setItem("isAdmin", false);
    //                 localStorage.setItem("userId", user.user._id);
    //                 localStorage.setItem("token", user.token);
    //                 toast(" User Login Successful")
    //                 navigate("/")
    //         setLoading(false)
    //     }

    // } catch (error) {
    //     toast.error("Invalid email or password ")
    //     setLoading(false)
    //     console.log(error)

    // }




    return (
        <>
            {/* {user?.success && <Navigate to="/" replace={true}></Navigate>} */}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-20">
                    {/* <img
                        className="mx-auto h-10 w-auto"
                        src="https://cdn.pixabay.com/photo/2018/08/29/17/07/ecommerce-3640321_1280.jpg"
                        alt="Your Company"
                    /> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        noValidate
                        onSubmit={handleSubmit(async (data) => {
                            // setLoading(true)
                            // if (user === null) {
                            //     setLoading(true)
                            // }
                            // dispatch(
                            //     loginUserAsync({ email: data.email, password: data.password })
                            // );

                            // toast(" User Login Successful")
                            // navigate("/")
                            // setLoading(false)

                            setLoading(true)
                            console.log(data, "dfkasldjfksd")
                            try {

                                const res = await instance.post("/vendor/login", data)

                                if (res.data) {
                                    // const user = res.data.user;
                                    console.log(res.data.data.token, "sdhfaskfhdj")
                                    setCookies("vendorToken", res.data.data.token);
                                    localStorage.setItem("isAdmin", false);
                                    // localStorage.setItem("userId", res.data.user._id);
                                    // localStorage.setItem("vendorToken", res.data.token);
                                    navigate("/vendor/dashboard")
                                    setLoading(false)
                                    toast(" Vendor Login Successful")
                                }

                            } catch (error) {
                                toast.error("Invalid email or password ")
                                setLoading(false)
                                console.log(error)

                            }

                            // setLoading(false)
                        })}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    {...register('email', {
                                        required: 'email is required',
                                        // pattern: {
                                        //   value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                        //   message: 'email not valid',
                                        // },
                                    })}
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.email && (
                                    <p className="text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link
                                        to="/forgot-password"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    {...register('password', {
                                        required: 'password is required',
                                    })}
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.password && (
                                    <p className="text-red-500">{errors.password.message}</p>
                                )}
                            </div>
                            {/* {error && <p className="text-red-500">{error || error.message}</p>} */}
                        </div>

                        <div>
                            {loading === false ? <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log in
                            </button> : <div className='flex items-center justify-center'><CircularProgress /></div>}
                        </div>
                    </form>

                    {/* <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link
                            to="/signup"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Create an Account
                        </Link>
                    </p> */}

                </div>
            </div>
        </>
    );
}
