import React from "react";
import Avatar from "../../assets/img/avatar.jpg";
import post, { IComment } from "../../services/slices/post";
import { getCurrentUser, timeAgo } from "../../helper";
import { RiDeleteBin6Line } from "react-icons/ri";


export interface ICommentProps extends IComment{
  onCommentDeleteHandler: (commentId: number, postId: number) => void;
  postId: number
}

const Comment: React.FC<ICommentProps> = (comment) => {

  return (
    <React.Fragment>
      <hr />
      <div className={'comment_show'}>
        <div className={"d-flex"}>
          <img src={Avatar} alt={'comment_avatar'} />
          <div className={'comment_detail'}>
            <h5 onClick={() => window.location.href = `/other-profile/${comment.user.id}`}>
              {comment.user.user_name}
              <span> { timeAgo(comment.created_at) }</span>
            </h5>
            <p>{comment.text}</p>
          </div>
        </div>
        {
          getCurrentUser().id == comment.user.id ? (
            <RiDeleteBin6Line onClick={() => comment.onCommentDeleteHandler(comment.id!, comment.postId)} className={"delete"}/>
          ) : null
        }
      </div>
      <hr />
    </React.Fragment>
  );
};

export default Comment;
