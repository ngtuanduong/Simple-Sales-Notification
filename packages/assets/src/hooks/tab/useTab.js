import {useCallback, useState} from 'react';

/**
 * @param defaultState
 * @returns {[]}
 */
export default function useTab(defaultState = null) {
  const [selectedTab, setSelectedTab] = useState(defaultState);

  const handleTabChange = useCallback(selectedTabIndex => setSelectedTab(selectedTabIndex), []);

  return [selectedTab, handleTabChange, setSelectedTab];
}
