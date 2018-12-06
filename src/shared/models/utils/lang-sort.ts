export class LangSort {

  static sort(obj:any[]):any[]{
    let ret = [];
    ret.push(obj.find(value => value.language=='EN'));
    ret.push(obj.find(value => value.language=='UK'));
    ret.push(obj.find(value => value.language=='PL'));
    ret.push(obj.find(value => value.language=='RU'));
    console.log(ret);
    return ret;
  }

  static sortOne(obj:any):any{
    let ret = [];
    ret.push(obj.find(value => value.language=='EN'));
    ret.push(obj.find(value => value.language=='UK'));
    ret.push(obj.find(value => value.language=='PL'));
    ret.push(obj.find(value => value.language=='RU'));
    console.log(ret);
    return ret;
  }



}
