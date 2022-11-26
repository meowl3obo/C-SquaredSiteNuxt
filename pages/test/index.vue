<template>
  <div>
    <div>now count: {{ data }}</div>
    <button @click="setCount(data + 1)">SetCount</button>
  </div>
  <div>
    <div>map test: {{ test.get("a") }}</div>
    <div>deep map: {{ tt.get("a").get("a") }}</div>
    <button @click="test.set('a', 'c')">ChangeTest</button>
    <button @click="test.clear()">ClearTest</button>
  </div>
  <div>
    <div>res: <span>{{ res }}</span></div>
    <button @click="getData(data)">TestGetData</button>
    <button @click="postData(data)">TestPostData</button>
  </div>

  <NuxtLink to="/">前往 main</NuxtLink>
</template>

<script lang="ts">
import { DataStore } from "@/store/data";

export default defineComponent({
  setup() {
    definePageMeta({
      middleware: ["test"],
    });
    type TStringMap<T> = Map<string, T>
    const { SetCount, GetCount } = DataStore();
    const data = computed(() => GetCount());
    const test = reactive<TStringMap<string>>(new Map());
    const tt = reactive<TStringMap<TStringMap<string>>>(new Map<string, Map<string, string>>());
    const res = ref<any>();

    test.set("a", "b");
    tt.set("a", test);

    const setCount = (newVal: number) => {
      SetCount(newVal);
    };

    const getData = async () => {
      const query = { data: data.value };
      const response = await useFetch("/api/test", {
        method: "GET",
        params: query,
        initialCache: false,
      });
      res.value = response.data.value
    };

    const postData = async () => {
      console.log(data);
      const body = { data: data.value };
      const response = await useFetch("/api/test", {
        method: "POST",
        body: body,
        initialCache: false,
      });
      res.value = response.data.value
    };

    getData()

    watch(
      test,
      () => {
        console.log(test);
      },
      { deep: true }
    );

    return { data, test, tt, res, setCount, getData, postData };
  },
});
</script>
