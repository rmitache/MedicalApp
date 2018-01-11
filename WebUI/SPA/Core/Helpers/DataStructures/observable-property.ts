// Angular 2
import { EventEmitter } from '@angular/core';

type CloneFunction<T> = (valueToClone: T) => T;


export interface IReadableProperty<T> {
    Get(): T;
    Changed: EventEmitter<T>;
}
export class ObservableProperty<T> implements IReadableProperty<T> {
    // Fields
    private value: T = null;
    private cloneFunction: CloneFunction<T> = null;

    // Constructor
    constructor(initialValue?: T, cloneFunction?: CloneFunction<T>) {
        if (initialValue !== undefined) {
            this.value = initialValue;
        }
        if (cloneFunction) {
            this.cloneFunction = cloneFunction;
        }
    }

    // Public methods
    public Get(): T {
        return (this.cloneFunction && this.value) ? this.cloneFunction(this.value) : this.value;
    }
    public Set(newValue: T) {
        this.value = newValue;

        let valueToEmit = (this.cloneFunction && this.value) ? this.cloneFunction(this.value) : this.value;
        this.Changed.emit(valueToEmit);
    }
    public static Of<T>(value: T): ObservableProperty<T> {
        return new ObservableProperty(value);
    }

    // Events
    public readonly Changed: EventEmitter<T> = new EventEmitter<T>();
}