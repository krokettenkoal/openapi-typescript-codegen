import type { OperationError } from './OperationError';
import type { OperationParameters } from './OperationParameters';
import type { OperationResponse } from './OperationResponse';
import type { ApiKeyScheme } from "./ApiKeyScheme";

export interface Operation extends OperationParameters {
    service: string;
    name: string;
    summary: string | null;
    description: string | null;
    deprecated: boolean;
    method: string;
    path: string;
    errors: OperationError[];
    results: OperationResponse[];
    responseHeader: string | null;
    server?: string;
    apiKeys?: ApiKeyScheme[];
}
