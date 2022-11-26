export interface IProductIntro {
  ChildClassify: string
  Id: string
  Intro: string
  IsNew: boolean
  IsSale: boolean
  MainImg: string
  Name: string
  ParentClassify: string
  Price: number
  Status: number
}

export interface IProduct extends IProductIntro{
  Illustrate: string
  OtherImgs: Array<string>
  Inventorys: Array<IInventory>
}

export interface IGetProductsQuery {
  child?: string
}

export interface IInventory {
  Color: string
  Id: string
  NowAmount: number
  PreOrderAmount: number
  ProductId: string
  Size: number
  Unit: string
}