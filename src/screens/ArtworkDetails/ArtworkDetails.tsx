import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { DetailsItem } from '_components';
import { Colors, Typography } from '_styles';
import {
  ArtworkDetailsType,
  StackNavigatorParamsList,
  StackRoutes,
} from '_types';
import { tagRemover } from '_utils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ArtworkDetailsProps {
  navigation: NativeStackNavigationProp<
    StackNavigatorParamsList,
    StackRoutes.ArtworkDetails
  >;
  route: RouteProp<StackNavigatorParamsList, StackRoutes.ArtworkDetails>;
}

const ArtworkDetails = ({ navigation, route }: ArtworkDetailsProps) => {
  const { id } = route.params;
  const { t } = useTranslation();

  const { data } = useQuery<ArtworkDetailsType>({
    queryKey: ['artworkDetails', { id }],
    queryFn: async () => {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks/${id}`,
      );
      return response.json();
    },
  });
  const imageId = data?.data.image_id;
  const imageUri = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  const isZoomable = data?.data.is_zoomable;

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .enabled(isZoomable!)
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <SafeAreaView style={s.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        pinchGestureEnabled={false}>
        <TouchableOpacity
          style={s.iconContainer}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color={Colors.BLACK} />
        </TouchableOpacity>

        <GestureDetector gesture={pinchGesture}>
          <Animated.View style={s.artworkImage}>
            <Animated.Image
              source={{ uri: imageUri }}
              style={[s.artworkImage, animatedStyle]}
            />
          </Animated.View>
        </GestureDetector>

        <View style={s.info}>
          <Text style={s.title}>{data?.data.title || t('unknown')}</Text>
          <Text style={s.date}>{data?.data.date_display || t('unknown')}</Text>
          <Text style={s.artist}>
            {data?.data.artist_display || t('unknown')}
          </Text>
          <Text style={s.description}>
            {tagRemover(data?.data.description) || t('unknown')}
          </Text>

          <DetailsItem
            title={t('artist')}
            description={data?.data.artist_title || t('unknown')}
            withLink={data?.data.artist_title !== null}
            onPress={() => {
              navigation.navigate(StackRoutes.ArtistDetails, {
                id: data!.data.artist_id,
              });
            }}
          />
          <DetailsItem
            title={t('title')}
            description={data?.data.title || t('unknown')}
          />
          <DetailsItem
            title={t('place')}
            description={data?.data.place_of_origin || t('unknown')}
          />
          <DetailsItem
            title={t('date')}
            description={data?.data.date_display || t('unknown')}
          />
          <DetailsItem
            title={t('medium')}
            description={data?.data.medium_display || t('unknown')}
          />
          <DetailsItem
            title={t('dimensions')}
            description={data?.data.dimensions || t('unknown')}
          />
          <DetailsItem
            title={t('creditLine')}
            description={data?.data.credit_line || t('unknown')}
          />
          <DetailsItem
            title={t('referenceNumber')}
            description={data?.data.main_reference_number || t('unknown')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArtworkDetails;

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 30,
    height: 30,
    zIndex: 1,
    backgroundColor: Colors.WHITE,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  artworkImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    resizeMode: 'stretch',
  },
  info: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  },
  date: {
    marginTop: 10,
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  artist: {
    marginTop: 10,
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  description: {
    marginTop: 10,
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_LIGHT,
  },
});
