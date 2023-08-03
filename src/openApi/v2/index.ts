import type { Client } from '../../client/interfaces/Client';
import type { OpenApi } from './interfaces/OpenApi';
import { getModels } from './parser/getModels';
import { getServer } from './parser/getServer';
import { getServices } from './parser/getServices';
import { getServiceVersion } from './parser/getServiceVersion';
import { ApiKeyScheme } from "../../client/interfaces/ApiKeyScheme";

/**
 * Parse the OpenAPI specification to a Client model that contains
 * all the models, services and schema's we should output.
 * @param openApi The OpenAPI spec  that we have loaded from disk.
 */
export const parse = (openApi: OpenApi): Client => {
    const version = getServiceVersion(openApi.info.version);
    const server = getServer(openApi);
    const models = getModels(openApi);
    const services = getServices(openApi);
    const apiKeys = openApi.securityDefinitions ? Object.entries(openApi.securityDefinitions).filter(([_, scheme]) => scheme.type === 'apiKey').map(([key, scheme]) => ({ key, name: scheme.name, in: scheme.in } as ApiKeyScheme)) : undefined;

    return { version, server, models, services, apiKeys };
};
