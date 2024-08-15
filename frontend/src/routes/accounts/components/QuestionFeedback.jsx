import React, { useState, useCallback, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import InfiniteScroll from "react-infinite-scroller";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import {
  fetchUserQuestionFeedbacks,
  fetchInterviewResults,
  fetchBestQuestionFeedbacks,
} from "../../../api/question_feedback_api";

import QuestionBox from "./QuestionBox";
import QuestionDetail from "./QuestionDetail";
import QuestionFeedbackNoneData from "./QuestionFeedbackNoneData";

import styled from "styled-components";

const CustomTagsInput = styled(TagsInput)`
  &.react-tagsinput {
    border: 1px solid #91d5ff;
    background-color: white;
  }
`;

export default function QuestionFeedback() {
  const tagStyle = {
    background: "#e6f7ff",
    border: "1px solid #91d5ff",
    color: "#1890ff",
    borderRadius: "2px", // 개별 태그의 모서리를 둥글게 (선택사항)
  };

  const tagInputStyle = {
    background: "#ffffff",
    border: "1px solid #91d5ff", // 전체 테두리 색상을 하늘색으로 설정
    borderRadius: "4px", // 모서리를 둥글게 (선택사항)
  };

  const [feedbackItems, setFeedbackItems] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("evaluationScore");
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const prevSearchRef = useRef("");

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const handleTagChange = (newTags) => {
    setTags(newTags);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearch = () => {
    if (tags.length === 0) {
      Swal.fire({
        title: "경고",
        text: "검색어를 입력해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const searchParams = new URLSearchParams();
    searchParams.append("tags", tags.join(","));
    searchParams.append("filter", filter);
    navigate(`/question_feedback/search?${searchParams.toString()}`);
  };

  useEffect(() => {
    setFeedbackItems([]);
    setPage(0);
    setHasMore(true);
    loadMore(0);
    setInitialLoadDone(true);
  }, [location.search, id]);

  const loadMore = useCallback(
    async (currentPage) => {
      try {
        setIsLoading(true);
        let newItems = [];
        if (id) {
          // 특정 질문 상세 정보 로드
          console.log(id + " 질문 상세 정보 로드");
          newItems = await fetchBestQuestionFeedbacks(id, currentPage, 10);
          setDetailItem(localStorage.getItem(detailItem));
          console.log(detailItem);
        } else if (location.pathname === "/question_feedback/search") {
          // 검색 결과 로드
          const searchParams = new URLSearchParams(location.search);
          const tagsParam = searchParams.get("tags");
          const filterParam = searchParams.get("filter");
          newItems = await fetchInterviewResults(
            tagsParam,
            filterParam,
            currentPage,
            10
          );
        } else {
          // 기본 피드백 목록 로드
          newItems = await fetchUserQuestionFeedbacks(currentPage, 10, filter);
          console.log(newItems);
        }

        if (newItems.length > 0) {
          setFeedbackItems((prevItems) =>
            currentPage === 0 ? newItems : [...prevItems, ...newItems]
          );
          console.log(newItems.length);

          setPage(currentPage + 1);
          setHasMore(newItems.length === 10);
        } else {
          setHasMore(false);
        }
        setInitialLoadDone(true);
      } catch (error) {
        console.error("Error loading more items:", error);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    },
    [id, location.pathname, location.search, filter, initialLoadDone]
  );

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && feedbackItems.length === 0) {
    return <QuestionFeedbackNoneData />;
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex-grow">
          <CustomTagsInput
            value={tags}
            onChange={handleTagChange}
            inputProps={{ placeholder: "태그" }}
            tagProps={{
              className: "bg-blue-500 text-white rounded-md px-2 py-1 mx-1",
              style: {
                background: "#e6f7ff",
                borderColor: "#91d5ff",
                color: "#1890ff",
              },
            }}
            className="react-tagsinput custom-tags-input" // 사용자 정의 클래스 추가
          />
        </div>
        {/* <select
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="highScore">고득점순</option>
          <option value="lowScore">저득점순</option>
          <option value="newest">최신순</option>
          <option value="oldest">오래된순</option>
        </select> */}
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          검색
        </button>
      </div>

      {id && <QuestionDetail detailItem={detailItem} />}

      <InfiniteScroll
        pageStart={-1}
        loadMore={loadMore}
        hasMore={hasMore && !isLoading && initialLoadDone}
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
