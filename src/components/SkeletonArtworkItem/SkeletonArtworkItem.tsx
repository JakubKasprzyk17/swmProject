import { Colors } from '_styles';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const SkeletonArtworkItem = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withDelay(500, withTiming(0.5, { duration: 500 })),
        withTiming(1, { duration: 500 }),
      ),
      -1,
      false,
    );
  }, [opacity]);

  return (
    <View style={s.container}>
      <View style={s.artistInfo}>
        <Animated.View style={[s.artistAvatar, { opacity }]} />
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Animated.View style={[s.artistName, { opacity }]} />
          <Animated.View style={[s.artworkTitle, { opacity }]} />
        </View>
      </View>
      <View style={s.imageContainer}>
        <Animated.View style={[s.image, { opacity }]} />
      </View>
      <View style={s.info}>
        <View style={s.buttonsContainer}>
          <Animated.View style={[s.icon, { opacity }]} />
          <Animated.View style={[s.icon, { opacity }]} />
          <Animated.View style={[s.icon, { opacity }]} />
        </View>
        <View style={s.description}>
          <Animated.View style={[s.title, { opacity }]} />
          <Animated.View style={[s.date, { opacity }]} />
        </View>
      </View>
    </View>
  );
};

export default SkeletonArtworkItem;

const s = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  artistInfo: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  artistAvatar: {
    backgroundColor: Colors.GAINSBORO,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  artistName: {
    marginLeft: 10,
    width: 200,
    height: 15,
    backgroundColor: Colors.GAINSBORO,
  },
  artworkTitle: {
    marginTop: 5,
    marginLeft: 10,
    width: 200,
    height: 15,
    backgroundColor: Colors.GAINSBORO,
  },
  imageContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').width,
    backgroundColor: Colors.GAINSBORO,
  },
  info: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 5,
    marginRight: 10,
    width: 25,
    height: 25,
    backgroundColor: Colors.GAINSBORO,
    borderRadius: 15,
  },
  description: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    flex: 1,
    width: 200,
    height: 30,
    backgroundColor: Colors.GAINSBORO,
  },
  date: {
    marginVertical: 5,
    width: 150,
    height: 15,
    backgroundColor: Colors.GAINSBORO,
  },
});
