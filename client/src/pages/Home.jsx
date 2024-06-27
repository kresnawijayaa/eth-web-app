import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jun 12",
    uv: 1000,
    pv: 2400,
  },
  {
    name: "Jun 19",
    uv: 2000,
    pv: 1398,
  },
  {
    name: "Jun 26",
    uv: 2000,
    pv: 2800,
  },
];

export default function Example() {
  return (
    <>
      <div className='relative isolate flex min-h-screen flex-1 flex-col px-6 py-12 sm:px-8 bg-gray-900'>
        <div
          className='absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl'
          aria-hidden='true'
        >
          <div
            className='aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25'
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>

        <div>
          <p className='sm:px-8 text-3xl sm:text-2xl font-bold text-neutral-200 mt-100'>
            The Ethereum Blockchain Explorer
          </p>
        </div>
        <div className=' max-w-full sm:pl-8 sm:pr-80 sm:mr-20 mt-4'>
          <div className='lg:flex gap-4 w-full'>
            <div className='flex gap-4'>
              <select
                id='country'
                name='country'
                autoComplete='country-name'
                className='w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black'
              >
                <option>Contract</option>
                <option>Name</option>
                <option>Checksum</option>
              </select>
            </div>

            <div className='w-full lg:mt-0'>
              <form className='mt-6 sm:flex lg:mt-0'>
                <div className='w-full'>
                  <input
                    type='text'
                    name='search-input'
                    id='search-input'
                    className='w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                    placeholder='Search'
                  />
                </div>
                <div className='mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0'>
                  <button
                    type='submit'
                    className='flex w-full items-center justify-center rounded-md bg-indigo-500 px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <p className='sm:px-8 text-xs sm:text-sm text-neutral-200 mt-4'>
            Sponsored: MetaWin: Experience Winning in Web3 - Frictionless
            Signup, 30ETH Instant Withdrawals! Join Now.
          </p>
        </div>
        <div className='sm:px-8'>
          <div className='mt-8 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-3'>
            <div className='flex flex-col gap-0.5 overflow-hidden'>
              <div className='flex gap-4 p-4 sm:py-8 sm:px-6 bg-white/5'>
                <div className='my-auto w-8'>
                  <img
                    className='w-auto h-8 mx-auto'
                    src='https://etherscan.io/images/svg/brands/ethereum-original-light.svg'
                    alt='Your Company'
                  />
                </div>
                <div>
                  <div className='text-xs text-gray-300'>ETHER PRICE</div>
                  <button className='text-sm text-white hover:text-indigo-300'>
                    $3,360.66{" "}
                    <span className='text-gray-400'>@ 0.055007 BTC</span>{" "}
                    <span className='text-red-400'>(-1.64%)</span>
                  </button>
                </div>
              </div>
              <div className='flex gap-4 p-4 sm:py-8 sm:px-6 bg-white/5'>
                <div className='my-auto w-8'>
                  <img
                    className='w-6 h-auto mx-auto'
                    src='https://img.icons8.com/?size=100&id=7gn1JUOaj7KZ&format=png&color=FFFFFF'
                    alt='Your Company'
                  />
                </div>
                <div>
                  <div className='text-xs text-gray-300'>MARKET CAP</div>
                  <button className='text-sm text-white hover:text-indigo-300'>
                    $403,880,791,462.00
                  </button>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-0.5 overflow-hidden'>
              <div className='flex gap-4 p-4 sm:py-8 sm:px-6 bg-white/5'>
                <div className='my-auto w-8'>
                  <img
                    className='w-8 h-auto mx-auto'
                    src='https://img.icons8.com/?size=100&id=47832&format=png&color=FFFFFF'
                    alt='Your Company'
                  />
                </div>
                <div className='flex w-full justify-between'>
                  <div>
                    <div className='text-xs text-gray-300'>TRANSACTIONS</div>
                    <button className='text-sm text-white hover:text-indigo-300'>
                      2,419.80 M{" "}
                      <span className='text-gray-400'>(13.9 TPS)</span>
                    </button>
                  </div>
                  <div className='text-right'>
                    <div className='text-xs text-gray-300'>MED GAS PRICE</div>
                    <button className='text-sm text-white hover:text-indigo-300'>
                      4 Gwei <span className='text-gray-400'>($0.28)</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex gap-4 p-4 sm:py-8 sm:px-6 bg-white/5'>
                <div className='my-auto w-8'>
                  <img
                    className='w-8 h-auto mx-auto'
                    src='https://img.icons8.com/?size=100&id=1737&format=png&color=FFFFFF'
                    alt='Your Company'
                  />
                </div>
                <div className='flex w-full justify-between'>
                  <div>
                    <div className='text-xs text-gray-300'>
                      LAST FINALIZED BLOCK
                    </div>
                    <button className='text-sm text-white hover:text-indigo-300'>
                      20179890
                    </button>
                  </div>
                  <div className='text-right'>
                    <div className='text-xs text-gray-300'>LAST SAFE BLOCK</div>
                    <button className='text-sm text-white hover:text-indigo-300'>
                      20179922
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex'>
              <div className='gap-4 p-4 sm:p-6 bg-white/5  w-full'>
                <div className='w-full justify-between'>
                  <div className='text-xs text-gray-300'>TRANSACTION HISTORY IN 14 DAYS</div>
                  <div className="text-xs text-gray-300 mt-2 text-left">
                    <LineChart
                      width={325}
                      height={130}
                      data={data}
                    >
                      {/* <CartesianGrid strokeDasharray='3 3' /> */}
                      <XAxis
                        dataKey='name'
                        padding={{ left: 20, right: 20 }}
                      />
                      <YAxis 
                      padding={{ top: 10, bottom: 10 }}/>
                      {/* <Tooltip /> */}
                      {/* <Legend /> */}
                      <Line
                        type='monotone'
                        dataKey='pv'
                        stroke='#8884d8'
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type='monotone'
                        dataKey='uv'
                        stroke='#82ca9d'
                      />
                    </LineChart>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
