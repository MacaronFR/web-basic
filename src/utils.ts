declare global {
	interface Array<T> {
		extendTo(length: number, value?: T): T[];
	}
}

Array.prototype.extendTo = function<T>(length: number, value?: T): T[] {
	const currLength = this.length;
	for(let i = currLength; i < length; i++) {
		this.push(value);
	}
	return this;
}

export type StringIndexedObject = {[key: string]: any};

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type SelectValue = string | number | readonly string[] | undefined;

export function deepDotAccess<T>(obj: StringIndexedObject, path: string): T {
	let lastAccess = obj;
	path.split(".").forEach(key => {
		lastAccess = lastAccess[key];
	})
	return lastAccess as T;
}