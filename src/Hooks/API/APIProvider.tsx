import React from "react";
import {createContext} from "react";

interface APIContextType {
	baseUrl: string,
	onError?: (error: any) => void
	prepareRequest?: (request: RequestInit) => RequestInit
}

export const APIContext = createContext<APIContextType>({
	baseUrl: "/",
	onError: (e) => {
		console.error(e);
	},
	prepareRequest: (request) => request
});

interface APIProviderProps extends APIContextType{
	children: React.ReactNode;
}

export function APIProvider(props: APIProviderProps) {
	return (
		<APIContext.Provider value={props}>
			{props.children}
		</APIContext.Provider>
	)
}