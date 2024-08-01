import FirstdNav from './components/FirstNav';
import Ismajor from './../../components/Ismajor';

export default function Test() {
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
      <FirstdNav />
      <div
        className="container mx-auto p-5 max-w-4xl bg-white rounded-lg shadow-md mt-10"
        style={{
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
          <div className='flex pb-10 items-center pt-4'>
            <p className="text-2xl font-extrabold pr-4 pl-2">SW 적성진단</p>
            <Ismajor />
          </div>

        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead class="text-sm text-gray-700 uppercase bg-gray-100 border border-b border-t ">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          LEVEL
                      </th>
                      <th scope="col" class="px-6 py-3">
                          문항이름
                      </th>
                      <th scope="col" class="px-6 py-3">
                          출처
                      </th>
                      <th scope="col" class="px-6 py-3">
                          저장
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="bg-white border-b ">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          D1
                      </th>
                      <td class="px-6 py-4">
                          Silver
                      </td>
                      <td class="px-6 py-4">
                          Laptop
                      </td>
                      <td class="px-6 py-4">
                          $2999
                      </td>
                  </tr>
                  <tr class="bg-white border-b ">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                          Microsoft Surface Pro
                      </th>
                      <td class="px-6 py-4">
                          White
                      </td>
                      <td class="px-6 py-4">
                          Laptop PC
                      </td>
                      <td class="px-6 py-4">
                          $1999
                      </td>
                  </tr>
                  <tr class="bg-white border-b">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                          Magic Mouse 2
                      </th>
                      <td class="px-6 py-4">
                          Black
                      </td>
                      <td class="px-6 py-4">
                          Accessories
                      </td>
                      <td class="px-6 py-4">
                          $99
                      </td>
                  </tr>
              </tbody>
          </table>
        </div>
      </div>

    </>
  );
}
