import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/redux/selectors";
import {
  faImage,
  faTrash,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { createPost } from "../queries/post";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const CreatePostCard = () => {
  const { avatar } = useSelector(selectUser);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(undefined);
  const [fileDataURL, setFileDataURL] = useState(null);

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("imageUrl", file);
    data.append("content", content);
    createPost(data);
    setFile(undefined);
    setFileDataURL(null);
    setContent("");
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
      <form
        className="flex items-center my-3 p-3  rounded-lg"
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <img
          className="w-10 h-10 rounded-full self-center"
          src={avatar}
          alt="Avatar"
        ></img>
        <span className="flex-grow">
          <input
            type="text"
            value={content}
            className="py-3 pl-3 mx-2 border-b w-full focus-within:outline-0"
            placeholder="What's in your mind ?"
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => setContent("")}
          />
        </span>
        <label htmlFor="file-upload" className="cursor-pointer p-2 ml-3">
          <FontAwesomeIcon icon={faImage} size="xl" color="#fed0d0" />
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          name="imageUrl"
          onChange={onChangeImage}
        />
        <button type="submit" onClick={onSubmit} className=" p-2">
          <FontAwesomeIcon icon={faPaperPlane} color="#fed0d0" size="xl" />
        </button>
      </form>
      {fileDataURL ? (
        <span className="flex flex-col justify-center pb-2">
          {
            <img
              src={fileDataURL}
              alt="preview"
              className="object-cover self-center max-w-xs"
            />
          }
          <span
            className="self-end cursor-pointer"
            onClick={() => {
              setFile(undefined);
              setFileDataURL(null);
            }}
          >
            <FontAwesomeIcon icon={faTrash} color="#b1b1b1" />
          </span>
        </span>
      ) : null}
    </div>
  );
};

export default CreatePostCard;
