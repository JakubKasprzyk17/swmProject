import { FontAwesome } from '@expo/vector-icons';
import { Colors, Typography } from '_styles';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Animated from 'react-native-reanimated';

interface SearchInputProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

const SearchInput = ({ placeholder, onSearch }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const search = () => {
    onSearch(searchQuery);
  };

  return (
    <Animated.View style={[s.searchInput]}>
      <View style={s.icon}>
        <FontAwesome name="search" size={20} color={Colors.BLACK} />
      </View>
      <TextInput
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        placeholder={placeholder}
        style={s.placeholder}
        numberOfLines={1}
        onEndEditing={search}
        autoCapitalize="none"
        returnKeyType="search"
      />
    </Animated.View>
  );
};

export default SearchInput;

const s = StyleSheet.create({
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    height: 40,
    borderRadius: 14,
    paddingHorizontal: 14,
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    elevation: 0,
    borderWidth: 1.5,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    paddingRight: 10,
    flexDirection: 'row',
    textAlign: 'left',
    flexWrap: 'nowrap',
    flex: 1,
  },
});
