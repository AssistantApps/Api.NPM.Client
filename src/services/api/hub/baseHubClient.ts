import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { SignalRSendEvent, SignalRReceiveEvent } from '../../../contracts/enum/signalREvent';
import { IAssistantAppsHubState } from '../../../contracts/state';

export class BaseHubClient {
    private _connection: HubConnection;
    private _state: IAssistantAppsHubState = {
        url: '',
        hubPath: '',
    };

    constructor(state?: IAssistantAppsHubState) {
        const apiUrl: string = state?.url ?? 'https://api.assistantapps.com';
        this._state.url = apiUrl;
        this._state.hubPath = state?.hubPath ?? '/hubs/OAuth';

        this._connection = new HubConnectionBuilder()
            .withUrl(`${this._state.url}${this._state.hubPath}`)
            .withAutomaticReconnect()
            .build();
        this._connection.start().then(() => this.logMessage('signalR connection'));
    }

    isConnected = (): boolean => {
        return this._connection.state === HubConnectionState.Connected;
    }

    protected addListener = (channel: SignalRReceiveEvent, callBack: (args: any[]) => void) => {
        this.logMessage(`Listener created for: ${SignalRReceiveEvent[channel].toString()}`);
        this._connection.on(SignalRReceiveEvent[channel].toString(), (args: any[]) => callBack(args));
    }

    protected removeListener = (channel: SignalRReceiveEvent, callBack: (args: any[]) => void) => {
        this.logMessage(`Listener removed for: ${SignalRReceiveEvent[channel].toString()}`);
        this._connection.off(SignalRReceiveEvent[channel].toString(), (args: any[]) => callBack(args));
    }

    protected sendPayload = async <T>(channel: SignalRSendEvent, payload: T) => {
        if (this.isConnected()) {
            try {
                const channelString = SignalRSendEvent[channel].toString();
                await this._connection.send(channelString, payload);
                this.logMessage('Message sent!', `channel: ${channelString}`, payload);
            }
            catch (e) {
                console.error('sendPayload error', e);
            }
        }
        else {
            console.warn('No connection, cannot send payload!')
        }
    }

    private logMessage = (message: string, ...optionalParams: any[]) => {
        console.log(message, optionalParams);
    }
}