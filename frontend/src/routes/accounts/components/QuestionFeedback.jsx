import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import dummyData from "../dummyData.json";
import SearchAndFilter from "./SearchAndFilter";
import QuestionBox from "./QuestionBox";
import QuestionDetail from "./QuestionDetail";

export default function QuestionFeedback() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("newest");
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const { id } = useParams();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // 여기에 검색 로직 추가
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    // 여기에 필터 로직 추가
  };

  useEffect(() => {
    if (id) {
      fetchDetailItem(id);
    }
    loadMore(0);
  }, [id]);

  const fetchDetailItem = async (questionId) => {
    try {
      const detailData = dummyData.response.interviewResultInfos.find(
        (item) => item.id === parseInt(questionId)
      );
      setDetailItem(detailData);
    } catch (error) {
      setError("상세 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const loadMore = useCallback(
    async (currentPage) => {
      // const size = 10;
      // const start = currentPage * size;
      // const end = start + size;
      let newItems = [];
      if (id) {
        newItems = dummyData.response.interviewResultInfos;
        // const newItems = await fetchQuestionFeedbacks(page, filter, searchTerm);
        // setSelectedItem(await fetchQuestionFeedbackByQuestionId(id));
      } else {
        newItems = dummyData.response.interviewResultInfos;
        // const newItems = await fetchQuestionFeedbacks(page, filter, searchTerm);
      }

      if (newItems.length > 0) {
        setFeedbackItems((prevItems) => [...prevItems, ...newItems]);
        setPage(currentPage + 1);
        // setHasMore(end < dummyData.response.interviewResultInfos.length);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    },
    [selectedItem]
  );

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        filter={filter}
        onFilterChange={handleFilterChange}
      />

      {id && <QuestionDetail detailItem={detailItem} />}

      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {feedbackItems.map((item, index) => (
              <div key={index}>
                <QuestionBox item={item} selectedItem={selectedItem} />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </div>
  );
}
