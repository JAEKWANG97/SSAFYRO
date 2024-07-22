import { useState } from 'react';

export default function Test() {
  const [selected, setSelected] = useState('major');
  const [showCorrection, setShowCorrection] = useState(false);

  const handleSelect = (type) => {
    setSelected(type);
    setShowCorrection(false); // 새로운 타입을 선택할 때 AI 첨삭 상태 초기화
  };

  const cards = [
    {
      title: 'Noteworthy technology acquisitions 2021',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      imgSrc: '/docs/images/blog/image-4.jpg'
    },
    {
      title: 'Noteworthy technology acquisitions 2021',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      imgSrc: '/docs/images/blog/image-4.jpg'
    },
    {
      title: 'Noteworthy technology acquisitions 2021',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      imgSrc: '/docs/images/blog/image-4.jpg'
    },
    {
      title: 'Noteworthy technology acquisitions 2021',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      imgSrc: '/docs/images/blog/image-4.jpg'
    },
    {
      title: 'Noteworthy technology acquisitions 2021',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      imgSrc: '/docs/images/blog/image-4.jpg'
    },
    {
      title: 'Noteworthy technology acquisitions 2021',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      imgSrc: '/docs/images/blog/image-4.jpg'
    },
  ];

  return (
    <>
      <h1>SW 적성진단</h1>
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
        onClick={() => handleSelect('major')}
      >
        전공자
      </button>
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
        onClick={() => handleSelect('nonMajor')}
      >
        비전공자
      </button>

      {selected === 'major' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, index) => (
            <a
              key={index}
              href="#"
              className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 "
            >
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={card.imgSrc}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  {card.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 ">
                  {card.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}

      {selected === 'nonMajor' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, index) => (
            <a
              key={index}
              href="#"
              className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 "
            >
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={card.imgSrc}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  {card.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 ">
                  {card.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
