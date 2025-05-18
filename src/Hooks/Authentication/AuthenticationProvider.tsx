import {createContext} from "react";
import * as React from "react";

interface AuthenticationContextType {
	clientId: string,
	baseURL: string,
	tokenUrl: string
}

export const AuthenticationContext = createContext<AuthenticationContextType>({
	clientId: "",
	baseURL: "",
	tokenUrl: "",
});

interface AuthenticationProviderProps extends AuthenticationContextType{
	children: React.ReactNode;
}

export function AuthenticationProvider(props: AuthenticationProviderProps) {
	return <AuthenticationContext.Provider value={props}>
		{props.children}
	</AuthenticationContext.Provider>
}