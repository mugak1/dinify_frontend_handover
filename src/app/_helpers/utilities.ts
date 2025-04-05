import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class Utilities {
    public static searchArray(searchTerm: string, caseSensitive: boolean, ...values: any[]) {
        if (!searchTerm) {
          return true;
        }
    
        let filter = searchTerm.trim();
        let data = values.join();
    
        if (!caseSensitive) {
          filter = filter.toLowerCase();
          data = data.toLowerCase();
        }
    
        return data.indexOf(filter) != -1;
      }
  }