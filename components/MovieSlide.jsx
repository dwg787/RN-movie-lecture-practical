import React from 'react';
import { getImgPath, SCREEN_HEIGHT } from '../util/util';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function MovieSlide({ movie }) {
  const { navigate } = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <Image
        // style={StyleSheet.absoluteFill}
        style={styles.mainBackground}
        // source={require('../assets/avatar2.jpeg')}
        source={{
          uri: getImgPath(movie.backdrop_path),
        }}
      />
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={['transparent', 'black']}
      />
      <View style={styles.mainDetail}>
        <Image
          style={styles.mainThumbnail}
          // source={require('../assets/avatar2.jpeg')}
          source={{
            uri: getImgPath(movie.backdrop_path),
          }}
        />
        <View style={styles.mainDetailTextBox}>
          <Text style={styles.mainTitle}>{movie.title}</Text>
          <Text style={styles.mainRating}>⭐️{movie.vote_average}</Text>
          <Text style={styles.mainOverview}>
            {movie.overview.slice(0, 150)}
            {movie.overview.length > 150 && '...'}
          </Text>
        </View>
      </View>
    </View>
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
