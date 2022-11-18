export default defineEventHandler((event) => {
  const query = useQuery(event)
  
  return {
    ok: true,
    message: `your query is ${JSON.stringify(query)}`
  }
})