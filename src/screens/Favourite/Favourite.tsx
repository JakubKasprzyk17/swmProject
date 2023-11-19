import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  CompositeNavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArtworkItem,
  BottomSheet,
  NoData,
  SkeletonArtworkItem,
} from '_components';
import {
  BottomNavigatorParamsList,
  BottomRoutes,
  StackNavigatorParamsList,
  StackRoutes,
} from '_types';
import { ArtworkType, getSavedArtworks } from '_utils';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface FavouriteProps {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<
      BottomNavigatorParamsList,
      BottomRoutes.Favourite
    >,
    NativeStackNavigationProp<StackNavigatorParamsList, StackRoutes>
  >;
}

interface InitialRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const Favourite = ({ navigation }: FavouriteProps) => {
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

  const [items, setItems] = useState<ArtworkType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    setIsLoading(true);
    const data = await getSavedArtworks();
    setItems(data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [getData]),
  );

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
            imageId={item.imageId}
            title={item.title}
            artistName={item.artistName}
            country={item.country}
            date={item.date}
            latitude={item.latitude}
            longitude={item.longitude}
            zoomable={item.zoomable}
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
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => <View style={{ height: 10 }} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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

export default Favourite;

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
