import React from "react";
import { Card, Tooltip } from "flowbite-react";
import {
  PencilIcon,
  CheckIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
} from "../../../heroicons/Icons";

const QuestionCard = ({ data, onClick, isFlipped }) => {
  return (
    <Card
      className="mb-5 w-full md:w-[600px] shadow-lg border-2 pb-0 transition-all duration-300 ease-in-out"
      onClick={onClick}
      style={{
        background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
        borderImage: "linear-gradient(to right, #4a90e2, #50e3c2) 1",
      }}
    >
      <button type="button" className="flex justify-center items-center">
        {!isFlipped ? <PencilIcon /> : <CheckIcon />}
      </button>

      <div className="w-full border-b-2 border-gray-200 pb-3 flex items-start gap-3 p-4">
        <QuestionMarkCircleIcon className="w-6 h-6 text-blue-500 mt-1" />
        <div>
          <span className="text-lg font-medium">{data.question}</span>
        </div>
      </div>
      <div className="w-full border-b-2 border-gray-200 pb-3 flex items-start gap-3 p-4">
        <ChatBubbleLeftRightIcon className="w-6 h-6 text-green-500 mt-1" />
        <div>
          <span className="text-md text-gray-700">{data.answer}</span>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
