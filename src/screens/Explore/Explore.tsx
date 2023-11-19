import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  ArtworkItem,
  BottomSheet,
  NoData,
  SkeletonArtworkItem,
} from '_components';
import {
  ArtworkType,
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

export interface ExploreProps {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<BottomNavigatorParamsList, BottomRoutes.Explore>,
    NativeStackNavigationProp<StackNavigatorParamsList, StackRoutes>
  >;
}

interface InitialRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const Explore = ({ navigation }: ExploreProps) => {
  const { t } = useTranslation();
  const [initialRegion, setInitialRegion] = useState<InitialRegion>({
    latitude: 50.0486442,
    longitude: 19.9628725,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getArtworks = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${pageParam}&limit=20`,
    );
    return response.json();
  };

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['artworks'],
    queryFn: getArtworks,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.pagination.next_url) {
        return pages.length + 1;
      }
    },
  });

  const items = data?.pages?.map(page => page.data).flat() as ArtworkType[];

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
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => <View style={{ height: 10 }} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={() =>
          isFetching ? (
            <View style={{ marginTop: 20 }}>
              <ActivityIndicator size={'large'} />
            </View>
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

export default Explore;

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
