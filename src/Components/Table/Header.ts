export default interface Header<T> {
	name?: string,
	size?: number|string,
	columnClassName?: string,
	id: string,
	sortable?: boolean,
	render?: (value: T) => React.ReactNode
}