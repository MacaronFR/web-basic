import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {APIContext} from "./APIProvider";

interface rawApiOptions extends apiOptions<string | FormData | URLSearchParams> {
	contentType?: string,
}

export function useRawRequest() {
	const config = useContext(APIContext);
	const rawRequest = useCallback(async <T>(url: string, options?: rawApiOptions): Promise<T | undefined> => {
		let req = {} as RequestInit;
		if(config.prepareRequest) {
			const tmp = config.prepareRequest(req);
			if(tmp === undefined) {
				return undefined;
			} else {
				req = tmp;
			}
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
					const result = config.onError(res);
					if(typeof result === "boolean" && result) {
						rawRequest(url, options);
					} else if(await result) {
						rawRequest(url, options);
					}
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
	}, [config.onError, config.prepareRequest, config.baseUrl]);
	return rawRequest;
}

export interface apiOptions<T> {
	method?: string,
	body?: T | null,
	if?: boolean
}

export function useRequest() {
	const rawRequest = useRawRequest();
	return useCallback(async <R>(url: string, options?: apiOptions<{}>): Promise<R | undefined> => {
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
	}, [rawRequest]);
}

export default function useApi<R>(url: string, deps: any[], options?: apiOptions<object>): [R | undefined, boolean, string | undefined] {
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
		api<R>(url, options).then(
			data => {
				setData(data);
				setLoading(false);
			},
			error => {
				setError(error);
				setLoading(false);
			}
		)
	}, [url, optionsString, depsString, api]);

	return [
		data,
		loading,
		error
	]
}