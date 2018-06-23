// Angular 2
import { EventEmitter } from '@angular/core';
// Core
import { List } from './list';

export class ObservableList<T> extends List<T> {

    // Constructor
    constructor() {
        super();
    }

    // Public methods
    public Add(obj: T): void {
        super.Add(obj);
        this.ItemAdded.emit(obj);
    }
    public AddArray(array: T[]): void {
        for (let i = 0; i < array.length; i++) {
            this.Add(array[i]);
        }
    }
    public RemoveAt(index: number): void {
        const obj: T = this.innerArray[index];
        super.RemoveAt(index);

        this.ItemRemoved.emit(obj);
    }

    // Events
    public ItemAdded: EventEmitter<T> = new EventEmitter<T>();
    public ItemRemoved: EventEmitter<T> = new EventEmitter<T>();
}
