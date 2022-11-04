import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../../features/auth/authSlice";
import { ManageFavoriteMovies } from "../../../features/users/settings/settingsSlice";
import FilmFavorites from "../../../components/users/settings/filmFavorites";
import { toast } from "react-toastify";

function FilmSettings() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isError, isSuccess } = useSelector((state) => state.settings);

  useEffect(() => {
    if (isError) {
      toast("Something went wrong!");
    }
    if (!isError & isSuccess) {
      dispatch(update());
      toast("Settings saved!");
    }
  }, [isError, isSuccess, dispatch]);

  return (
    <>
      <div className="tab single">
        <h4>FAVORITE FILMS</h4>
        <div className="favorites">
          <FilmFavorites />
        </div>
      </div>
      <div className="tab single">
        <h4>FAVORITE ACTORS</h4>
      </div>
      <div className="tab single">
        <h4>FAVORITE DIRECTORS</h4>
      </div>
    </>
  );
}

export default FilmSettings;
