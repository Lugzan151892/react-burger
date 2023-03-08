export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'; 
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
}

export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: any;
}

export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: any;
}

export interface IWsSendMessage {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: any;
}

export type TWsActions = IWsConnectionStart | IWsConnectionClosed | IWsConnectionSuccess | IWsConnectionError | IWsGetMessage | IWsSendMessage;

export const wsConnectionStart = (url: string): IWsConnectionStart => {
    return {
        type: WS_CONNECTION_START,
        payload: url
    };
};

export const wsConnectionClosed = (): IWsConnectionClosed => {
    return {
        type: WS_CONNECTION_CLOSED,
    };
};

export const wsConnectionSuccess = (): IWsConnectionSuccess => {
    return {
        type: WS_CONNECTION_SUCCESS
    };
};

export const wsConnectionError = (error: any): IWsConnectionError => {
    return {
        type: WS_CONNECTION_ERROR,
        payload: error
    };
};

export const wsGetMessage = (message: any): IWsGetMessage => {
    return {
        type: WS_GET_MESSAGE,
        payload: message
    };
};

export const wsSendMessage = (message: any): IWsSendMessage => {
    return {
        type: WS_SEND_MESSAGE,
        payload: message
    };
};
