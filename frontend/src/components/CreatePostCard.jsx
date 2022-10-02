import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserLogInfos } from "../utils/redux/selectors";
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { createPost } from "../queries/post";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const CreatePostCard = () => {
  const { username, avatar, isAdmin } = useSelector(selectUserLogInfos);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(undefined);
  const [fileDataURL, setFileDataURL] = useState(null);

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    console.log("e", e);
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createPost(content, file);
    console.log("content", content);
    console.log("file :>> ", file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <div className="flex flex-col border rounded-md p-2 w-3/4 shadow-md">
      <h2 className="py-2 border-b">Post something</h2>
      <form className="flex items-center p-3" onSubmit={onSubmit}>
        <img
          class="w-10 h-10 rounded-full self-center"
          src={avatar}
          alt="Avatar"
        ></img>
        <span className="flex-grow">
          <input
            type="text"
            value={content}
            className="py-3 pl-3 mx-2 border-b w-full"
            placeholder="What's in your mind ?"
            onChange={(e) => setContent(e.target.value)}
          />
        </span>
        <label htmlFor="file-upload" className="cursor-pointer p-2 ml-3">
          <FontAwesomeIcon icon={faImage} size="xl" />
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={onChangeImage}
        />
      </form>
      {fileDataURL ? (
        <span className="flex flex-col justify-center pb-5">
          <span
            className="self-end cursor-pointer"
            onClick={() => {
              console.log("c");
              setFile(undefined);
              setFileDataURL(null);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
          {
            <img
              src={fileDataURL}
              alt="preview"
              className="object-cover self-center max-w-xs"
            />
          }
        </span>
      ) : null}
      <button
        type="submit"
        onClick={onSubmit}
        className="w-1/6 bg-green-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Post
      </button>
    </div>
  );
};

export default CreatePostCard;
