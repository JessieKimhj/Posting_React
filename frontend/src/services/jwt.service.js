import axios from "axios";

export const setSession = (token) => {
  if (token) {
    localStorage.setItem("jwt_access_token", token);
    //페이지 리프레시 할때마다 토큰이 있다고 알려줌. 이게 없다면 로컬스토리지에서 매번 토큰을 꺼내서 보여줘야함. ㅔ
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    localStorage.removeItem("jwt_access_token");
    delete axios.defaults.headers.common["Authorization"];
  }
};
export const getAccessToken = () => {
  return window.localStorage.getItem("jwt_access_token");
};
