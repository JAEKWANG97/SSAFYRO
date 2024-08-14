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
      className="mb-5 w-full md:w-[600px] shadow-lg border-2 pb-0 transition-all duration-300 ease-in-out relative"
      onClick={onClick}
    >
      <button
        type="button"
        className="absolute top-4 right-4 z-10"
      >
        {!isFlipped ? <PencilIcon className="w-5 h-5" /> : <CheckIcon className="w-5 h-5" />}
      </button>

      <div className="w-full border-b-2 border-gray-200 pb-3 flex items-start gap-3 pt-3 px-4">
        <div>
          <span className="text-lg font-medium">Q. {data.question}</span>
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
