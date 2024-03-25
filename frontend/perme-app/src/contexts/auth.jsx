import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

	const [user, setUser] = useState(null);
	const isLoggedOn = useMemo(() => Boolean(user), [user]);

	const tokenStorageKey = '@Perme:token';
	const userStorageKey = '@Perme:user';

	const login = async (identifier, password) => {
		const tokenResponse = await api.post('/auth/login', {identifier, password});
		bootstrapToken(tokenResponse.data.accessToken);
		const userResponse = await api.get('/auth/profile');
		bootstrapUser(JSON.stringify(userResponse.data));
	};

	const logout = () => {
		localStorage.removeItem(tokenStorageKey);
		localStorage.removeItem(userStorageKey);
		setUser(null);
	};

	const hasToken = () => localStorage.getItem(tokenStorageKey) !== null;

	const bootstrapToken = (token) => {
		localStorage.setItem(tokenStorageKey, token);
		api.defaults.headers.Authorization = `Bearer ${token}`;
		api.interceptors.response.use(
		response => response,
		error => {
			if (error.response.status === 401 && hasToken()) {
				logout();
			}
			throw error;
		});
	}

	const bootstrapUser = (user) => {
		localStorage.setItem(userStorageKey, user);
		setUser(JSON.parse(user));
	}

	useEffect(() => {
		const tokenFromStorage = localStorage.getItem(tokenStorageKey);
		const userFromStorage = localStorage.getItem(userStorageKey);

		if (tokenFromStorage !== null && userFromStorage !== null) {
			bootstrapToken(tokenFromStorage);
			bootstrapUser(userFromStorage);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ isLoggedOn, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	return useContext(AuthContext);
}

export default AuthContext;