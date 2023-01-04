// import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SCREEN_HEIGHT } from '../util/util';
import Swiper from 'react-native-swiper';
import MovieSlide from '../components/MovieSlide';
import TopRatedMovies from '../components/TopRatedMovies';
import UpcomingMovies from '../components/UpcomingMovies';
// import styled from '@emotion/native';

// const SectionTitle = styled.Text`
//   font-size: 30px;
//   color: ${(props) => props.theme.title};
// `;

export default function Movies({ navigation: { navigate } }) {
  const [nowPlayings, setNowPlayings] = useState([]);
  const [topRateds, setTopRateds] = useState([]);
  const [upcomings, setUpcomings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const overview =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  const BASE_URL = 'https://api.themoviedb.org/3/movie';
  const API_KEY = 'f1bc60d26784ba93bb11e073f5915d4c';

  const getNowPlaying = async () => {
    const { results } = await fetch(
      `${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json());
    setNowPlayings(results);
    setIsLoading(false);
  };
  const getTopRated = async () => {
    const { results } = await fetch(
      `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json());

    setTopRateds(results);
    setIsLoading(false);
  };
  const getUpcoming = async () => {
    const { results } = await fetch(
      `${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json());
    setUpcomings(results);
    setIsLoading(false);
  };

  const getData = async () => {
    await Promise.all([getNowPlaying(), getTopRated(), getUpcoming()]);
    setIsLoading(false);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    // console.log('refresh');
    await getData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper height='100%' showsPagination={false} autoplay loop>
            {nowPlayings.map((movie) => (
              <MovieSlide movie={movie} />
            ))}
          </Swiper>
          <Text style={styles.listTitle}>Top Rated Movies</Text>
          <FlatList
            horizontal
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            data={topRateds}
            renderItem={({ item }) => <TopRatedMovies movie={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={<View style={{ width: 10 }} />}
          />
          <Text style={styles.listTitle}>Upcoming Movies</Text>
        </>
      }
      data={upcomings}
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
