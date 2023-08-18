import { useLocation, useParams } from "react-router-dom";
import {
  Container,
  HeadingTitle,
  OpacityAnimation,
  StyledLink,
  Wrapper,
} from "../../styles/sharedStyles";
import { useGetMovieDetails } from "../../hooks/useMovieDetails";
import LoadingSpinner from "../../components/uploadSpinner/LoadingSpinner";
import {
  ArrowFlexBox,
  ArrowIconFlexBox,
  MovieDetailsContainer,
  MovieDetailsDescription,
  MovieDetailsGenre,
  MovieDetailsImage,
  MovieDetailsImageContainer,
  MovieDetailsLeftContainer,
  MovieDetailsRightContainer,
  MovieDetailsSubTitle,
  MovieDetailsTitle,
  RatingContainer,
} from "./style";
import { img_500, noPicture } from "../../utils/apiUrl";
import { IoMdArrowRoundBack } from "react-icons/io";
const MovieListDetails = () => {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const media_type = query.get("media_type");

  const options = {
    id: id,
    media_type: media_type,
  };

  const {
    data: moviesData,
    isError: movieError,
    isFetching: movieFetching,
    isLoading: movieLoading,
  } = useGetMovieDetails(options);
  return (
    <Container width="90%">
      <OpacityAnimation>
        <Wrapper>
          <ArrowIconFlexBox>
            <StyledLink to={"/"}>
              <ArrowFlexBox>
                <IoMdArrowRoundBack color="#fff" size={40} />
              </ArrowFlexBox>
            </StyledLink>

            <HeadingTitle>MOVIES DETAILS</HeadingTitle>
          </ArrowIconFlexBox>

          {movieLoading || movieFetching ? (
            <LoadingSpinner innerSize="20" outerSize="50" />
          ) : (
            <MovieDetailsContainer>
              <MovieDetailsLeftContainer>
                <MovieDetailsImageContainer>
                  <MovieDetailsImage
                    src={
                      moviesData?.poster_path
                        ? `${img_500}${moviesData?.poster_path}`
                        : `${noPicture}`
                    }
                    alt="img"
                  />
                  <RatingContainer vote={Number(moviesData?.vote_average)}>
                    {Number(moviesData?.vote_average).toFixed(1)}
                  </RatingContainer>
                </MovieDetailsImageContainer>
              </MovieDetailsLeftContainer>
              <MovieDetailsRightContainer>
                <MovieDetailsTitle>
                  {moviesData?.title || moviesData?.name}
                </MovieDetailsTitle>
                <MovieDetailsSubTitle>
                  {moviesData?.tagline}
                </MovieDetailsSubTitle>
                <MovieDetailsDescription>
                  {moviesData?.overview}
                </MovieDetailsDescription>
                <MovieDetailsGenre>
                  Genre:
                  {moviesData?.genres?.map((value: any) => (
                    <div key={value?.id}>{value?.name}</div>
                  ))}
                </MovieDetailsGenre>
                <MovieDetailsGenre>
                  Release Date:{" "}
                  <div>
                    {moviesData?.release_date || moviesData?.last_air_date}
                  </div>
                </MovieDetailsGenre>
                <MovieDetailsGenre>
                  Language:
                  {moviesData?.spoken_languages?.map(
                    (value: any, index: number) => (
                      <div key={index}>{value?.english_name}</div>
                    )
                  )}
                </MovieDetailsGenre>
                <MovieDetailsGenre>
                  Runtime:{" "}
                  <div>
                    {moviesData?.runtime || moviesData?.episode_run_time[0]}{" "}
                    minutes
                  </div>
                </MovieDetailsGenre>
              </MovieDetailsRightContainer>
            </MovieDetailsContainer>
          )}
        </Wrapper>
      </OpacityAnimation>
    </Container>
  );
};

export default MovieListDetails;
