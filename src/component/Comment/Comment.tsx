import React from "react";
import Avatar from "../../assets/img/avatar.jpg";
import { IComment } from "../../services/slices/post";
import { timeAgo } from "../../helper";



const Comment: React.FC<IComment> = (comment) => {
  return (
    <React.Fragment>
      <hr />
      <div className={'comment_show'}>
        <img src={Avatar} alt={'comment_avatar'} />
        <div className={'comment_detail'}>
          <h5 onClick={() => window.location.href = `/other-profile/${comment.user.id}`}>
            {comment.user.user_name}
            <span> { timeAgo(comment.created_at) }</span>
          </h5>
          <p>{comment.text}</p>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default Comment;
