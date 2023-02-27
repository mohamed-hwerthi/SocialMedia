import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIALSTATES = {
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIALSTATES);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIALSTATES);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* working with Context api : 

1 : definir les etats initial : initial States 
2 : create context with initial values 
3 : creating Wrapper or provider
4 : 
5 : 
6 : 
*/
