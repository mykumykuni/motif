import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: string;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={name as any}
      style={style}
    />
  );
}
