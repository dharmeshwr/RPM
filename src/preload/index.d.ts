declare global {
  interface Window {
    context: {
      locale: string
    };
    api: unknown;
  }
}
