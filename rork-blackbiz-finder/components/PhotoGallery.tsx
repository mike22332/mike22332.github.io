import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Pressable, Modal, Dimensions } from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface PhotoGalleryProps {
  photos: string[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  
  const openPhoto = (index: number) => {
    setSelectedPhotoIndex(index);
  };
  
  const closePhoto = () => {
    setSelectedPhotoIndex(null);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {photos.map((photo, index) => (
          <Pressable 
            key={index} 
            style={styles.photoContainer}
            onPress={() => openPhoto(index)}
          >
            <Image source={{ uri: photo }} style={styles.photo} />
          </Pressable>
        ))}
      </ScrollView>
      
      <Modal
        visible={selectedPhotoIndex !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={closePhoto}
      >
        <View style={styles.modalContainer}>
          <Pressable style={styles.closeButton} onPress={closePhoto}>
            <X size={24} color="#FFFFFF" />
          </Pressable>
          
          {selectedPhotoIndex !== null && (
            <Image 
              source={{ uri: photos[selectedPhotoIndex] }} 
              style={styles.fullScreenPhoto} 
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const { width } = Dimensions.get('window');
const photoSize = width / 3 - 12;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  photoContainer: {
    width: photoSize,
    height: photoSize,
    borderRadius: 8,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenPhoto: {
    width: '100%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
});