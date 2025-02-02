type AudioType = 'sistemdata' | 'teleport' | 'narration';

interface AudioMap {
  sistemdata: string;
  teleport: string;
}

interface AudioTimeEvent {
  time: number;
  action: string;
}

// Mapeo de eventos de tiempo por paso
const audioTimeEvents: { [key: number]: AudioTimeEvent[] } = {
  1: [
    { time: 10, action: 'highlight-status' },
  ],
  // Agregar más pasos según sea necesario
};

// Constantes para las rutas base
const AUDIO_BASE_PATH = '/audio';
const EFFECTS_PATH = `${AUDIO_BASE_PATH}/effects`;
const NARRATIONS_PATH = `${AUDIO_BASE_PATH}/narrations`;

const audioFiles: AudioMap = {
  sistemdata: `${EFFECTS_PATH}/sistemdata.mp3`,
  teleport: `${EFFECTS_PATH}/teleport.mp3`
};

const audioInstances: { [key: string]: HTMLAudioElement } = {};
let isMuted = false;
let currentAudioStep: number | null = null;
let currentTimeEvents: AudioTimeEvent[] = [];
let onTimeEventCallback: ((action: string) => void) | null = null;

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

  const handleTimeUpdate = (audio: HTMLAudioElement) => {
    if (!currentTimeEvents || !onTimeEventCallback) return;

    const currentTime = audio.currentTime;
    
    // Create a copy of the array to avoid mutation during iteration
    [...currentTimeEvents].forEach((event, index) => {
      if (Math.abs(currentTime - event.time) < 0.1) {
        console.log(`Time event triggered at ${currentTime}s:`, event.action);
        // Safe call with null check
        onTimeEventCallback?.(event.action);
        // Remove the triggered event from the original array
        currentTimeEvents.splice(index, 1);
      }
    });
  };

  const playAudio = async (type: AudioType, stepNumber?: number) => {
    try {
      let audioPath: string;

      if (type === 'narration' && stepNumber) {
        audioPath = getNarrationPath(stepNumber);
        currentAudioStep = stepNumber;
        currentTimeEvents = [...(audioTimeEvents[stepNumber] || [])];
      } else if (type in audioFiles) {
        audioPath = audioFiles[type as keyof AudioMap];
      } else {
        throw new Error(`Audio type "${type}" not found`);
      }

      if (!validateAudioPath(audioPath)) {
        throw new Error(`Invalid audio path: ${audioPath}`);
      }

      if (!audioInstances[audioPath]) {
        audioInstances[audioPath] = new Audio(audioPath);
      }

      const audio = audioInstances[audioPath];
      audio.muted = isMuted;

      // Remove previous timeupdate listeners
      const clonedAudio = audio.cloneNode() as HTMLAudioElement;
      audio.replaceWith(clonedAudio);
      audioInstances[audioPath] = clonedAudio;
      
      // Add new listener if it's a narration
      if (type === 'narration') {
        clonedAudio.addEventListener('timeupdate', () => handleTimeUpdate(clonedAudio));
      }

      await new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error(`Audio load timeout: ${audioPath}`));
        }, 5000);

        clonedAudio.addEventListener('error', (e) => {
          clearTimeout(timeoutId);
          reject(new Error(`Failed to load audio ${audioPath}: ${e.message}`));
        }, { once: true });
        
        clonedAudio.addEventListener('canplaythrough', () => {
          clearTimeout(timeoutId);
          resolve(true);
        }, { once: true });
        
        clonedAudio.load();
      });

      // Ensure we start from the beginning
      clonedAudio.currentTime = 0;
      await clonedAudio.play();
      return clonedAudio;
      
    } catch (error) {
      console.warn(`Audio playback failed:`, error);
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

  const muteAllAudio = (mute: boolean) => {
    isMuted = mute;
    Object.values(audioInstances).forEach(audio => {
      try {
        audio.muted = mute;
      } catch (error) {
        console.warn('Error changing audio mute state:', error);
      }
    });
  };

  const setTimeEventCallback = (callback: (action: string) => void) => {
    onTimeEventCallback = callback;
  };

  const setCurrentStep = (step: number) => {
    currentAudioStep = step;
    currentTimeEvents = [...(audioTimeEvents[step] || [])];
  };

  return { 
    playAudio, 
    stopAllAudio, 
    muteAllAudio, 
    setTimeEventCallback,
    setCurrentStep 
  };
}; 