import React from 'react';
import { useAuth } from '../contexts/auth';
import UserRoutes from './UserRoutes';
import GuestRoutes from './GuestRoutes';

const AppRoutes = () => {
	const { isLoggedOn } = useAuth();

	return isLoggedOn ? <UserRoutes /> : <GuestRoutes />
};

export default AppRoutes;