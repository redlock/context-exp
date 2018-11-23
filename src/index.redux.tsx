import * as React from "react"
import * as ReactDOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk';

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

const initialState = {
  theme: themes.dark,
  isDark: true
}

function themeContextReducer(state=initialState, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      if (state.isDark) {
        return {
          theme: themes.light,
          isDark: false
        }
      } else {
        return {
          theme: themes.dark,
          isDark: true
        }
      }

    default:
      return state
  }
}

const store = createStore(themeContextReducer, applyMiddleware(thunk))

function Example(props) {
  const [count, setCount] = useState(0)
  const onClick = () => {
    props.toggleTheme()
    setCount(count + 1)
  }

	return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={onClick}> Toggle Theme </button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' })
})

const WrappedExample = connect(null, mapDispatchToProps)(Example)


function SomeDistantComp(props) {
	return (
		<div style={{ backgroundColor: props.theme.background }}>
      Testing theme
    </div>
	)
}

const mapStateToProps = state => {
  return {
    theme: state.theme
  }
}

const WrappedSomeDistantComp = connect(mapStateToProps)(SomeDistantComp)

const Index = () => {
	return (
		<Provider store={store}>
      <div>
        Hello React!!!
        <div>
          <WrappedExample />
          <WrappedSomeDistantComp />
        </div>
      </div>
		</Provider>
	)
}

ReactDOM.render(<Index />, document.getElementById("root"))
