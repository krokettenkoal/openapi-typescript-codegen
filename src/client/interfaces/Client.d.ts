import type { Model } from './Model';
import type { Service } from './Service';
import type { ApiKeyScheme } from "./ApiKeyScheme";

export interface Client {
    version: string;
    server: string;
    models: Model[];
    services: Service[];
    apiKeys?: ApiKeyScheme[];
}
