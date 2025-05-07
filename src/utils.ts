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

export type StringIndexedObject = {[key: string]: string};

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type SelectValue = string | number | readonly string[] | undefined;