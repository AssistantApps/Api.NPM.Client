import { Result, ResultWithValue } from '../../contracts/result';
import { anyObject } from '../../helper/typescriptHacks';

export class BaseApiService {
  private _baseUrl: string = 'https://api.assistantapps.com';
  constructor(newBaseUrl: string) {
    this._baseUrl = newBaseUrl;
  }

  public async get<T>(
    url: string,
    manipulateHeaders?: () => any,
    manipulateResponse?: (data: Response) => any
  ): Promise<ResultWithValue<T>> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }

    let result = anyObject;
    try {
      result = await fetch(`${this._baseUrl}/${url}`, options);

      if (manipulateResponse != null) {
        return manipulateResponse(result);
      }
    } catch (ex: any) {
      console.log('data', ex.toString());
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex.toString()
      }
    }

    let resultValue = anyObject;
    try {
      resultValue = await result.json();
    } catch (ex: any) { }

    return {
      isSuccess: true,
      value: resultValue,
      errorMessage: ''
    }
  }

  public async post<T, TK>(
    url: string,
    data: TK,
    manipulateHeaders?: () => any,
    customMapper?: (data: Response) => any
  ): Promise<ResultWithValue<T>> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }

    let result = anyObject;
    try {
      result = await fetch(`${this._baseUrl}/${url}`, {
        ...options,
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(data),
      });

      if (customMapper != null) {
        return customMapper(result);
      }
    } catch (ex: any) {
      console.log('data', ex.toString());
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex.toString()
      }
    }

    let resultValue = anyObject;
    try {
      resultValue = await result.json();
    } catch (ex: any) { }

    return {
      isSuccess: true,
      value: resultValue,
      errorMessage: ''
    }
  }

  public async put<T, TK>(
    url: string,
    data: TK,
    manipulateHeaders?: () => any,
    customMapper?: (data: any) => any
  ): Promise<ResultWithValue<T>> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }

    let result = anyObject;
    try {
      result = await fetch(`${this._baseUrl}/${url}`, {
        ...options,
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(data),
      });

      if (customMapper != null) {
        return customMapper(result);
      }
    } catch (ex: any) {
      console.log('data', ex.toString());
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex.toString()
      }
    }

    let resultValue = anyObject;
    try {
      resultValue = await result.json();
    } catch (ex: any) { }

    return {
      isSuccess: true,
      value: resultValue,
      errorMessage: ''
    }
  }

  public async delete(
    url: string,
    manipulateHeaders?: () => any,
  ): Promise<Result> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }

    let result = anyObject;
    try {
      result = await fetch(`${this._baseUrl}/${url}`, {
        ...options,
        method: 'DELETE',
      });
    } catch (ex: any) {
      console.log('data', ex.toString());
      return {
        isSuccess: false,
        errorMessage: ex.toString()
      }
    }

    let resultValue = anyObject;
    try {
      resultValue = await result.json();
    } catch (ex: any) { }

    return {
      isSuccess: true,
      errorMessage: ''
    }
  }

  public addAccessTokenToHeaders = () => anyObject;
  public formDataWithAccessTokenHeaders = () => anyObject;

}
