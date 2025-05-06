# IMacaron Web Basic

Basics for development in React with Tailwind

Made by Macaron

## Installation

`npm install imacaron-basic`

You will need to import the CSS to use this lib.
In your `index.css` add the import on the first line (every import of css before may be overridden by this lib otherwise).  
To customize the theme, you will use the `@layer theme` directive.   
```css
@import "imacaron-basic/index.css";
/*Other imports*/

@layer theme {
    :root {
        /* Custom variable to change the theme */
    }
}

/*If you use tailwind you can use the @theme directive*/
@theme {
    /* Custom variable to change the theme*/
}
```

## Customization

### Colors

These colors are the base of the lib and are used across many components.

| Name               | Variable                   | Default   |
|--------------------|----------------------------|-----------|
| Primary            | --color-primary            | #FFB900FF |
| On-Primary         | --color-on-primary         | #FEF3C6FF |
| Primary Disabled   | --color-primary-disabled   | #FE9A00FF |
| Secondary          | --color-secondary          | #00BCFFFF |
| On Secondary       | --color-on-secondary       | #F0F9FFFF |
| Secondary Disabled | --color-secondary-disabled | #0084D1FF |
| Cancel             | --color-cancel             | #99A1AFFF |
| On Cancel          | --color-on-cancel          | #1E2939FF |
| Cancel Disabled    | --color-cancel-disabled    | #6A7282FF |
| Danger             | --color-danger             | #FF637EFF |
| On Danger          | --color-on-danger          | #FFE4E6FF |
| Danger Disabled    | --color-danger-disabled    | #FF2056C0 |
| Background         | --color-background         | #1C1917FF |
| Text               | --color-text               | #FFFBEBFF |


## Components

### Table

The table component is used to display data in a table. This component is pageable, sortable, and the page size is also customizable.  
The component has a default theme but can be set via CSS variables.

| part         | variable                   | default   |
|--------------|----------------------------|-----------|
| header       | --color-table-header       | #171717FF |
| header:hover | --color-table-header-hover | #262626FF |
| row:even     | --color-table-even         | #27272AFF |
| row:odd      | --color-table-odd          | #18181BFF |
| border       | --color-table-border       | #FEF3C640 |
| loading      | --color-table-loading      | #FEF3C6FF |

To use the table component, you may use the `useTable` hook.  
```typescript jsx
useTable<T extends StringIndexedObject>(headers: Header[], data: T[], options: useTableOptions): TableProps

interface useTableOptions {
	pageSize?: number, //The default page size
	pageSizeOptions?: number[], //The options of page size
	maxPage?: number, //The max of page (can be state)
	pageable?: boolean, //If the pagination system is active
	sortable?: boolean, //If the table is sortable
	loading?: boolean, //Loading state (can be state)
	loadingElement?: React.ReactNode, //An element to customize loading
	error?: string, //Error to display (can be state)
}

//Usage
const table = useTable(headers, dataToDisplay, /*options if needed*/);
<Table {...table}/>
```
### Card
The card is a container with a border. You can also add a title.  
The component has a default theme, but you can customize it

| Part       | Variable            | Default   |
|------------|---------------------|-----------|
| Background | --color-card        | #27272AFF |
| Border     | --color-card-border | #FEF3C640 |


## Utility

### Array.prototype.extendTo

This function allows you to expand an array to the desired length by pushing the value you want or undefined

```typescript
const array = ["Test"];
array.expandTo(8)
console.log(array) // ["Test", undefined, undefined, undefined, undefined, undefined, undefined, undefined]

const array2 = ["Test"];
array.expandTo(4, "Fill")
console.log(array) // ["Test", "Fill", "Fill", "Fill"]
```

## Types Alias

| Type                | Alias for                               |
|---------------------|-----------------------------------------|
| StringIndexedObject | {[key: string]: string}                 |
| SetState<T>         | React.Dispatch<React.SetStateAction<T>> |
