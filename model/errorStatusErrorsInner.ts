/**
 * OneLogin API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 3.0.0-alpha.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from './models';

export class ErrorStatusErrorsInner {
    'field'?: string;
    'message'?: Array<string>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "field",
            "baseName": "field",
            "type": "string"
        },
        {
            "name": "message",
            "baseName": "message",
            "type": "Array<string>"
        }    ];

    static getAttributeTypeMap() {
        return ErrorStatusErrorsInner.attributeTypeMap;
    }
}

