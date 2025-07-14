"use client"
import { Spin } from "antd";
import { useSelector } from "react-redux";

const AdminRoute = ({role,children}) => {

    const currentUser = useSelector(state => state?.user?.user)
    const isMatched = role.includes(currentUser?.role)
    
    if(isMatched === true){
        return <div className="w-full ">
            { children }
        </div>
    }

    return <div className="w-full flex h-screen justify-center items-center">
        {/* <h1 className="text-3xl">You are not valid.</h1> */}
        <Spin size="large"></Spin>
    </div>
};

export default AdminRoute;