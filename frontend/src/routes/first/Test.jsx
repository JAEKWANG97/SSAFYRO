import React from 'react';
import FirstdNav from './components/FirstNav';
import Ismajor from './../../components/Ismajor';
import useFirstStore from '../../stores/FirstStore';
import D1 from './../../../public/first/D1.svg';

export default function Test() {
  const { icons, getIconById } = useFirstStore();

  // 데이터를 배열로 정의
  const tableData = [
    { id: 1, image: D1, level: 'Silver', name: 'Laptop', source: '$2999' },
    { id: 2, iconId: 2, level: 'White', name: 'Laptop PC', source: '$1999' },
    { id: 3, iconId: 3, level: 'Black', name: 'Accessories', source: '$99' },
    { id: 4, iconId: 4, level: 'Black', name: 'Accessories', source: '$99' },
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
        <div className="flex pb-10 items-center pt-4">
          <p className="text-2xl font-extrabold pr-4 pl-2">SW 적성진단</p>
          <Ismajor />
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-100 border border-b border-t">
              <tr>
                <th scope="col" className="px-6 py-3">
                  LEVEL
                </th>
                <th scope="col" className="px-6 py-3">
                  문항이름
                </th>
                <th scope="col" className="px-6 py-3">
                  출처
                </th>
                <th scope="col" className="px-6 py-3">
                  저장
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.level}
                        style={{ width: '30px', height: '50px' }}
                      />
                    ) : (
                      getIconById(item.iconId)?.component
                    )}
                  </th>
                  <td className="px-6 py-4">{item.level}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
