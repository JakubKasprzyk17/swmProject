import { Typography } from '_styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

const NoData = () => {
  const { t } = useTranslation();
  return (
    <View style={s.container}>
      <Text style={s.header}>{t('noDataHeader')}</Text>
      <Text style={s.body}>{t('noDataBody')}</Text>
    </View>
  );
};

export default NoData;

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: Typography.FONT_SIZE_24,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    marginTop: 20,
  },
  body: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    marginTop: 20,
  },
});
