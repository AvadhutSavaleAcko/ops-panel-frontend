import Cookies from 'js-cookie';
import { IWebViewActionData } from './types';

export function useWebviewCallback(
    data: IWebViewActionData,
    nativeWebFunc: any,
    getRes?: any
) {
    try {
        const isWebView = Boolean(Cookies.get('webview'));
        if (isWebView && data?.action) {
            if (
                typeof window !== 'undefined' &&
                window?.flutter_inappwebview?.callHandler
            ) {
                window?.flutter_inappwebview
                    ?.callHandler('WebViewConnect', JSON.stringify(data))
                    .then((res: any) => {
                        getRes?.(res);
                    });
            }
        } else {
            nativeWebFunc();
        }
    } catch (e) {
        nativeWebFunc();
    }
}