import { OpenApi } from "../interfaces/OpenApi";
import { OpenApiOperation } from "../interfaces/OpenApiOperation";
import { OperationApiKey } from "../../../client/interfaces/OperationApiKey";

export const getOperationApiKeys = (openApi: OpenApi, op: OpenApiOperation): OperationApiKey[] | undefined => {
    //  Check op.security and openApi.security for any apiKey requirements.
    //  Transform the requirements into an OperationApiKeys object, holding the security scheme's name as key and the apiKey's name and location as value.
    //  Return the OperationApiKeys object.
    //  If no apiKey requirements are found, return undefined.

    //  Check op.security and openApi.security for any apiKey requirements.
    const securityRequirements = op.security ?? openApi.security;
    if (!securityRequirements)
        return undefined;

    //  Transform the requirements into an OperationApiKeys object, holding the security scheme's name as key and the apiKey's name and location as value.
    const apiKeys: OperationApiKey[] = [];
    for (const securityRequirement of securityRequirements) {
        for (const securitySchemeName in securityRequirement) {
            if(!openApi.components?.securitySchemes?.hasOwnProperty(securitySchemeName))
                continue;

            const securityScheme = openApi.components.securitySchemes[securitySchemeName];
            if (!securityScheme || securityScheme.type !== 'apiKey')
                continue;

            apiKeys.push({
                key: securitySchemeName,
                name: securityScheme.name ?? 'X-API-Key',
                in: securityScheme.in ?? 'header',
            });
        }
    }

    return apiKeys;
}
