/**
 * Created by ddxfc on 2017/4/8.
 */
export  class StorageService {
  storage: Storage;

  constructor() {

  }

  create(type:boolean){
    if (type) {
      this.storage = window.localStorage;
    } else {
      this.storage = window.sessionStorage;
    }
    return this;
  }

  check(val:any) {
    return !(typeof val === "undefined" || typeof val === "function") && val;
  }

  setItem(key:string, val:any) {
    if (this.check(val) && this.check(key)) {
      this.storage.setItem(key, JSON.stringify({data: val}));
      // console.log(key,val);
    }
  }

  getItem(key:string) {
    if (this.check(key)) {
      let val = this.storage.getItem(key);
      // console.log(key,val);

      if (this.check(val)) {
        return JSON.parse(val).data;
      } else {
        return null;
      }
    }
  }
}
