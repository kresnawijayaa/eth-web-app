import { Link } from "react-router-dom";

export default function Example() {
  return (
    <>
      <div className='relative isolate overflow-hidden bg-gray-900'>
        <svg
          className='absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
          aria-hidden='true'
        >
          <defs>
            <pattern
              id='983e3e4c-de6d-4c3f-8d64-b9761d1534cc'
              width={200}
              height={200}
              x='50%'
              y={-1}
              patternUnits='userSpaceOnUse'
            >
              <path
                d='M.5 200V.5H200'
                fill='none'
              />
            </pattern>
          </defs>
          <svg
            x='50%'
            y={-1}
            className='overflow-visible fill-gray-800/20'
          >
            <path
              d='M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z'
              strokeWidth={0}
            />
          </svg>
          <rect
            width='100%'
            height='100%'
            strokeWidth={0}
            fill='url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)'
          />
        </svg>
        <div
          className='absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]'
          aria-hidden='true'
        >
          <div
            className='aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20'
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>
        {/* content */}
        <div className='h-screen mx-auto max-w-7xl px-6 pt-8 lg:px-8'>
          <div className='py-24 sm:py-32'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
              <div className='mx-auto max-w-3xl text-center'>
                <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
                  Enhance Your Decisions <br />
                  with Accurate and Detailed On-Chain Data
                </h1>
                <p className='px-18 mt-6 text-lg leading-8 text-gray-300'>
                  Our application provides in-depth analysis of Ethereum tokens
                  directly from the blockchain, helping you make better and
                  faster investment decisions.
                </p>
                <div className='mt-10 flex items-center justify-center gap-x-6'>
                  <Link
                    to='/simulator'
                    className='rounded-md bg-indigo-500 px-12 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
