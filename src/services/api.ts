import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '36536423-79009f331c6b01b183eb354f6',
  per_page: 12,
  image_type: 'photo',
  orientation: 'horizontal',
};

type ResponsePixabay = {
  totalHits: number;
  hits: object[];
};

const fetchImages = async ({
  page,
  query,
}: {
  page: number;
  query: string;
}): Promise<ResponsePixabay> => {
  const {
    data: { totalHits, hits },
  } = await axios(``, {
    params: {
      q: query,
      page: page,
    },
  });
  return { totalHits, hits };
};

export default fetchImages;
