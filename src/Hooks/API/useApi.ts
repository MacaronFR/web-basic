import {useContext, useEffect, useMemo, useState} from "react";
import {APIContext} from "./APIProvider";

interface rawApiOptions {
	method?: string,
	body?: string | FormData | URLSearchParams,
	contentType?: string
}

export function useRawRequest() {
	const config = useContext(APIContext);
	return async <T>(url: string, options?: rawApiOptions): Promise<T | undefined> => {
		let req = {} as RequestInit;
		if(config.prepareRequest) {
			req = config.prepareRequest(req);
		}
		if (options) {
			req.method = options.method ?? "GET";
			req.body = options.body;
			if(req.headers === undefined) {
				req.headers = new Headers();
			}
			if(options.contentType) {
				(req.headers as Headers).append("Content-Type", options.contentType);
			}
		}
		try {
			const res = await fetch(config.baseUrl + url, req);
			if (res.status >= 200 && res.status < 300) {
				if (res.status === 204) {
					return undefined;
				}
				return res.json();
			} else {
				if(config.onError) {
					config.onError(res)
				}
				return undefined
			}
		} catch(e) {
			console.error(e);
			if(config.onError) {
				config.onError(e);
			}
			return undefined;
		}
	}
}

export interface apiOptions<T> {
	method?: string,
	body?: T
}

export function useRequest() {
	const rawRequest = useRawRequest();
	return async <R, B>(url: string, options?: apiOptions<B>): Promise<R | undefined> => {
		if(options) {
			const opt = {
				method: options.method,
				body: options.body ? JSON.stringify(options.body) : undefined,
				contentType: options.body ? "application/json" : undefined
			}
			return rawRequest(url, opt)
		} else {
			return rawRequest(url);
		}
	}
}

export default function useApi<R, B>(url: string, deps: any[], options?: apiOptions<B>): [R | undefined, boolean, string | undefined] {
	const [data, setData] = useState<R>();
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState(false);
	const depsString = useMemo(() => {
		return JSON.stringify(deps);
	}, [deps]);
	const optionsString = useMemo(() => {
		return JSON.stringify(options);
	}, [options]);
	const api = useRequest();
	useEffect(() => {
		setLoading(true);
		api<R, B>(url, options).then(
			data => {
				setData(data);
				setLoading(false);
			},
			error => {
				setError(error);
				setLoading(false);
			}
		)
	}, [url, optionsString, depsString]);

	return [
		data,
		loading,
		error
	]
}