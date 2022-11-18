export interface IClassify {
  Id: string
  Name: string
  Path: string
}

export interface IParentClassify extends IClassify {
  Child: Array<IChildClassify>
}

export interface IChildClassify extends IClassify {
  ParentId: string
}