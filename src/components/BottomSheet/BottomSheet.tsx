import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Colors, Typography } from '_styles';
import React, { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface BottomSheetProps {
  title: string;
  children: React.ReactNode;
  snapPoints: string[];
  closeModal: () => void;
}

const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  ({ title, closeModal, children, snapPoints }, ref) => {
    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        handleComponent={null}
        backgroundComponent={null}>
        <View style={s.container}>
          <View style={s.header}>
            <View style={s.leftButtonContainer}>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="arrow-back" size={24} color={Colors.BLACK} />
              </TouchableOpacity>
            </View>
            <View style={s.titleContainer}>
              <Text style={s.title}>{title}</Text>
            </View>
          </View>
          <View style={s.childrenContainer}>{children}</View>
        </View>
      </BottomSheetModal>
    );
  },
);

export default BottomSheet;

const s = StyleSheet.create({
  container: {
    height: '100%',
    overflow: 'hidden',
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  leftButtonContainer: {
    position: 'absolute',
    left: 17,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.BLACK,
  },
  childrenContainer: {
    width: '100%',
    flex: 1,
    marginTop: 2,
  },
});
