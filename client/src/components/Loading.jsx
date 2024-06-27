import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className='loading w-full h-[500px] flex flex-col items-center justify-center'>
      <RingLoader
        color='#FFFFFF'
        size={75}
      />
    </div>
  );
};

export default Loading;
