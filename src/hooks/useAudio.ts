type AudioType = 'sistemdata' | 'teleport' | 'narration';

interface AudioMap {
  sistemdata: string;
  teleport: string;
}

// Constantes para las rutas base
const AUDIO_BASE_PATH = '/audio';
const EFFECTS_PATH = `${AUDIO_BASE_PATH}/effects`;
const NARRATIONS_PATH = `${AUDIO_BASE_PATH}/narrations`;

const audioFiles: AudioMap = {
  sistemdata: `${EFFECTS_PATH}/sistemdata.mp3`,
  teleport: `${EFFECTS_PATH}/teleport.mp3`
};

const audioInstances: { [key: string]: HTMLAudioElement } = {};

export const useAudio = () => {
  const getNarrationPath = (stepNumber: number) => `${NARRATIONS_PATH}/step${stepNumber}.mp3`;

  const validateAudioPath = (path: string): boolean => {
    // Verificar que la ruta comience con /audio y contenga solo caracteres seguros
    const isValidPath = path.startsWith(AUDIO_BASE_PATH) && 
                       /^[/\w.-]+$/.test(path) &&
                       (path.includes(EFFECTS_PATH) || path.includes(NARRATIONS_PATH));
    
    if (!isValidPath) {
      console.error(`Invalid audio path: ${path}`);
      return false;
    }
    return true;
  };

  const playAudio = async (type: AudioType, stepNumber?: number) => {
    try {
      let audioPath: string;

      if (type === 'narration' && stepNumber) {
        audioPath = getNarrationPath(stepNumber);
      } else if (type in audioFiles) {
        audioPath = audioFiles[type as keyof AudioMap];
      } else {
        throw new Error(`Audio type "${type}" not found`);
      }

      console.log(`Attempting to play audio: ${audioPath}`);

      // Validar la ruta del audio
      if (!validateAudioPath(audioPath)) {
        throw new Error(`Invalid audio path: ${audioPath}`);
      }

      // Reutilizar instancia de audio si ya existe
      if (!audioInstances[audioPath]) {
        console.log(`Creating new audio instance for: ${audioPath}`);
        audioInstances[audioPath] = new Audio(audioPath);
      }

      const audio = audioInstances[audioPath];

      // Verificar si el archivo existe
      await new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error(`Audio load timeout: ${audioPath}`));
        }, 5000);

        audio.addEventListener('error', (e) => {
          clearTimeout(timeoutId);
          console.error(`Audio load error for ${audioPath}:`, e);
          reject(new Error(`Failed to load audio ${audioPath}: ${e.message}`));
        }, { once: true });
        
        audio.addEventListener('canplaythrough', () => {
          clearTimeout(timeoutId);
          console.log(`Audio loaded successfully: ${audioPath}`);
          resolve(true);
        }, { once: true });
        
        audio.load();
      });

      console.log(`Playing audio: ${audioPath}`);
      await audio.play();
      return audio;
      
    } catch (error) {
      console.warn(`Audio playback failed:`, error);
      // Limpiar la instancia fallida del cache
      if (error instanceof Error && error.message.includes('Failed to load audio')) {
        const failedPath = error.message.split('Failed to load audio ')[1]?.split(':')[0];
        if (failedPath && audioInstances[failedPath]) {
          delete audioInstances[failedPath];
        }
      }
      return null;
    }
  };

  const stopAllAudio = () => {
    Object.values(audioInstances).forEach(audio => {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (error) {
        console.warn('Error stopping audio:', error);
      }
    });
  };

  return { playAudio, stopAllAudio };
}; 