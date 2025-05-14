import {useEffect, useMemo, useState} from "react";

export interface APIConfig {
	url: string,
	prepareRequest: (options: apiOptions) => RequestInit | null
}

export const apiConfig: APIConfig = {
	url: "",
	prepareRequest: (options: apiOptions) => {
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
}

export interface apiOptions {
	method?: string,
	body?: ReadableStream<any> | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | string,
	contentType?: string
}

export async function api<T>(url: string, options?: apiOptions): Promise<T> {

	if(apiConfig.prepareRequest) {
		const configOptions = apiConfig.prepareRequest(options ?? {});
		if(configOptions === null) {
			throw new Error("No config");
		}
		const res = await fetch(apiConfig.url + url, configOptions)
		if(res.status >= 200 && res.status < 300) {
			if(res.status === 204) {
				return undefined as unknown as T;
			}
			const data = await res.json();
			return data as T;
		} else {
			const error = await res.text();
			throw new Error(error);
		}
	} else {
		throw new Error("No config");
	}
}

export default function useApi<T>(url: string, deps: any[], options?: apiOptions): [T | undefined, boolean, string | undefined] {
	const [data, setData] = useState<T>();
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState(false);
	const depsString = useMemo(() => {
		return JSON.stringify(deps);
	}, [deps])
	useEffect(() => {
		setLoading(true);
		api<T>(url, options).then(
			data => {
				setData(data);
				setLoading(false);
			},
			error => {
				setError(error);
				setLoading(false);
			}
		)
	}, [url, options, depsString]);

	return [
		data,
		loading,
		error
	]
}