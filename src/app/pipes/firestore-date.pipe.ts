import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'firestoreDate'
})
export class FirestoreDatePipe implements PipeTransform {
  transform(value: Timestamp | null): Date | null {
    return value ? value.toDate() : null;
  }
}
