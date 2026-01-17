/**
 * Utility function to get the client's IP address
 * Uses a public IP detection service
 * 
 * @returns Promise<string | null> - The IP address or null if failed
 * 
 * @example
 * ```tsx
 * const ip = await getClientIp();
 * if (ip) {
 *   await requestOtp('user@example.com', ip);
 * }
 * ```
 */
export async function getClientIp(): Promise<string | null> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || null;
  } catch (error) {
    console.warn('Failed to get client IP:', error);
    return null;
  }
}
