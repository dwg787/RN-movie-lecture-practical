const BASE_URL = 'https://api.themoviedb.org/3/movie';
const API_KEY = 'f1bc60d26784ba93bb11e073f5915d4c';
// const API_KEY = '558a876e694085f8a052d267914acde2';
const LANG = ['en-US', 'ko-KR'];

export const getNowPlaying = () =>
  fetch(
    `${BASE_URL}/now_playing?api_key=${API_KEY}&language=${LANG[0]}&page=1`
  ).then((res) => res.json());
// setNowPlayings(results);
// setIsLoading(false);
export const getTopRated = ({ pageParam = 1 }) =>
  fetch(
    `${BASE_URL}/top_rated?api_key=${API_KEY}&language=${LANG[0]}&page=${pageParam}`
  ).then((res) => res.json());

// setTopRateds(results);
// setIsLoading(false);
export const getUpcoming = ({ pageParam = 1 }) =>
  fetch(
    `${BASE_URL}/upcoming?api_key=${API_KEY}&language=${LANG[0]}&page=${pageParam}`
  ).then((res) => res.json());
// setUpcomings(results);
// setIsLoading(false);

export const getDetail = (params) => {
  console.log('params:', params);
  const [_, movieId] = params.queryKey;
  return fetch(
    `${BASE_URL}/${movieId}?api_key=${API_KEY}&language=${LANG[0]}&append_to_response=videos`
  ).then((res) => res.json());
};

//   setData(response);
//   setIsLoading(false);
