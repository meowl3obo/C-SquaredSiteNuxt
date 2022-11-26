import { ProductStore } from "@/store/product";
import { GetClassifiesApi } from "@/apis/Product"
import { IParentClassify } from '@/types/product/Classify'

export const GetClassifies = async () => {
  const { SetClassify } = ProductStore();
  const { data, error } = await GetClassifiesApi()
  if (!error.value && data.value != null) {
    SetClassify(data.value as Array<IParentClassify>)
  }
}