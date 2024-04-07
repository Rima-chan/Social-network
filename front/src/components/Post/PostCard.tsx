import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "../../utils/context/snackbar";
import { useAxios, useFileReader, useOutsideClick } from "../../utils/hooks";
import { Post, rDeletePost, rUpdatePost } from "../../utils/redux/postSlice";
import { getApiUrl, getAxiosHeaders } from "../../utils/services/api";
import AreaInput from "../UI/AreaInput";
import DisplayAvatar from "../common/DisplayAvatar";
import ImagePreview from "../common/ImagePreview";
import MoreOptionsButton from "../common/MoreOptionsButton";
import SendButtons from "../common/SendButtons";

type UpdatePostInput = {
  id: string;
  content: string | undefined;
  attachment: File | null;
};

type Props = {
  post: Post;
};

const PostCard: React.FC<Props> = ({ post }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();

  const [showEditPopover, setShowEditPopover] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const {
    id,
    content,
    attachment,
    createdAt,
    updatedAt,
    user: { pseudo, avatar },
  } = post;

  const [editedPost, setEditedPost] = useState<UpdatePostInput>({
    id,
    content,
    attachment: null,
  });
  const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null);

  useFileReader(editedPost.attachment, setImagePreviewURL);

  useOutsideClick(ref, () => {
    if (onEdit) {
      setOnEdit(false);
      setImagePreviewURL(null);
    }
  });

  const { fetchData } = useAxios<UpdatePostInput, { result: Post }>(
    {
      allowFetch: false,
      url: getApiUrl(`posts/${id}`),
      method: "put",
      body: {
        ...editedPost,
      },
      ...getAxiosHeaders("multipart/form-data"),
    },
    (data) => {
      if (data) dispatch(rUpdatePost(data.result));
      setImagePreviewURL(null);
      showSnackbar({ type: "success", message: "Sauvegardé !" });
    }
  );

  const { fetchData: deletePost } = useAxios(
    {
      allowFetch: false,
      url: getApiUrl(`posts/${id}`),
      method: "delete",
      ...getAxiosHeaders("application/json"),
    },
    () => {
      dispatch(rDeletePost({ id: post.id }));
      showSnackbar({ type: "success", message: "Post supprimé !" });
    }
  );

  const formattedDate = new Date(createdAt).toLocaleDateString();
  const hasBeenUpdated = createdAt !== updatedAt;

  return (
    <div
      ref={ref}
      className="relative flex flex-col bg-white shadow-md p-6 rounded-sm mb-5 w-5/6"
      key={id}
    >
      <div className="flex items-center pb-2">
        <DisplayAvatar src={avatar} alt="user_post_avatar" className="w-8" />
        <div className=" flex-1 pl-4">
          <p className="text-gray-800 font-bold ">{pseudo}</p>
          <p className="text-xs italic text-gray-500">{`Le ${formattedDate} ${
            hasBeenUpdated ? "(modifié)" : ""
          }`}</p>
        </div>
        <MoreOptionsButton
          show={showEditPopover}
          setShow={setShowEditPopover}
          onEdit={() => {
            setOnEdit(true);
          }}
          onDelete={() => {
            deletePost();
            setShowEditPopover(false);
          }}
        />
      </div>
      {onEdit ? (
        <AreaInput
          rows={2}
          value={editedPost.content}
          onChange={(content) =>
            setEditedPost((post) => ({ ...post, content }))
          }
        />
      ) : (
        <div className=" py-3">{content}</div>
      )}
      {attachment && !imagePreviewURL && (
        <div className="flex self-center justify-center object-cover mt-3">
          <img src={attachment} alt="post_picture" className="w-4/6" />
        </div>
      )}
      <ImagePreview
        imageURL={imagePreviewURL}
        setImageURL={setImagePreviewURL}
        onCallback={() =>
          setEditedPost((post) => ({ ...post, attachment: null }))
        }
      />

      {onEdit && (
        <SendButtons
          onFileChange={(file: File | null) => {
            setEditedPost((post) => ({ ...post, attachment: file }));
          }}
          onSubmit={() => {
            fetchData();
            setImagePreviewURL(null);
            setOnEdit(false);
          }}
        />
      )}
    </div>
  );
};

export default PostCard;
