import * as React from "react"
import * as ReactDOM from "react-dom"
import { Observer } from "mobx-react"
import { observable } from "mobx"

export const themes = {
	light: {
		foreground: "#000000",
		background: "#eeeeee"
	},
	dark: {
		foreground: "#ffffff",
		background: "#222222"
	}
}

const useState = React["useState"]

const themeContext = observable({
	theme: themes.dark,
	isDark: true
})

function Example(props) {
	// Declare a new state variable, which we'll call "count"
	const [count, setCount] = useState(0)

	const onClick = () => {
		themeContext.theme = themeContext.isDark ? themes.light : themes.dark
		themeContext.isDark = !themeContext.isDark
		setCount(count + 1)
	}
	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={onClick}>Click me</button>
			
		</div>
	)
}

function SomeDistantComp(props) {
	return (
		<Observer>
			{() => (
				<div style={{ backgroundColor: themeContext.theme.background }}>Testing theme</div>
			)}
		</Observer>
	)
}

const Index = () => {
	return (
		<div>
			Hello React!
			<div>
				<Example/>
				<SomeDistantComp />
			</div>
		</div>
	)
}

ReactDOM.render(<Index />, document.getElementById("root"))
