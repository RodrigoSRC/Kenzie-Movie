import { createContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { IMovie, IMoviesContext, IMoviesProviderProps } from "./@types";

export const MovieListContext = createContext({} as IMoviesContext);

export function MovieListProvider({ children }: IMoviesProviderProps) {
  const [movieList, setMovieList] = useState<IMovie[]>([]);

  useEffect(() => {
    const getMoviesToList = async () => {
      try {
        const { data } = await api.get("/movies");

        setMovieList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMoviesToList();
  }, []);

  return (
    <MovieListContext.Provider value={{ movieList }}>
      {children}
    </MovieListContext.Provider>
  );
}
