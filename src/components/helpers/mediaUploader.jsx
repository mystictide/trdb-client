import { useState, useEffect, useCallback } from "react";
import Cropper from "react-easy-crop";
import MediaPreview from "./mediaPreview";
import getCroppedImg from "../../content/js/cropImage";
import { useSelector, useDispatch } from "react-redux";
import {
  UpdateAvatar,
  reset,
} from "../../features/users/settings/settingsSlice";
import { FaUserAlt } from "react-icons/fa";

function MediaUploader() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.settings);

  const [mediaData, setMedialData] = useState({
    previewBlob: null,
  });

  const aspect = 1;
  const { previewBlob } = mediaData;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedArea, setCroppedArea] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      resetProcess();
      dispatch(reset());
    }
  }, [isSuccess, setMedialData, dispatch]);

  const onMediaDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          createBlob(file);
          //   console.log(`… file[${i}].name = ${file.name}`);
        }
      });
    } else {
      [...e.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  };

  const onDragging = (e) => {
    e.preventDefault();
    e.target.parentElement.classList.toggle("dropping");
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.target.parentElement.classList.toggle("dropping");
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const createBlob = (file) => {
    const blob = new Blob([file]);
    const blobURL = URL.createObjectURL(blob);
    setMedialData((prevState) => ({
      ...prevState,
      previewBlob: blobURL,
    }));
  };

  const getCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(previewBlob, croppedAreaPixels);
      return croppedImage;
    } catch (e) {
      console.error(e);
    }
  }, [previewBlob, croppedAreaPixels]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const uploadAvatar = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImage();
      let formData = new FormData();
      let file = new File([croppedImage], "userAvatar.jpg", {
        type: "image/jpeg",
        lastModified: new Date().getTime(),
      });
      formData.append("file", file, "userAvatar.jpg");
      const reqData = { data: formData, token: user.Token };
      dispatch(UpdateAvatar(reqData));
    } catch (e) {
      console.error(e);
    }
  }, [user, getCroppedImage, dispatch]);

  const resetProcess = (e) => {
    setMedialData({ previewBlob: null });
    setCrop({ x: 0, y: 0 });
    setCroppedArea(null);
    setCroppedAreaPixels(null);
  };

  return (
    <>
      <div className="media">
        {!previewBlob ? (
          <div className="avatar-container">
            <label>Profile picture</label>
            <section className="uploader-container">
              <div className="uploader">
                <div
                  className="file"
                  id="drop_zone"
                  onDrop={(e) => onMediaDrop(e)}
                  onDragEnter={(e) => onDragging(e)}
                  onDragLeave={(e) => onDragLeave(e)}
                  onDragOver={(e) => onDragOver(e)}
                >
                  <div className="interact">
                    <input
                      type="file"
                      className="form-control"
                      id="picture"
                      name="picture"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={(e) => createBlob(e.target.files[0])}
                    />
                    <label htmlFor="picture">Drag and drop image</label>
                  </div>
                  <div className="preview-container">
                    <div className="preview">
                      {user.Settings.picture_path ? (
                        <img
                          alt="user avatar"
                          src={
                            "http://127.0.0.1:8887/avatars/user" +
                            user.Settings.picture_path
                          }
                        />
                      ) : (
                        <FaUserAlt />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="media-uploader">
            {croppedArea ? (
              <div className="viewer">
                <MediaPreview
                  croppedArea={croppedArea}
                  previewBlob={previewBlob}
                />
                <div className="user">
                  <h4>{user.Username}</h4>
                  <h5>847 films 256 reviews</h5>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="cropper">
              <Cropper
                image={previewBlob}
                aspect={aspect}
                crop={crop}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropAreaChange={(croppedArea) => {
                  setCroppedArea(croppedArea);
                }}
                onCropComplete={onCropComplete}
              />
            </div>
            {croppedArea ? (
              <div className="functions">
                <button
                  type="button"
                  onClick={(e) => {
                    uploadAvatar();
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    resetProcess();
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default MediaUploader;
