export interface IHeaderProps {
    authToken?: string;
}

export const addAccessTokenToHeaders = (headerProps: IHeaderProps) => {
    const accessToken: string = headerProps.authToken ?? '';
    if (accessToken.length < 1) {
        console.warn('Expected access token to not be empty but it is')
    }
    return ({
        headers: {
            authorization: `Bearer ${accessToken}`,
        }
    });
}

export const formDataWithAccessTokenHeaders = (headerProps: IHeaderProps) => {
    const onlyAccessToken = addAccessTokenToHeaders(headerProps);
    return ({
        ...onlyAccessToken,
        headers: {
            ...onlyAccessToken.headers,
            'Content-Type': 'multipart/form-data',
        }
    });
}