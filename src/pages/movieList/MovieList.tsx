import { Fragment, useEffect, useState } from "react";
import {
  CardGridLayout,
  Container,
  HeadingTitle,
  LoadingSpinnerContainer,
  OpacityAnimation,
  StyledLink,
  Wrapper,
} from "../../styles/sharedStyles";
import MovieCard from "../../components/movieCard/MovieCard";
import NoItemFound from "../../components/noItemFound/NoItemFound";
import { IconWrapper, InputField, InputFieldWrapper } from "./style";
import { ImSearch } from "react-icons/im";
import { debounce } from "../../utils/utils";
import { useGetAllSearchMovies } from "../../hooks/useSearchMovies";

const MovieList = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const handleDebounce = debounce((e: any) => handleChange(e), 1000);

  const option = {
    searchValue: searchValue && encodeURIComponent(searchValue),
    searchTab: "movies",
  };

  const {
    data,
    isLoading,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetAllSearchMovies(option);

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <Container width="90%">
      <OpacityAnimation>
        <Wrapper>
          <HeadingTitle>MOVIES LIST</HeadingTitle>
          <InputFieldWrapper>
            <InputField
              type="text"
              placeholder="Search Movies"
              onChange={handleDebounce}
            />
            <IconWrapper>
              <ImSearch />
            </IconWrapper>
          </InputFieldWrapper>
          <CardGridLayout>
            {!isError &&
              data?.pages?.map((x: any, id: number) => (
                <Fragment key={id}>
                  {Array.isArray(x?.results) &&
                    x?.results?.map((results: any) => (
                      <Fragment key={results?.id}>
                        <StyledLink
                          to={`/movie_details/${results?.id}?media_type=movie`}>
                          <MovieCard
                            poster={results?.poster_path}
                            name={results?.title || results?.name}
                            date={
                              results?.first_air_date || results?.release_date
                            }
                            vote={results?.vote_average}
                            mediaType="movie"
                          />
                        </StyledLink>
                      </Fragment>
                    ))}
                </Fragment>
              ))}
            {(isLoading || (isFetching && isFetchingNextPage)) &&
              Array.from({ length: 10 }, (x, v) => (
                <LoadingSpinnerContainer key={v} />
              ))}
          </CardGridLayout>
          {data?.pages[0]?.total_pages === 0 && (
            <NoItemFound message="No Movie Found" />
          )}
        </Wrapper>
      </OpacityAnimation>
    </Container>
  );
};

export default MovieList;
