import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import styled from '@emotion/native';

// const SectionTitle = styled.Text`
//   font-size: 30px;
//   color: ${(props) => props.theme.title};
// `;

export default function Movies({ navigation: { navigate } }) {
  return (
    <ScrollView>
      <View>
        <Image
          style={styles.mainThumbnail}
          source={require('../assets/avatar2.jpeg')}
        />
        <View>
          <Text>Avatar - The Way Of Water</Text>
        </View>
      </View>

      {/* <SectionTitle>Movies</SectionTitle> */}
      <View>
        <Text>Top Rated Movies</Text>
      </View>
      <ScrollView horizontal={true}>
        <View style={styles.subThumbnail}>
          <Text>다른 영화1</Text>
        </View>
        <View style={styles.subThumbnail}>
          <Text>다른 영화2</Text>
        </View>
        <View style={styles.subThumbnail}>
          <Text>다른 영화3</Text>
        </View>
        <View style={styles.subThumbnail}>
          <Text>다른 영화4</Text>
        </View>
      </ScrollView>

      <View>
        <Text>Upcoming Movies</Text>
      </View>
      {/* source={} */}
      <View style={styles.containerofSubThumbnail2}>
        <View style={styles.subContainer}>
          <View>
            <Image style={styles.subThumbnail2} />
          </View>
          <View style={styles.movieDescription}>
            <Text>개봉 예정 영화1</Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <Image style={styles.subThumbnail2} />
          </View>
          <View style={styles.movieDescription}>
            <Text>개봉 예정 영화2</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigate('Stacks', { screen: 'one', params: { id: 123 } })
        }
      >
        <Text>Go To One Screen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainThumbnail: {
    width: '100%',
    height: 200,
    // opacity: ,
  },
  subThumbnail: {
    backgroundColor: 'white',
    width: 120,
    height: 200,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    flexDirection: 'row',
  },
  containerofSubThumbnail2: {
    alignItems: 'center',
  },
  subThumbnail2: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    width: 100,
    height: 120,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieDescription: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    width: 270,
    height: 120,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
