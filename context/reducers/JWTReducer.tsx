export function jwt(state:any, action:any) {
    switch (action.type) {
      case "SET_JWT":
        return { ...state, jwt: action.payload };
      default:
        return state;
    }
}