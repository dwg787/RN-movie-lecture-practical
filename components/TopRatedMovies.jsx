import React from 'react';
import { getImgPath } from '../util/util';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function TopRatedMovies({ movie }) {
  const { navigate } = useNavigation();

  return (
    <View>
      <ScrollView horizontal={true}>
        <TouchableOpacity
          onPress={() =>
            navigate('Stacks', {
              screen: 'Detail',
              params: { movieId: movie.id },
            })
          }
          style={styles.subContainer}
        >
          <Image
            style={styles.subThumbnail}
            // source={require('../assets/avatar2.jpeg')}
            source={{ uri: getImgPath(movie.poster_path) }}
          />
          <LinearGradient
            style={StyleSheet.absoluteFill}
            colors={['transparent', 'black']}
          />
          <View style={styles.mainDetailTextBox}>
            <Text style={styles.subTextBox}>⭐️{movie.vote_average}</Text>
            <Text style={styles.subTextBox}>
              {movie.title.slice(0, 11)}
              {movie.title.length > 11 && '...'}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: `${(props) => props.theme.upcomingText}`,
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
