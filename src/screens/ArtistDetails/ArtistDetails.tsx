import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import {
  ArtworkItem,
  BottomSheet,
  NoData,
  SkeletonArtworkItem,
} from '_components';
import { Colors, Typography } from '_styles';
import {
  ArtistDetailsType,
  ArtworkType,
  ArtworksType,
  StackNavigatorParamsList,
  StackRoutes,
} from '_types';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface ArtistDetailsProps {
  navigation: NativeStackNavigationProp<
    StackNavigatorParamsList,
    StackRoutes.ArtistDetails
  >;
  route: RouteProp<StackNavigatorParamsList, StackRoutes.ArtistDetails>;
}

interface InitialRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const ArtistDetails = ({ navigation, route }: ArtistDetailsProps) => {
  const { id } = route.params;
  const [page, setPage] = useState<number>(1);
  const { t } = useTranslation();

  const [initialRegion, setInitialRegion] = useState<InitialRegion>({
    latitude: 50.0486442,
    longitude: 19.9628725,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    bottomSheetModalRef?.current?.present();
  };

  const closeModal = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const { data } = useQuery<ArtistDetailsType>({
    queryKey: ['artistDetails', { id }],
    queryFn: async () => {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artists/${id}`,
      );
      return response.json() ?? {};
    },
  });

  const getArtworks = async (page: number) => {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${data?.data.title}&page=${page}&limit=20`,
    );
    const artworkData = (await response.json()) as ArtworksType;
    const ids = artworkData.data.map((artwork: ArtworkType) => artwork.id);
    const artworksResponse = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${page}&limit=20&ids=${ids.join(
        ',',
      )}`,
    );

    return artworksResponse.json();
  };

  const {
    data: artworks,
    isLoading,
    isFetching,
  } = useQuery<ArtworksType>({
    queryKey: ['artworks', { id }],
    queryFn: () => getArtworks(page),
  });

  if (isLoading) {
    return (
      <SafeAreaView style={s.container}>
        <FlatList
          data={Array(10)}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={() => <SkeletonArtworkItem />}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      <View style={s.info}>
        <TouchableOpacity
          style={s.iconContainer}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color={Colors.BLACK} />
        </TouchableOpacity>
        <Text style={s.title}>{data?.data.title}</Text>
        <Text style={s.date}>
          {t('dateOfBirth') + ' ' + data?.data.birth_date}
        </Text>
        <Text style={s.date}>
          {t('dateOfDeath') + ' ' + data?.data.death_date}
        </Text>
      </View>

      <FlatList
        data={artworks?.data}
        refreshing={isLoading}
        renderItem={({ item }) => (
          <ArtworkItem
            id={item.id}
            imageId={item.image_id}
            title={item.title}
            artistName={item.artist_title}
            country={item.place_of_origin}
            date={item.date_display}
            latitude={item.latitude}
            longitude={item.longitude}
            zoomable={item.is_zoomable}
            openMap={() => {
              setInitialRegion({
                latitude: item.latitude || 50.0486442,
                longitude: item.longitude || 19.9628725,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
              openModal();
            }}
            getDetails={() => {
              navigation.navigate(StackRoutes.ArtworkDetails, {
                id: item.id,
              });
            }}
          />
        )}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => {
          setPage(page + 1);
        }}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={() =>
          isFetching ? (
            <ActivityIndicator style={{ marginTop: 20 }} size="large" />
          ) : null
        }
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={NoData}
      />
      <BottomSheet
        ref={bottomSheetModalRef}
        closeModal={closeModal}
        snapPoints={['95%']}
        title={t('map')}>
        <MapView style={s.map} initialRegion={initialRegion}>
          <Marker
            coordinate={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
            }}
          />
        </MapView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default ArtistDetails;

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
  info: {
    backgroundColor: Colors.WHITE,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  },
  date: {
    marginTop: 10,
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
