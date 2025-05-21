import {createContext, useCallback, useEffect, useState} from "react";
import pkceChallenge from "pkce-challenge"
import * as React from "react";
import {useLocation} from "react-router";
import {SetState} from "../../utils";

interface AuthenticationContextType {
	clientId: string,
	baseURL: string,
	tokenUrl: string,
	loading: boolean,
	setLoading: SetState<boolean>,
	isFetching: boolean,
	setIsFetching: SetState<boolean>,
	login: (destination: string, origin?: string) => Promise<void>,
	fetchToken: (type: "authorization" | "refresh", code: string) => Promise<void>,
	token: string | null,
	logout: (to: string) => void,
	isAuthenticated: boolean,
}

export const AuthenticationContext = createContext<AuthenticationContextType>({
	clientId: "",
	baseURL: "",
	tokenUrl: "",
	loading: true,
	setLoading: () => {},
	isFetching: false,
	setIsFetching: () => {},
	login: () => Promise.resolve(),
	fetchToken: () => Promise.resolve(),
	token: null,
	logout: () => {},
	isAuthenticated: false,
});

interface AuthenticationProviderProps {
	clientId: string,
	baseURL: string,
	tokenUrl: string,
	children: React.ReactNode;
}

export function AuthenticationProvider(props: AuthenticationProviderProps) {
	const [loading, setLoading] = useState<boolean>(true);
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	const location = useLocation();

	const fetchToken = useCallback(async (type: "authorization" | "refresh", code: string) => {
		setLoading(true);
		setIsFetching(true);
		if (type === "authorization") {
			const codeVerifier = sessionStorage.getItem("code_verifier");
			if (!codeVerifier) {
				console.error("No code verifier found");
				return;
			}

			try {
				const tokenResponse = await fetch(props.tokenUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: new URLSearchParams({
						grant_type: "authorization_code",
						code: code,
						client_id: props.clientId,
						code_verifier: codeVerifier
					})
				});

				const token = await tokenResponse.json();

				sessionStorage.setItem("token", token.access_token);
				sessionStorage.setItem("refresh_token", token.refresh_token);
				setIsAuthenticated(true);
				setLoading(false);
				setIsFetching(false);
			} catch (e) {
				console.error(e);
			}
		} else if(type === "refresh") {
			try {
				const tokenResponse = await fetch(props.tokenUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: new URLSearchParams({
						grant_type: "refresh_token",
						refresh_token: code,
						client_id: props.clientId,
					})
				});

				const token = await tokenResponse.json();

				sessionStorage.setItem("token", token.access_token);
				sessionStorage.setItem("refresh_token", token.refresh_token);
				setIsAuthenticated(true);
				setLoading(false);
				setIsFetching(false);
			} catch (e) {
				console.error(e);
			}
		}
	}, [props.tokenUrl, props.clientId]);

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const authCode = urlParams.get('code');
		if(authCode) {
			window.location.href = window.location.origin + location.pathname;
			if(!isFetching) {
				fetchToken("authorization", authCode).then(() => {
					window.location.href = window.location.origin + location.pathname;
				});
			}
		} else {
			setLoading(false);
		}
	}, [location, isFetching, setLoading, setIsFetching, fetchToken]);

	const login = useCallback(async (destination: string, origin?: string) => {
		const {code_verifier, code_challenge} = await pkceChallenge();
		sessionStorage.setItem("code_verifier", code_verifier);

		const authUrl = new URL(props.baseURL + destination);
		authUrl.searchParams.append('client_id', props.clientId);
		authUrl.searchParams.append('response_type', 'code');
		authUrl.searchParams.append('redirect_uri', window.location.origin + (origin ?? "/"));
		authUrl.searchParams.append('code_challenge', code_challenge);

		window.location.href = authUrl.toString();
	}, [props.baseURL, props.clientId]);

	const logout = useCallback((to: string) => {
		setIsAuthenticated(false);
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("refresh_token");
		window.location.href = to + (location.search === "" ? "?" : "") + "origin=" + location.pathname;
	}, [location]);

	useEffect(() => {
		if(sessionStorage.getItem("token")) {
			setIsAuthenticated(true);
		}
	}, []);

	const contextValue = {
		...props,
		loading: loading,
		setLoading: setLoading,
		isFetching: isFetching,
		setIsFetching: setIsFetching,
		login: login,
		fetchToken: fetchToken,
		token: sessionStorage.getItem("token") ?? "",
		logout: logout,
		isAuthenticated: isAuthenticated,
	}
	return <AuthenticationContext.Provider value={contextValue}>
		{props.children}
	</AuthenticationContext.Provider>
}