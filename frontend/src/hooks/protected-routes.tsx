import { Roles } from '@shared/enums/index';
import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/zustand/store';


const ProtectedRoutes = () => {
    const navigate  = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
    const { isLoading, role, token } = useAuthStore();
    
    
    return <Outlet />
    
}

export default ProtectedRoutes