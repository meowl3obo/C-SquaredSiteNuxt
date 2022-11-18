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

export interface IProduct {
  Id?: string
  Name: string
  Intro: string
  Illustrate: string
  ParentClassify: string
  ChildClassify: string
  Price: number
  Color: string
  Size: number
  Unit: string
  PreOrderAmount: number
  NowAmount: number
}

export interface IGetProductsQuery {
  child?: string
}