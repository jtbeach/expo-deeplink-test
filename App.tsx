import { useEffect, useCallback, useState } from 'react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Linking } from 'expo';

const useDeepLink = () => {
  const [currentURL, setCurrentURL] = useState<string | null>(null);
  const [consumedInitialUrl, setConsumedInitialUrl] = useState(false);

  const onUrlEvent = useCallback(
    ({ url }: { url: string | null }) => {
      setCurrentURL(url);
      console.log(`onUrlEvent received: ${url}`);
    },
    [],
  );

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

  return currentURL;
};


export default function App() {
  const url= useDeepLink();

  return (
    <View style={styles.container}>
      <Text>Current URL: {url}</Text>
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
