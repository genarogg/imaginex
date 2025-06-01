import svg from '../svg';

export interface FetchRemoteBase64Options {
    imageUrl: string;
    fetchTimeout?: number;
    onLoadStart?: () => void;
    onError?: (error: Error) => void;
}

export interface FetchRemoteBase64Result {
    success: boolean;
    svgData?: string;
    error?: Error;
}

export const fetchRemoteBase64 = async ({
    imageUrl,
    fetchTimeout = 5000,
    onLoadStart,
    onError
}: FetchRemoteBase64Options): Promise<FetchRemoteBase64Result> => {
    const abortController = new AbortController();

    try {
        onLoadStart?.();

        const timeoutId = setTimeout(() => {
            abortController.abort();
        }, fetchTimeout);

        const response = await fetch(
            `/api/getBase64/remote?url=${encodeURIComponent(imageUrl)}`,
            {
                signal: abortController.signal,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.data) {
            const svgData = svg({ base64: data.data });
            return {
                success: true,
                svgData
            };
        } else if (data.error) {
            throw new Error(`API Error: ${data.error}`);
        } else {
            throw new Error('No base64 data received from API');
        }
    } catch (error) {
        const err = error as Error;

        // Log warning in development mode
        if (process.env.NODE_ENV === 'development') {
            console.warn('Base64 fetch failed, falling back to direct loading:', err.message);
        }

        // Only call onError if it's not an abort error
        if (!err.name?.includes('Abort') && !err.message?.includes('aborted')) {
            onError?.(err);
        }

        return {
            success: false,
            error: err
        };
    }
};