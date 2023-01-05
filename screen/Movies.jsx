// import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SCREEN_HEIGHT } from '../util/util';
import Loader from '../components/Loader';
import Swiper from 'react-native-swiper';
import MovieSlide from '../components/MovieSlide';
import TopRatedMovies from '../components/TopRatedMovies';
import UpcomingMovies from '../components/UpcomingMovies';
import { useQuery, useQueryClient, useInfiniteQuery } from 'react-query';
import { getNowPlaying, getTopRated, getUpcoming } from '../api';
// import styled from '@emotion/native';

// const SectionTitle = styled.Text`
//   font-size: 30px;
//   color: ${(props) => props.theme.title};
// `;
export default function Movies({ navigation: { navigate } }) {
  // const [nowPlayings, setNowPlayings] = useState([]);
  // const [topRateds, setTopRateds] = useState([]);
  // const [upcomings, setUpcomings] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: nowPlayingData,
    isLoading: isLoadingNP,
    // refetch: refetchNP,
    // isRefetching,
  } = useQuery(['Movies', 'NowPlaying'], getNowPlaying);
  // console.log('isRefetching', isRefetching);
  const {
    data: topRatedData,
    isLoading: isLoadingTR,
    fetchNextPage: fetchNextTopRated,
    hasNextPage: hasNextTopRatedPage,
    // refetch: refetchTR,
  } = useInfiniteQuery(['Movies', 'TopRated'], getTopRated, {
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });
  const {
    data: upcomingData,
    isLoading: isLoadingUC,
    fetchNextPage,
    hasNextPage,
    // refetch: refetchUC,
  } = useInfiniteQuery(['Movies', 'Upcoming'], getUpcoming, {
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });

  // const getData = async () => {
  //   await Promise.all([getNowPlaying(), getTopRated(), getUpcoming()]);
  //   setIsLoading(false);
  // };

  const onRefresh = async () => {
    setIsRefreshing(true);
    // await getData();
    //refetch
    // await Promise.all([refetchNP(), refetchTR(), refetchUC()]);
    await queryClient.refetchQueries(['Movies']);
    setIsRefreshing(false);
  };

  const isLoading = isLoadingNP || isLoadingTR || isLoadingUC;

  // useEffect(() => {
  //   getData();
  // }, []);

  const loadMore = async () => {
    // Alert.alert('fetch More!');
    //fetch next Page
    if (hasNextPage) {
      await fetchNextPage(); //fetchNextPage가 비동기 함수니까
    }
  };

  const loadMoreTopRated = async () => {
    if (hasNextTopRatedPage) {
      await fetchNextTopRated();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper height='100%' showsPagination={false} autoplay loop>
            {nowPlayingData.results.map((movie) => (
              <MovieSlide movie={movie} key={movie.id} />
            ))}
          </Swiper>
          <Text style={styles.listTitle}>Top Rated Movies</Text>
          <FlatList
            horizontal
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            onEndReached={loadMoreTopRated}
            data={topRatedData.pages.map((page) => page.results).flat()}
            renderItem={({ item }) => <TopRatedMovies movie={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={<View style={{ width: 10 }} />}
          />
          <Text style={styles.listTitle}>Upcoming Movies</Text>
        </>
      }
      onEndReachedThreshold={0.5}
      onEndReached={loadMore}
      data={upcomingData.pages.map((page) => page.results).flat()}
      renderItem={({ item }) => <UpcomingMovies movie={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={<View style={{ height: 15 }} />}
    />
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    height: SCREEN_HEIGHT / 3,
    backgroundColor: 'green',
  },
  mainBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  mainDetail: {
    // flex: 1,
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  mainDetailTextBox: {
    flexDirection: 'column',
    width: '100%',
    marginLeft: 10,
    marginBottom: 10,
  },
  mainThumbnail: {
    width: 100,
    height: 160,
    marginLeft: 10,
    marginBottom: 10,
  },
  mainRating: {
    color: 'white',
  },
  mainTitle: {
    fontSize: 20,
    color: 'white',
    // fontWeight: 10,
  },
  mainOverview: {
    fontSize: 12,
    color: 'white',
  },
  listTitle: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    fontSize: 20,
    // fontWeight: 500,
  },
  subContainer: {
    backgroundColor: 'black',
    borderRadius: 5,
    marginLeft: 10,
  },
  subThumbnail: {
    width: 100,
    height: 160,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  subTextBox: {
    color: 'white',
  },
  SubContainer2: {
    flexDirection: 'row',
    // marginLeft: 20,
    // marginBottom: 20,
    alignItems: 'center',
  },
  subThumbnail2: {
    width: 100,
    height: 120,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieDescription: {
    color: 'white',
    width: 270,
    height: 120,
    margin: 10,
  },
  release: {
    fontSize: 16,
    // fontWeight: 3,
    // color: ${(props) => props.theme.upcomingText};
    marginTop: 10,
    marginTottom: 10,
  },
  subOverview: {
    fontSize: 12,
    color: 'white',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
