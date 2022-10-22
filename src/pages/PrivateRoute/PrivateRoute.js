import { useNavigate } from "react-router-dom";
function PrivateRouter({ children }) {
  const navigate = useNavigate();
  let auth = window.localStorage.getItem("token");

  return auth ? children : navigate("/signing", { replace: true });
}
export default PrivateRouter;
