import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import {
  ArtworkItem,
  BottomSheet,
  NoData,
  SearchInput,
  SkeletonArtworkItem,
} from '_components';
import {
  ArtworkType,
  ArtworksType,
  BottomNavigatorParamsList,
  BottomRoutes,
  StackNavigatorParamsList,
  StackRoutes,
} from '_types';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface SearchProps {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<BottomNavigatorParamsList, BottomRoutes.Search>,
    NativeStackNavigationProp<StackNavigatorParamsList, StackRoutes>
  >;
}

interface InitialRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const Search = ({ navigation }: SearchProps) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [initialRegion, setInitialRegion] = useState<InitialRegion>({
    latitude: 50.0486442,
    longitude: 19.9628725,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getArtworks = async (page: number) => {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${query}&page=${page}&limit=20`,
    );
    const data = await response.json();
    const ids = data.data.map((artwork: ArtworkType) => artwork.id);
    const artworksResponse = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${page}&limit=20&ids=${ids.join(
        ',',
      )}`,
    );

    return artworksResponse.json();
  };

  const { data, isLoading, isFetching } = useQuery<ArtworksType>({
    queryKey: ['artworks', query, page],
    queryFn: () => getArtworks(page),
  });

  const items = data?.data;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    bottomSheetModalRef?.current?.present();
  };

  const closeModal = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

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
      <FlatList
        data={items}
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
        ListHeaderComponent={() => (
          <View style={{ marginVertical: 10 }}>
            <SearchInput
              onSearch={text => setQuery(text)}
              placeholder={t('placeholder')}
            />
          </View>
        )}
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

export default Search;

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
