import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAxios, useFileReader } from "../../utils/hooks";
import { Post, rAddPost } from "../../utils/redux/postSlice";
import { useMyUser } from "../../utils/redux/selector";
import { getApiUrl, getAxiosHeaders } from "../../utils/services/api";
import AreaInput from "../UI/AreaInput";
import DisplayAvatar from "../common/DisplayAvatar";
import ImagePreview from "../common/ImagePreview";
import SendButtons from "../common/SendButtons";

type CreatePostInput = {
  content: string;
  attachment?: File | null;
};

const CreatePostCard: React.FC = () => {
  const user = useMyUser();
  const dispatch = useDispatch();

  const [post, setPost] = useState<CreatePostInput>({
    content: "",
    attachment: null,
  });
  const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null);

  const { fetchData } = useAxios<CreatePostInput, { result: Post }>(
    {
      allowFetch: false,
      url: getApiUrl("posts"),
      method: "post",
      body: { ...post },
      ...getAxiosHeaders("multipart/form-data"),
    },
    (data) => {
      if (data) dispatch(rAddPost(data.result));
    }
  );

  const onSubmit = () => {
    fetchData();
    setPost({ content: "", attachment: null });
    setImagePreviewURL(null);
  };

  useFileReader(post.attachment, setImagePreviewURL);

  return (
    <div className="flex bg-white shadow-md p-4 rounded-sm">
      <DisplayAvatar
        src={user.avatar}
        alt="profile_picture_create_post"
        className="w-12 mr-3 mt-4"
      />
      <div className="flex-1">
        <AreaInput
          rows={2}
          value={post.content}
          onChange={(content) => setPost((post) => ({ ...post, content }))}
          className="transition-colors ease-in-out duration-300 focus:bg-gray-50 "
        />
        <ImagePreview
          imageURL={imagePreviewURL}
          setImageURL={setImagePreviewURL}
          onCallback={() => setPost((post) => ({ ...post, attachment: null }))}
        />
        <SendButtons
          onFileChange={(file) =>
            setPost((post) => ({ ...post, attachment: file }))
          }
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default CreatePostCard;
