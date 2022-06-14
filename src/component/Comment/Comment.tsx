import React from "react";
import Avatar from "../../assets/img/avatar.jpg";
import { getCurrentUser, timeAgo } from "../../utils/helper";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IUser } from "../Header/Header";
import Verified from "../../assets/img/verified.png";


export interface IComment {
  id?: number,
  text: string,
  user: IUser,
  created_at: string
}

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
          <img className={"avatar"} src={comment.user.image ? comment.user.image.avatar : Avatar} alt={'comment_avatar'} />
          <div className={'comment_detail'}>
            <h5 onClick={() => window.location.href = `/other-profile/${comment.user.id}`}>
              {comment.user.user_name}
              {
                comment.user.is_verified ?
                  <img alt={"verified"} className={"verified"} src={Verified} width={30} height={25} />
                  : null
              }
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
