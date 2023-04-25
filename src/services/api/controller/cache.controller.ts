import { endpoints } from "../../../constants/endpoints";
import { RedisCacheType } from "../../../contracts/generated/Enum/redisCacheType";
import { Result, ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface ICacheController {
    readAllCache: () => Promise<ResultWithValue<Array<string>>>;
    delCache: (cacheKey: string) => Promise<Result>;
    delAllCache: () => Promise<Result>;
    readAllRedisCache: () => Promise<ResultWithValue<Array<string>>>;
    delRedisCache: (cacheKey: RedisCacheType) => Promise<Result>;
    delAllRedisCache: () => Promise<Result>;
}

const cache = endpoints.cache;
const redisCache = endpoints.redisCache;

export const cacheController = (service: BaseApiService): ICacheController => ({
    readAllCache: (): Promise<ResultWithValue<Array<string>>> => {
        return service.get<Array<string>>(
            cache,
            service.addAccessTokenToHeaders,
        );
    },
    delCache: (cacheKey: string): Promise<Result> => {
        const url = `${cache}/${encodeURIComponent(cacheKey)}`;
        return service.delete(
            url,
            service.addAccessTokenToHeaders,
        );
    },
    delAllCache: (): Promise<Result> => {
        return service.delete(
            cache,
            service.addAccessTokenToHeaders,
        );
    },
    //
    readAllRedisCache: (): Promise<ResultWithValue<Array<string>>> => {
        return service.get<Array<string>>(
            redisCache,
            service.addAccessTokenToHeaders,
        );
    },
    delRedisCache: (cacheKey: RedisCacheType): Promise<Result> => {
        const url = `${redisCache}/${cacheKey}`;
        return service.delete(
            url,
            service.addAccessTokenToHeaders,
        );
    },
    delAllRedisCache: (): Promise<Result> => {
        return service.delete(
            redisCache,
            service.addAccessTokenToHeaders,
        );
    },
});