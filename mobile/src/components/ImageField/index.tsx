import { color } from '@/constants/color';
import { useToggle } from '@/hooks/useToggle';
import { FCC } from '@/types';
import { ImageTypes } from '@/types/utils';
import { Ionicons } from '@expo/vector-icons';
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker';
import React, { useMemo } from 'react';
import {
  Image,
  TextInput as RNTextInput,
  ScrollView,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = TextInputProps & {
  label?: string | JSX.Element;
  rightIcon?: JSX.Element;
  error?: string;
  onValueChange?: (value: ImageTypes[]) => void;
  imageList: ImageTypes[];
};

const ImageInput: FCC<Props> = ({
  style,
  label,
  error,
  rightIcon,
  onValueChange = () => {},
  imageList = [],
  ...props
}) => {
  const height = useMemo(() => (imageList.length > 0 ? 150 : 24), [imageList]);
  const [active, onActive] = useToggle();
  const handleChoosePhoto = async () => {
    try {
      const res = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
        selectionLimit: 5,
      });
      if (!res.canceled) {
        onValueChange && onValueChange(res.assets as ImageTypes[]);
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          active && styles.active,
          !!error && styles.error,
          { height: height + 36 },
        ]}
      >
        {!!label && (
          <Text
            style={[
              styles.label,
              active && styles.labelActive,
              error && styles.labelError,
            ]}
          >
            {label}
          </Text>
        )}
        {!!imageList && (
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 8,
            }}
          >
            {imageList.map(({ uri }) => (
              <Image
                key={uri}
                source={{ uri: uri }}
                style={styles.imagePreview}
              />
            ))}
            <TouchableOpacity
              onPress={() => onValueChange([])}
              style={[styles.imagePreview, styles.boxClear]}
            >
              <Ionicons name="close" size={32} color={color.primary} />
            </TouchableOpacity>
          </ScrollView>
        )}
        <RNTextInput
          editable={false}
          selectTextOnFocus={false}
          onPressOut={handleChoosePhoto}
          onBlur={onActive}
          onFocus={onActive}
          {...props}
          style={[style, styles.input, { height: 24 }]}
        />
        <TouchableOpacity style={styles.rightIcon} onPress={handleChoosePhoto}>
          {rightIcon ? (
            <>{rightIcon}</>
          ) : (
            <Ionicons name="image" size={18} color={color.primary} />
          )}
        </TouchableOpacity>
      </View>
      {!!error && <Text style={styles.labelError}>! {error}</Text>}
    </View>
  );
};

export default ImageInput;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 16,
    backgroundColor: color.background.secondary,
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: color.background.secondary,
  },
  active: {
    borderColor: color.primary,
    backgroundColor: color.background.default,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: color.text.dark,
  },
  input: {
    fontSize: 16,
    color: color.text.main,
  },
  labelActive: {
    color: color.primary,
  },
  error: {
    borderColor: color.error.main,
    backgroundColor: color.background.default,
  },
  labelError: {
    fontSize: 14,
    fontWeight: '600',
    color: color.error.main,
  },
  rightIcon: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  imagePreview: {
    width: 120,
    height: 126,
    borderRadius: 12,
  },
  boxClear: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: color.primary,
    borderStyle: 'dashed',
    borderWidth: 1,
  },
});
