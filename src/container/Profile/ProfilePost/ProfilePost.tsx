import React  from 'react';
import Post from '../../../component/Post/Post';
import { IPost } from "../../../component/Post/Post";

export interface IProfilePost {
   posts: IPost[]
   fetchMoreData: () => void;
   setPost: React.Dispatch<React.SetStateAction<IPost[]>>;
   hasMore: boolean

}

const ProfilePost: React.FC<IProfilePost> = ({ fetchMoreData, posts, setPost, hasMore }) => {
   return (
      <div className={'activity_feed'}>
         <h4 className={'mb-4'}>Activity Feed</h4>
        {
          posts.length > 0 ? (
            <Post
              setPost={setPost}
              hasMore={hasMore}
              mockData={posts}
              fetchMoreData={fetchMoreData}
            />
          ) : <h4 className={"text-center"}>No Post Found</h4>
        }
      </div>
   );
};

export default ProfilePost;
