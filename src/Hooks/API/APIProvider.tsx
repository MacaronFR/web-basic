import React from "react";
import {createContext} from "react";

interface APIContextType {
	baseUrl: string,
	onError?: (error: any) => boolean
	prepareRequest?: (request: RequestInit) => RequestInit | undefined
}

export const APIContext = createContext<APIContextType>({
	baseUrl: "/",
	onError: (e) => {
		console.error(e);
		return false
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