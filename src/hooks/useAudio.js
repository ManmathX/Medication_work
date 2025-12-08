/**
 * Custom Hook: useAudio
 * 
 * Manages background music playback for the app.
 * Handles loading, playing, pausing, and cleanup of audio.
 * 
 * @module hooks/useAudio
 */

import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

export const useAudio = (
    audioSource,
    options = { isLooping: true, volume: 0.3, autoPlay: true }
) => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setIsPlaying(status.isPlaying);
        }
    };

    useEffect(() => {
        let soundObject = null;

        async function loadSound() {
            try {
    
                await Audio.setAudioModeAsync({
                    playsInSilentModeIOS: true,
                    staysActiveInBackground: true,
                    shouldDuckAndroid: true,
                });

                // Create and load the sound
                const { sound: newSound } = await Audio.Sound.createAsync(
                    audioSource,
                    {
                        isLooping: options.isLooping,
                        volume: options.volume,
                    },
                    onPlaybackStatusUpdate
                );

                soundObject = newSound;
                setSound(newSound);
                setIsLoading(false);

                // Auto-play if enabled
                if (options.autoPlay) {
                    await newSound.playAsync();
                    setIsPlaying(true);
                }
            } catch (error) {
                console.error('Error loading sound:', error);
                setIsLoading(false);
            }
        }

        loadSound();

        // Cleanup: unload sound when component unmounts
        return () => {
            if (soundObject) {
                soundObject.unloadAsync();
            }
        };
    }, []);

    /**
     * Toggle play/pause state
     */
    const togglePlayback = async () => {
        if (!sound) return;

        try {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
        } catch (error) {
            console.error('Error toggling playback:', error);
        }
    };

    /**
     * Play the audio
     */
    const play = async () => {
        if (!sound || isPlaying) return;

        try {
            await sound.playAsync();
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };

    /**
     * Pause the audio
     */
    const pause = async () => {
        if (!sound || !isPlaying) return;

        try {
            await sound.pauseAsync();
        } catch (error) {
            console.error('Error pausing sound:', error);
        }
    };

    /**
     * Stop and reset the audio to the beginning
     */
    const stop = async () => {
        if (!sound) return;

        try {
            await sound.stopAsync();
            await sound.setPositionAsync(0);
        } catch (error) {
            console.error('Error stopping sound:', error);
        }
    };

    /**
     * Set the volume
     * @param {number} volume - Volume level (0.0 to 1.0)
     */
    const setVolume = async (volume) => {
        if (!sound) return;

        try {
            await sound.setVolumeAsync(Math.max(0, Math.min(1, volume)));
        } catch (error) {
            console.error('Error setting volume:', error);
        }
    };

    return {
        sound,
        isPlaying,
        isLoading,
        togglePlayback,
        play,
        pause,
        stop,
        setVolume,
    };
};
