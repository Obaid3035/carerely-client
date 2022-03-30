import React, { useState } from "react";
import SiteModal, { ISiteModal } from "../../../../../component/SiteModal/SiteModal";
import Post from "../../../../../component/Post/Post";
import { IPost } from "../../../../../services/slices/post";

const TrendingPostModal: React.FC<ISiteModal> = ({ show, onModalChange }) => {
  const [mockData, setMockData] = useState<IPost[]>([
    {
      id: 1,
      user: {
        id: 2,
        user_name: "Ali Rashid",
        avatar: "https://picsum.photos/id/1011/500/500"

      },
      liked: true,
      image: {
        avatar: "https://picsum.photos/id/1000/800/500"
      },
      text: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum ex," +
        " eget ultrices ex. Vestibulum ac velit in metus laoreet volutpat at id risus. Curabitur mattis lobortis vehicula." +
        " Nullam eu lobortis purus. In hac habitasse platea dictumst. Proin viverra aliquet nisl vitae auctor." +
        " Donec tortor augue, pharetra a efficitur non, tincidunt vitae felis.",
      comment: [],
      like_count: 0,
      comment_count: 0,
    },
    {
      id: 2,
      user: {
        id: 3,
        user_name: "Shayaan Sohail",
        avatar: "https://picsum.photos/id/1009/500/500"
      },
      liked: true,
      image: {
        avatar: "https://picsum.photos/id/1012/800/500"
      },
      text: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum ex, eget ultrices ex." +
        " Vestibulum ac velit in metus laoreet volutpat at id risus. Curabitur mattis lobortis vehicula. Nullam eu" +
        " lobortis purus. In hac habitasse platea dictumst. Proin viverra aliquet nisl vitae auctor. Donec tortor augue," +
        " pharetra a efficitur non, tincidunt vitae felis.",
      like_count: 0,
      comment_count: 0,
      comment: []
    }
  ]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (mockData.length >= 2) {
      setHasMore(false);
      console.log(mockData.length);
      return;
    }

    setTimeout(() => {
      setMockData([...mockData, ...mockData]);
    }, 1000);
  };

  return (
    <SiteModal size={"lg"} show={show} onModalChange={onModalChange}>
      <div className={"activity_feed"}>
        <Post setPost={setMockData} hasMore={hasMore} mockData={mockData} fetchMoreData={fetchMoreData} />
      </div>
    </SiteModal>
  );
};

export default TrendingPostModal;
