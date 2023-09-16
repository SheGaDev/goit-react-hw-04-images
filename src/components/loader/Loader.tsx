import { Grid } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className='fixed top-0 z-[10000] h-[100%] w-[100%] bg-[#00000040]'>
      <Grid
        height='160'
        width='160'
        color='yellow'
        radius='8'
        wrapperStyle={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        visible={true}
        ariaLabel='grid-loading'
      />
    </div>
  );
};

export default Loader;
