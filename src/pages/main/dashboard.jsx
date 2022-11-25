import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const el = document.getElementById("main");
    const elHeader = document.getElementById("header");
    el.classList.remove("welcome-page");
    elHeader.classList.remove("welcome-header");
  }, [user, navigate, dispatch]);

  return <></>;
}

export default Dashboard;
