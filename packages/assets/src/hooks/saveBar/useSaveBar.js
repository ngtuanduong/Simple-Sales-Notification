import {useCallback, useEffect, useRef, useState} from 'react';
import {useAppBridge} from '@shopify/app-bridge-react';

export default function useSaveBar({input, setInput, saveSetting}) {
  const shopify = useAppBridge();
  const [loading, setLoading] = useState(null);
  const [show, setShow] = useState(false);
  const previousInputRef = useRef(input);
  const [firstLoad, setFirstLoad] = useState(true);

  const discard = useCallback(async () => {
    setInput(previousInputRef.current);
    await shopify.saveBar.hide('save-bar');
    setShow(false);
  }, [setInput, shopify]);

  const save = useCallback(async () => {
    setLoading('');
    await saveSetting(input);
    await shopify.saveBar.hide('save-bar');
    setLoading(null);
    previousInputRef.current = input;
    setShow(false);
  }, [input, saveSetting, shopify]);

  const showSaveBar = useCallback(async () => {
    if (!show) {
      await shopify.saveBar.show('save-bar');
      setShow(true);
    }
  }, [show, shopify]);

  useEffect(() => {
    if (firstLoad && input !== previousInputRef.current) {
      previousInputRef.current = input;
      setFirstLoad(false);
    }
  }, [input]);

  return {discard, save, loading, showSaveBar};
}
