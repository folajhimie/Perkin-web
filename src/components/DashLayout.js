import { Outlet } from "react-router-dom";


const DashLayout = () => {
    return (
        <div>
            <div className="dash-container">
                <Outlet />
            </div>
        </div>
    )
}

export default DashLayout;