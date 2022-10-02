import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faImage,
  faMessage,
  faPen,
  faPoll,
} from "@fortawesome/free-solid-svg-icons";
import UserProfilLine from "./UserProfilLine";

const AsideProfil = (props) => {
  const { username, avatar } = props;
  return (
    <div className="justify-self-start grid grid-cols-1 grid-rows-3 gap-2 w-1/6 h-full bg-red-100 rounded-l-lg px-5">
      <div className="justify-center align-items-center flex flex-col">
        <img
          className="w-20 h-20 rounded-full self-center"
          src={avatar}
          alt="Avatar"
        ></img>
        <h2 className=" self-center text-centerml-10 mt-10">
          Bonjour {username ? username + " 🙂" : " 🙂"}{" "}
        </h2>
      </div>
      <div className="flex flex-col items-center justify-around h-1/2">
        <UserProfilLine
          title="Publications"
          icon={<FontAwesomeIcon icon={faImage} />}
        />
        <UserProfilLine
          title="Commentaire"
          icon={<FontAwesomeIcon icon={faMessage} />}
        />
      </div>
      <div className="flex flex-col items-center justify-around h-1/2">
        <UserProfilLine
          title="Modifier le profil"
          icon={<FontAwesomeIcon icon={faPen} />}
        />
        <UserProfilLine
          title="Déconnexion"
          icon={<FontAwesomeIcon icon={faGear} />}
        />
      </div>
    </div>
  );
};

export default AsideProfil;
