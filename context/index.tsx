import { useState, useEffect, useReducer, createContext } from "react";
import { user } from "./reducers/UserReducer";
import { jwt } from "./reducers/JWTReducer"

const initialState = {
  user: {},
  jwt: ""
};

const Context = createContext({});

const combineReducers = (...reducers:any) => (state:any, action:any) => {
  for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
  return state;
};

const Provider = ({ children }:any) => {
  const [state, dispatch] = useReducer(combineReducers(user, jwt), initialState);
  const value = { state, dispatch };

  useEffect(() => {
    localStorage.getItem("jwt") !== null &&
    dispatch({
        type: "SET_JWT",
        payload: localStorage.getItem("jwt")
    })
  }, [])

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };