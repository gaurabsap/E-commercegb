import React, { useReducer } from 'react'

const Reducer = () => {
    const inital_state = {
        name: "gaurab",
        add: "chitwan"
    }
    const reducer = (state, action) => {
      if(action.type == "CHANGE"){
        return  {...state, name: "musi"}
      }
      console.log(action)
      return state
    }
    const [state, dispatch] = useReducer(reducer, inital_state)
  return (
    <>
    {/* <h1>hello</h1> */}
        <h1>{state.name}</h1>
        <button onClick={() => dispatch({type: "CHANGE"})}>Change</button>
    </>
  )
}

export default Reducer