import React, {createContext} from "react";
import {useApiOptions} from "./useApi";

export interface APIContextProps {
	url: string,
	prepareRequest: (options: useApiOptions) => RequestInit | null
}

export const APIContext = createContext<APIContextProps>({url: "", prepareRequest: (options) => {
		const res = {} as RequestInit
		if (options.body) {
			res.body = options.body;
		}
		if (options.method) {
			res.method = options.method;
		}
		if (options.contentType) {
			const headers = new Headers();
			headers.append("Content-Type", options.contentType);
			res.headers = headers;
		}
		return res;
	}
});

interface APIProviderProps extends APIContextProps {
	children: React.ReactNode,
}

export default function APIProvider(props: APIProviderProps) {
	return (
		<APIContext.Provider value={props}>
			{props.children}
		</APIContext.Provider>
	)
}