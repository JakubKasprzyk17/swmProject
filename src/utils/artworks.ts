import AsyncStorage from '@react-native-async-storage/async-storage';

interface ArtworkType {
  id: number;
  imageId: string;
  title: string;
  artistName: string;
  country: string;
  date: string;
  latitude: number;
  longitude: number;
  zoomable: boolean;
}

export const getSavedArtworks = async () => {
  const savedArtworks = await AsyncStorage.getItem('savedArtworks');
  return savedArtworks ? (JSON.parse(savedArtworks) as ArtworkType[]) : [];
};

export const saveArtwork = async (artwork: ArtworkType) => {
  console.log('artwork', artwork);
  const savedArtworks = await getSavedArtworks();
  const newSavedArtworks = [...savedArtworks, artwork];
  await AsyncStorage.setItem('savedArtworks', JSON.stringify(newSavedArtworks));
};

export const removeArtwork = async (artwork: ArtworkType) => {
  const savedArtworks = await getSavedArtworks();
  console.log('savedArtworks', savedArtworks);
  const newSavedArtworks = savedArtworks.filter(
    savedArtwork => savedArtwork.id !== artwork.id,
  );
  console.log('newSavedArtworks', newSavedArtworks);
  await AsyncStorage.setItem('savedArtworks', JSON.stringify(newSavedArtworks));
};
