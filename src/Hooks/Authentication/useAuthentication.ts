import pkceChallenge from "pkce-challenge"
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthenticationContext} from "./AuthenticationProvider";
import {useLocation} from "react-router";

interface UseAuthentication {
	login: (destination: string, origin?: string) => Promise<void>;
	fetchToken: (type: "authorization" | "refresh", code: string) => Promise<void>;
	token: string | null;
	loading: boolean;
	logout: (to: string) => void;
}

export default function useAuthentication(): UseAuthentication {
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const context = useContext(AuthenticationContext);
	const location = useLocation();

	const fetchToken = useCallback(async (type: "authorization" | "refresh", code: string) => {
		if (type === "authorization") {
			const codeVerifier = sessionStorage.getItem("code_verifier");
			if (!codeVerifier) {
				console.error("No code verifier found");
				return;
			}

			try {
				const tokenResponse = await fetch(context.tokenUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: new URLSearchParams({
						grant_type: "authorization_code",
						code: code,
						client_id: context.clientId,
						code_verifier: codeVerifier
					})
				});

				const token = await tokenResponse.json();

				localStorage.setItem("token", token.access_token);
				localStorage.setItem("refresh_token", token.refresh_token);
				setToken(token.access_token);
			} catch (e) {
				console.error(e);
			}
		} else if(type === "refresh") {
			try {
				const tokenResponse = await fetch(context.tokenUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: new URLSearchParams({
						grant_type: "refresh_token",
						refresh_token: code,
						client_id: context.clientId,
					})
				});

				const token = await tokenResponse.json();

				localStorage.setItem("token", token.access_token);
				localStorage.setItem("refresh_token", token.refresh_token);
				setToken(token.access_token);
			} catch (e) {
				console.error(e);
			}
		}
	}, [context]);

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const authCode = urlParams.get('code');
		if(authCode) {
			fetchToken("authorization", authCode).then(() => {
				setLoading(false);
				window.location.href = window.location.origin + location.pathname;
			});
		} else {
			setLoading(false);
		}
	}, [location]);

	const login = useCallback(async (destination: string, origin?: string) => {
		const {code_verifier, code_challenge} = await pkceChallenge();
		sessionStorage.setItem("code_verifier", code_verifier);

		const authUrl = new URL(context.baseURL + destination);
		authUrl.searchParams.append('client_id', context.clientId);
		authUrl.searchParams.append('response_type', 'code');
		authUrl.searchParams.append('redirect_uri', window.location.origin + (origin ?? "/"));
		authUrl.searchParams.append('code_challenge', code_challenge);

		window.location.href = authUrl.toString();
	}, [context]);

	const logout = useCallback((to: string) => {
		localStorage.removeItem("token");
		localStorage.removeItem("refresh_token");
		setToken(null);
		window.location.href = to + (location.search === "" ? "?" : "") + "origin=" + location.pathname;
	}, [location]);

	useEffect(() => {
		const token = localStorage.getItem("token") ?? "";
		if(token) {
			setToken(token);
		}
	}, []);

	return {
		login: login,
		fetchToken: fetchToken,
		token: token,
		loading: loading,
		logout: logout
	}
}
