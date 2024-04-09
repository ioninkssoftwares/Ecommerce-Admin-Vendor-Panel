import Sidebar from "../../Components/sidebar/Siderbar"

const DashboardVendor = () => {
    return (
        <div>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    <main>
                    </main>
                </div>
            </div>
        </div>
    )
}
export default DashboardVendor