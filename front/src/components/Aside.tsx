import React, { useRef, useState } from "react";
import { useMyUser } from "../utils/redux/selector";
import { useAuth } from "../utils/context/auth";
import DisplayAvatar from "./common/DisplayAvatar";
import { useAxios, useFileReader, useOutsideClick } from "../utils/hooks";
import { getApiUrl, getAxiosHeaders } from "../utils/services/api";
import { User, rSetUser } from "../utils/redux/userSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "../utils/context/snackbar";
import { saveToLocalStorage } from "../utils/services/localStorage";

type UpdateUserInput = {
  id: string;
  pseudo: string | undefined;
  avatar: File | null;
};

const Aside: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const { id, avatar, pseudo } = useMyUser();
  const { onLogout } = useAuth();
  const { showSnackbar } = useSnackbar();

  const [editedUser, setEditedUser] = useState<UpdateUserInput>({
    id,
    pseudo,
    avatar: null,
  });
  const [onEdit, setOnEdit] = useState(false);
  const [imapePreviewURL, setImagePreviewURL] = useState(avatar);

  console.log("avatar", avatar);

  useFileReader(editedUser.avatar, setImagePreviewURL);

  useOutsideClick(ref, () => {
    setImagePreviewURL(avatar);
  });

  const { fetchData } = useAxios<UpdateUserInput, { result: User }>(
    {
      allowFetch: false,
      url: getApiUrl(`users/${id}`),
      method: "put",
      body: {
        ...editedUser,
      },
      ...getAxiosHeaders("multipart/form-data"),
    },
    (data) => {
      if (data) {
        setImagePreviewURL(data?.result.avatar);
        dispatch(rSetUser(data.result));
        saveToLocalStorage("user", data.result);
      }
      setOnEdit(false);
      showSnackbar({ type: "success", message: "Profil mis à jour !" });
    }
  );

  return (
    <div className="flex-0 flex flex-col items-center w-1/5 p-3 bg-purple-50 rounded-l-md">
      <div ref={ref} className="flex justify-center">
        <DisplayAvatar
          enableEdit
          src={imapePreviewURL}
          className="w-1/2 mt-8"
          alt="profile_picture"
          onFileChange={(file: File | null) => {
            setOnEdit(true);
            setEditedUser((user) => ({ ...user, avatar: file }));
          }}
        />
      </div>
      <div className="mt-5">
        <p className="text-xl">{pseudo}</p>
      </div>
      {onEdit && (
        <button className="mt-3" onClick={() => fetchData()}>
          <i className="fa-solid fa-check fa-lg text-green-600"></i>
        </button>
      )}
      <button className="mt-auto mb-3" onClick={onLogout}>
        <i className="fa-solid fa-right-to-bracket fa-lg text-gray-400 cursor-pointer"></i>
      </button>
    </div>
  );
};

export default Aside;
