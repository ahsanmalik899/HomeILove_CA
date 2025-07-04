import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

interface TimerProps {
  initialSeconds?: number;
}

const useCountdownTimer = ({ initialSeconds = 60 }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const appState = useRef(AppState.currentState);
  const startTimestamp = useRef<number | null>(null);
  const start = useCallback(() => {
    setTimeLeft(initialSeconds);
    startTimestamp.current = Date.now();
  }, [initialSeconds]);

  useEffect(() => {
    startTimestamp.current = Date.now();

    const interval = setInterval(() => {
      const elapsed = Math.floor(
        (Date.now() - (startTimestamp.current || 0)) / 1000,
      );
      const remaining = Math.max(initialSeconds - elapsed, 0);
      setTimeLeft(remaining);
    }, 1000);

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        const elapsed = Math.floor(
          (Date.now() - (startTimestamp.current || 0)) / 1000,
        );
        const remaining = Math.max(initialSeconds - elapsed, 0);
        setTimeLeft(remaining);
      }
      appState.current = nextAppState;
    });

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, [initialSeconds, start]);

  return { timeLeft, start };
};

export default useCountdownTimer;
