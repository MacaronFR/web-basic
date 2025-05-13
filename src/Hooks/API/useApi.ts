import {useContext, useEffect, useState} from "react";
import {APIContext} from "./APIContext";

export interface useApiOptions {
	method?: string,
	body?: ReadableStream<any> | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | string,
	contentType?: string
}

export default function useApi<T>(url: string, options?: useApiOptions): [T | undefined, boolean, string | undefined] {
	const config = useContext(APIContext);
	const [data, setData] = useState<T>();
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		if(config.prepareRequest) {
			const configOptions = config.prepareRequest(options ?? {});
			if(configOptions === null) {
				return;
			}
			fetch(config.url + url, configOptions).then(async (res) => {
				if(res.status === 200) {
					const data = await res.json();
					setData(data);
					setLoading(false);
				} else {
					const error = await res.text();
					setError(error);
					setLoading(false);
				}
			});
		}
	}, [url, options, config]);

	return [
		data,
		loading,
		error
	]
}