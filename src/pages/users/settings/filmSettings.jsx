import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../../features/auth/authSlice";
import { reset } from "../../../features/users/settings/settingsSlice";
import FilmFavorites from "../../../components/users/settings/filmFavorites";
import ActorFavorites from "../../../components/users/settings/actorFavorites";
import DirectorFavorites from "../../../components/users/settings/directorFavorites";
import { toast } from "react-toastify";

function FilmSettings() {
  const dispatch = useDispatch();

  const { isError, isSuccess } = useSelector((state) => state.settings);

  useEffect(() => {
    if (isError) {
      toast("Something went wrong!");
      dispatch(reset());
    }
    if (!isError & isSuccess) {
      dispatch(update());
      toast("Settings saved!");
      dispatch(reset());
    }
  }, [isError, isSuccess, dispatch]);

  return (
    <>
      <div className="tab single">
        <div className="favorites">
          <FilmFavorites />
        </div>
      </div>
      <div className="tab single">
        <div className="favorites">
          <ActorFavorites />
        </div>
      </div>
      <div className="tab single">
        <div className="favorites">
          <DirectorFavorites />
        </div>
      </div>
    </>
  );
}

export default FilmSettings;
