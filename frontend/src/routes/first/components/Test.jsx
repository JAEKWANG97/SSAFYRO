import useFirstStore from '../../../stores/FirstStore';
import Ismajor from '../../../components/Ismajor';


export default function Test() {
  const selected = useFirstStore((state) => state.selected)
  

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
      <div className='flex border-b pb-4 items-center'>
        <p className="text-3xl font-bold pr-4">SW 적성진단</p>
        <Ismajor/>
      </div>
      
      <div className='border-t border-gray-300'>
        {selected === 'major' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
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
      </div>

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
