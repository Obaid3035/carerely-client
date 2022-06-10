import React, { useEffect, useState } from "react";
import SiteModal, { ISiteModal } from "../../../../../component/SiteModal/SiteModal";
import Post from "../../../../../component/Post/Post";
import { getTrendingPosts } from "../../../../../services/api/post";
import Loader from "../../../../../component/Loader/Loader";

const TrendingPostModal: React.FC<ISiteModal> = ({ show, onModalChange }) => {
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [posts, setPosts] = useState<any>([]);
  const [postCount, setPostCount] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    getTrendingPosts(page, size)
      .then((res) => {
        setIsLoading(false);
        setPosts(res.data.posts);
        setPostCount(res.data.count)
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const fetchMoreData = () => {
    if (posts.length === postCount) {
      setHasMore(false);
      return;
    }

    getTrendingPosts(page + 1, size)
      .then((res) => {
        setPage(page + 1)
        setIsLoading(false);
        setPosts([...posts, ...res.data.posts]);
        setPostCount(res.data.count)
      })
      .catch(() => {
        setIsLoading(false);
      });
  };


  let renderPost;
  if (isLoading) {
    renderPost = <Loader />;
  }

  if (!isLoading) {
    if (posts && posts.length > 0) {
      renderPost = (
        <Post
          setPost={setPosts}
          hasMore={hasMore}
          mockData={posts}
          fetchMoreData={fetchMoreData}
        />
      );
    } else {
      renderPost = <h4 className={"text-center"}>No Post Found</h4>;
    }
  }

  return (
    <SiteModal size={"lg"} show={show} onModalChange={onModalChange}>
      <div className={"activity_feed"}>
        { renderPost }
      </div>
    </SiteModal>
  );
};

export default TrendingPostModal;
