import { ChangeEvent, FormEvent, useState } from 'react';
import { FaSearch } from 'react-icons/fa/index';

type Props = {
  sendQuery: (query: string) => void;
};

const SearchBar = ({ sendQuery }: Props) => {
  const [query, setQuery] = useState('');

  const onChange = (e: ChangeEvent) => {
    const { value }: { value: string } = e.target as HTMLInputElement;
    setQuery(value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query === '') return;
    sendQuery(query);
  };

  return (
    <header className='sticky left-0 top-0 z-[1100] flex min-h-[64px] items-center justify-center bg-[#3f51b5] px-[24px] py-[12px] shadow-md'>
      <form
        onSubmit={onSubmit}
        className='flex w-[100%] max-w-[600px] items-center overflow-hidden rounded-[3px]'
      >
        <button className='absolute inline-block h-[36px] w-[36px] border-none pl-[4px] pt-[2px] opacity-60 outline-none transition-opacity hover:opacity-100'>
          <FaSearch className='m-0 h-[24px] w-[24px] fill-[#3f51b5]' />
          <span className='absolute h-[1px] w-[1px] overflow-hidden border-0 p-0'>Search</span>
        </button>

        <input
          onChange={onChange}
          name='query'
          type='text'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
          className='inline-block w-[100%] border-none px-[4px] pl-[36px] font-[18px] outline-none placeholder:font-[14px]'
        />
      </form>
    </header>
  );
};

export default SearchBar;
