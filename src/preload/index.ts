import { contextBridge } from 'electron';

// Custom APIs for renderer
const api = {};

if (!process.contextIsolated) {
  throw new Error('ContextIsolation must be enabled in the browser window');
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('context', {
      locale: navigator.language
    });
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
}
