export const exerciseOptions = {
  method: "GET",

  headers: {
    "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY_EXERCISE,
    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
  },
};
export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY_YT,
  },
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};
