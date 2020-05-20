import { useEffect, useCallback, useState } from 'react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Linking } from 'expo';

export const useDeepLink = () => {
  const onUrlEvent = useCallback(
    ({ url }: { url: string | null }) => {
      console.log(`onUrlEvent received: ${url}`);
    },
    [],
  );

  const [consumedInitialUrl, setConsumedInitialUrl] = useState(false);
  useEffect(() => {
    if (!consumedInitialUrl) {
      setConsumedInitialUrl(true);
      (async () => {
        const url: string | null = await Linking.getInitialURL();
        console.log(`getInitialURL received: ${url}`);
        onUrlEvent({ url });
      })();
    }
  }, [onUrlEvent, consumedInitialUrl]);

  useEffect(() => {
    Linking.addEventListener('url', onUrlEvent);
    return () => {
      Linking.removeEventListener('url', onUrlEvent);
    };
  }, [onUrlEvent]);
};


export default function App() {
  useDeepLink();

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
