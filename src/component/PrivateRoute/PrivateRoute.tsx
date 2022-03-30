import React from 'react';
import {errorNotify} from "../../utils/toast";
import {Navigate, useNavigate} from "react-router-dom";
import jwt from "jwt-decode"
import { getToken, removeToken } from "../../helper";
import axios from "axios";
import { USER_ROLE } from "../../App";

interface IPrivateRouteProps {
    children: JSX.Element,
    role: string
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({children, role}) => {
    const token = getToken()
    const navigate = useNavigate()

    if (!token) {
        errorNotify("You are not authorize")
        return <Navigate to={'/'}/>
    }

    const decode: { user: any } = jwt(token);

    if (!decode.user) {
        removeToken();
        errorNotify("You are not authorize")
        return <Navigate to={'/'}/>
    }

    if (decode.user && decode.user.role !== role) {
        if (decode.user.role === USER_ROLE.ADMIN) {
            errorNotify("You are not authorize")
            return <Navigate to={'/admin/blogs'}/>
        } else if (decode.user.role === USER_ROLE.USER) {
            errorNotify("You are not authorize")
            return <Navigate to={'/home'}/>
        }
    }


    axios.get(`/auth/authorize/${token}`)
        .catch((err) => {
            if (err) {
                errorNotify("You are not authorize")
                navigate("/")
            }
        })
    return children
};

export default PrivateRoute;
