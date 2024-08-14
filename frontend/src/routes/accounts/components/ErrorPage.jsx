import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleIcon, HomeIcon, ArrowPathIcon } from '../../../heroicons/Icons';

const ErrorPage = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div className="text-center">
          <ExclamationCircleIcon className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            오류가 발생했습니다
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {error?.message || '예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.'}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            페이지 새로고침
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;