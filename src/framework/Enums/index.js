class Enums {
  data = {};
  alias = []; //别名

  constructor(enumsName) {
    this.enumsName = enumsName;
  }

  //
  set(name, value) {
    this.data[name] = value + '';
    return this;
  }

  // 根据name得到value
  get(name) {
    return this.data[name];
  }

  //根据value得到name
  searchName(value) {
    return Object.keys(this.data).find(name => this.get(name) === (value + ''));
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  getFirstValue() {
    const data = this.getData();
    return data[Object.keys(data)[0]];
  }

  setAlias(name) { //设置别名
    this.alias.push(name);
    return this;
  }

  is(nameOrAlias) {
    return this.enumsName === nameOrAlias || this.alias.includes(nameOrAlias);
  }

  clone() {
    const cloneEnums = new Enums(this.enumsName);
    const data = this.getData();
    Object.keys(data).forEach(key => {
      cloneEnums.set(key, data[key]);
    });
    this.alias.forEach(aliasItem => cloneEnums.setAlias(aliasItem));
    return cloneEnums;
  }
}
export default Enums;
