import { AntDesign, Feather } from '@expo/vector-icons';
import { Colors, Typography } from '_styles';
import { getSavedArtworks, removeArtwork, saveArtwork } from '_utils';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

interface ArtworkItemProps {
  id: number;
  imageId: string;
  title: string;
  artistName: string;
  country: string;
  date: string;
  latitude: number;
  longitude: number;
  zoomable: boolean;
  openMap: () => void;
  getDetails: (id: number) => void;
}

const ArtworkItem = ({
  id,
  imageId,
  title,
  artistName,
  country,
  date,
  latitude,
  longitude,
  zoomable,
  openMap,
  getDetails,
}: ArtworkItemProps) => {
  const imageUri = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  const { t } = useTranslation();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    getSavedArtworks().then(artworks => {
      const isLiked = artworks.find(artwork => artwork.id === id);
      if (isLiked) {
        setIsLiked(true);
      }
    });
  }, [id]);

  const like = useCallback(() => {
    const artwork = {
      id,
      imageId,
      title,
      artistName,
      country,
      date,
      latitude,
      longitude,
      zoomable,
    };
    if (isLiked) {
      setIsLiked(false);
      removeArtwork(artwork);
    } else {
      setIsLiked(true);
      saveArtwork(artwork);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLiked]);

  const scale = useSharedValue(0);

  const heartAnimationStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(300, withSpring(0));
      }

      return scale.value;
    });
    !isLiked && like();
  }, [isLiked, like, scale]);

  return (
    <View style={s.container}>
      <View style={s.artistInfo}>
        <Image
          source={
            imageId
              ? { uri: imageUri }
              : require('../../assets/photo-gallery.png')
          }
          style={s.artistAvatar}
        />
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Text style={s.artistName}>{artistName || t('unknown')}</Text>
          <Text numberOfLines={1} style={s.artworkTitle}>
            {title || t('unknown')}
          </Text>
        </View>
      </View>
      <TapGestureHandler numberOfTaps={2} onEnded={onDoubleTap}>
        <Animated.View>
          <ImageBackground
            source={
              imageId
                ? { uri: imageUri }
                : require('../../assets/photo-gallery.png')
            }
            style={s.image}>
            <Animated.Image
              source={require('../../assets/heart.png')}
              style={[
                s.image,
                {
                  shadowOffset: { width: 0, height: 20 },
                  shadowOpacity: 0.4,
                  shadowRadius: 50,
                },
                heartAnimationStyle,
              ]}
              resizeMode={'center'}
            />
          </ImageBackground>
        </Animated.View>
      </TapGestureHandler>
      <View style={s.info}>
        <View style={s.buttonsContainer}>
          <Animated.View
            style={{
              transform: [
                {
                  scale: 1,
                },
              ],
            }}>
            <TouchableOpacity style={s.icon} onPress={() => like()}>
              <AntDesign
                name={isLiked ? 'heart' : 'hearto'}
                size={24}
                color={isLiked ? Colors.RED : Colors.BLACK}
              />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity style={s.icon} onPress={openMap}>
            <Feather name="map-pin" size={24} color={Colors.BLACK} />
          </TouchableOpacity>
          <TouchableOpacity style={s.icon} onPress={() => getDetails(id)}>
            <AntDesign name="infocirlceo" size={24} color={Colors.BLACK} />
          </TouchableOpacity>
        </View>
        <View style={s.description}>
          <Text numberOfLines={2} style={s.title}>
            {title || t('unknown')}
          </Text>

          <Text style={s.date} numberOfLines={1}>
            {date + ' ' + country || t('unknown')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ArtworkItem;

const s = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 6.5,
    elevation: 11,
  },
  artistInfo: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  artistAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  artistName: {
    marginLeft: 10,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  artworkTitle: {
    marginLeft: 10,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_12,
  },
  image: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').width,
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
  },
  description: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    flex: 1,
  },
  date: {
    marginVertical: 5,
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    fontSize: Typography.FONT_SIZE_12,
  },
});
