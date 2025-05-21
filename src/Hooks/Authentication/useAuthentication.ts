import { useContext } from "react";
import {AuthenticationContext} from "./AuthenticationProvider";

interface UseAuthentication {
	login: (destination: string, origin?: string) => Promise<void>,
	fetchToken: (type: "authorization" | "refresh", code: string) => Promise<void>,
	loading: boolean,
	logout: (to: string) => void,
	isAuthenticated: boolean
}

export default function useAuthentication(): UseAuthentication {
	const context = useContext(AuthenticationContext);

	return {
		login: context.login,
		fetchToken: context.fetchToken,
		loading: context.loading,
		logout: context.logout,
		isAuthenticated: context.isAuthenticated
	}
}
