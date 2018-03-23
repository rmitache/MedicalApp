import { Component, Input, EventEmitter, Output, Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
    transform(value, args: string[]): any {
        let keys = [];
        for (let key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    }
}

@Pipe({ name: 'enumkeys' })
export class EnumKeysPipe implements PipeTransform {
    transform(value, args: string[]): any {
        
        let keys = [];
        for (let key in value) {
            if (!isNaN(Number(value[key]))) {
                keys.push({ key: key, value: value[key] });
            }
            
        }
        return keys;
    }
}