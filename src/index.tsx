import * as React from "react"
import * as ReactDOM from "react-dom"

const useState = React["useState"]

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

export const ThemeContext = React.createContext({
	theme: themes.dark,
	toggleTheme: () => {}
})

function ThemeContextComp(props) {
	const [themeState, setThemeState] = useState({
		isDark: false,
		theme: themes.light
	})

	const [toggleTheme, setToggleTheme] = useState({
		toggleTheme: () => {
			setThemeState(state => {
				console.log("will: ", state)
				console.log("switching: ", state.isDark ? themes.light : themes.dark)

				return {
					isDark: !state.isDark,
					theme: state.isDark ? themes.light : themes.dark
				}
			})
		}
	})

	return (
		<ThemeContext.Provider value={{ ...themeState, ...toggleTheme }}>
			{props.children}
		</ThemeContext.Provider>
	)
}

function Example(props) {
	// Declare a new state variable, which we'll call "count"
	const [count, setCount] = useState(0)

	const onClick = () => {
		setCount(count + 1)
	}

	return (
		<ThemeContext.Consumer>
			{({ theme, toggleTheme }) => {
				console.log("consumer updated..")
				return (
					<div>
						<p>You clicked {count} times</p>
						<button
							onClick={toggleTheme}
							style={{ backgroundColor: theme.background }}
						>
							Toggle Theme
						</button>
					</div>
				)
			}}
		</ThemeContext.Consumer>
	)
}

function SomeDistantComp(props) {
	return (
		<ThemeContext.Consumer>
			{({ theme, toggleTheme }) => (
				<div style={{ backgroundColor: theme.background }}>Testing theme</div>
			)}
		</ThemeContext.Consumer>
	)
}
const Index = () => {
	return (
		<div>
			Hello React!
			<div>
				<ThemeContextComp>
					<Example />
					<SomeDistantComp />
				</ThemeContextComp>
			</div>
		</div>
	)
}

ReactDOM.render(<Index />, document.getElementById("root"))
