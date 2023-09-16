const Button = ({ changePage }: { changePage: () => void }) => {
  return (
    <button
      onClick={() => changePage()}
      className='mx-auto inline-block max-w-[180px] rounded-[2px] border-0 bg-[#3f51b5] px-[16px] py-[8px] text-center text-white no-underline shadow transition-all hover:bg-[#303f9f] focus:bg-[#303f9f]'
      type='button'
    >
      Load more
    </button>
  );
};

export default Button;
