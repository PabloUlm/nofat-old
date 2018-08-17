import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NofatService {

  req: any;
  res: any;

  constructor(req, res) {
    this.req = req;
    this.res = res;
   }

   addUser() {

   }

   getUser() {

   }
}
// module.exports = NofatService;
