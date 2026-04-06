import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { uploadTrack } from '../src/services/music/musicService';
import { useAuth } from '../src/context/AuthContext';
import { colors, spacing, borderRadius, typography } from '../src/styles/theme';

const GENRES = ['Hip-Hop', 'R&B', 'Pop', 'Electronic', 'Rock', 'Jazz', 'Classical', 'Other'];

export default function UploadScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [audioFile, setAudioFile] = useState<{ uri: string; name: string } | null>(null);
  const [coverArt, setCoverArt] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const pickAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
      copyToCacheDirectory: true,
    });
    if (!result.canceled && result.assets[0]) {
      setAudioFile({ uri: result.assets[0].uri, name: result.assets[0].name });
      if (!title) {
        setTitle(result.assets[0].name.replace(/\.[^.]+$/, ''));
      }
    }
  };

  const pickCoverArt = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Allow access to your photo library to pick cover art.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setCoverArt(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!audioFile) { Alert.alert('Select an audio file first.'); return; }
    if (!title.trim()) { Alert.alert('Enter a track title.'); return; }
    if (!genre) { Alert.alert('Select a genre.'); return; }
    if (!user) { Alert.alert('You must be signed in to upload.'); return; }

    setUploading(true);
    setProgress(0);
    try {
      await uploadTrack({
        title: title.trim(),
        genre,
        audioUri: audioFile.uri,
        coverArtUri: coverArt ?? undefined,
        artistName: user.displayName || user.username,
        userId: user.id,
        onProgress: setProgress,
      });
      Alert.alert('Uploaded!', 'Your track is live.', [{ text: 'OK', onPress: () => router.back() }]);
    } catch (err: any) {
      Alert.alert('Upload failed', err.message ?? 'Something went wrong.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={['rgba(0,96,239,0.14)', 'transparent']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.4 }}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <MaterialCommunityIcons name="close" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Track</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Cover Art */}
        <TouchableOpacity style={styles.artPicker} onPress={pickCoverArt}>
          {coverArt ? (
            <Image source={{ uri: coverArt }} style={styles.art} />
          ) : (
            <View style={styles.artPlaceholder}>
              <MaterialCommunityIcons name="image-plus" size={36} color={colors.primary} />
              <Text style={styles.artHint}>Add Cover Art</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Audio File */}
        <TouchableOpacity style={styles.filePicker} onPress={pickAudio}>
          <MaterialCommunityIcons
            name={audioFile ? 'music-circle' : 'music-circle-outline'}
            size={24}
            color={audioFile ? colors.primary : colors.text.secondary}
          />
          <Text style={[styles.filePickerText, audioFile && { color: colors.text.primary }]}>
            {audioFile ? audioFile.name : 'Select audio file'}
          </Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text.secondary} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Track title"
          placeholderTextColor={colors.text.secondary}
        />

        {/* Genre */}
        <Text style={styles.label}>Genre</Text>
        <View style={styles.genres}>
          {GENRES.map(g => (
            <TouchableOpacity
              key={g}
              style={[styles.chip, genre === g && styles.chipActive]}
              onPress={() => setGenre(g)}
            >
              <Text style={[styles.chipText, genre === g && styles.chipTextActive]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upload Button */}
        {uploading ? (
          <View style={styles.progressContainer}>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
            <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.sm }} />
          </View>
        ) : (
          <TouchableOpacity onPress={handleUpload} disabled={uploading}>
            <LinearGradient
              colors={[colors.primary, '#004EC2']}
              style={styles.uploadBtn}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <MaterialCommunityIcons name="upload" size={20} color="#fff" />
              <Text style={styles.uploadBtnText}>Upload</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  headerTitle: {
    ...typography.subtitle,
    color: colors.text.primary,
  },
  iconBtn: {
    padding: spacing.xs,
    width: 40,
    alignItems: 'center',
  },
  scroll: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  artPicker: {
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  art: {
    width: 160,
    height: 160,
    borderRadius: borderRadius.lg,
  },
  artPlaceholder: {
    width: 160,
    height: 160,
    borderRadius: borderRadius.lg,
    backgroundColor: `${colors.primary}14`,
    borderWidth: 1,
    borderColor: `${colors.primary}44`,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  artHint: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  filePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  filePickerText: {
    flex: 1,
    ...typography.body2,
    color: colors.text.secondary,
  },
  label: {
    ...typography.caption,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.text.primary,
    ...typography.body1,
    marginBottom: spacing.lg,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.xl,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  progressContainer: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressBg: {
    height: 6,
    width: '100%',
    backgroundColor: `${colors.primary}33`,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  progressText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
  },
  uploadBtnText: {
    ...typography.button,
    color: '#fff',
  },
});
