export function calculatePayloadSize(messages: any[]): number {
  return Math.round(JSON.stringify(messages).length / 1024);
}
