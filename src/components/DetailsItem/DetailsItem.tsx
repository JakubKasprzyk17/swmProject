import { Colors, Typography } from '_styles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DetailsItemProps {
  title: string;
  description: string | number;
  withLink?: boolean;
  onPress?: () => void;
}

const DetailsItem = ({
  title,
  description,
  withLink,
  onPress,
}: DetailsItemProps) => {
  return (
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>
      <TouchableOpacity
        style={{ flex: 0.7 }}
        disabled={!withLink}
        onPress={onPress}>
        <Text
          style={[
            s.description,
            withLink
              ? {
                  textDecorationLine: 'underline',
                }
              : {},
          ]}>
          {description}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailsItem;

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderTopColor: Colors.GREY,
    borderTopWidth: 1,
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_14,

    flex: 0.3,
  },
  description: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
  },
});
