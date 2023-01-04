import React from 'react';
import { getImgPath } from '../util/util';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

export default function UpcomingMovies({ movie }) {
  const { navigate } = useNavigation();
  const isDark = useColorScheme() === 'dark';

  return (
    <View>
      <TouchableOpacity
        style={styles.SubContainer2}
        onPress={() =>
          navigate('Stacks', {
            screen: 'Detail',
            params: { movieId: movie.id },
          })
        }
      >
        <View>
          <Image
            style={styles.subThumbnail2}
            source={{ uri: getImgPath(movie.poster_path) }}
            //   source={require('../assets/avatar2.jpeg')}
          />
        </View>
        <View style={styles.movieDescription}>
          <Text style={prop_styles(isDark).movieTitle}>{movie.title}</Text>
          <Text style={prop_styles(isDark).release}>{movie.release_date}</Text>
          <Text style={prop_styles(isDark).subOverview}>
            {movie.overview.slice(0, 70)}
            {movie.overview.length > 70 && '...'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: 270,
    height: 120,
    margin: 10,
  },
  //   movieTitle: {},
  //   release: {
  //     fontSize: 16,
  //     color: `${(props) => props.theme.upcomingText}`,
  //     marginTop: 10,
  //     marginTottom: 10,
  //   },
  //   subOverview: {
  //     fontSize: 12,
  //     color: `${(props) => props.theme.upcomingText}`,
  //   },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const prop_styles = (isDark) =>
  StyleSheet.create({
    movieTitle: {
      color: isDark ? 'white' : 'black',
    },
    release: {
      fontSize: 16,
      color: isDark ? 'white' : 'black',
      marginTop: 10,
      marginTottom: 10,
    },
    subOverview: {
      fontSize: 12,
      color: isDark ? 'white' : 'black',
    },
  });
