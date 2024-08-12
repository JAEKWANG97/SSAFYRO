import React, { useState, useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import dummyData from '../dummyData.json';

// 텍스트를 200자로 제한하는 함수
const truncateText = (text, maxLength = 200) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export default function QuestionFeedback() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadMore(0);
  }, []);

  const loadMore = useCallback((currentPage) => {
    // const size = 10;
    // const start = currentPage * size;
    // const end = start + size;
    const newItems = dummyData.response.interviewResultInfos;
  
    if (newItems.length > 0) {
      setFeedbackItems(prevItems => [...prevItems, ...newItems]);
      setPage(currentPage + 1);  // 페이지 번호 증가
      // setHasMore(end < dummyData.response.interviewResultInfos.length);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        <ResponsiveMasonry
          columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
        >
          <Masonry>
            {feedbackItems.map((item, index) => (
              <div key={index} className="p-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold">{item.question}</h3>
                  <p>{truncateText(item.answer)}</p>
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </div>
  );
}