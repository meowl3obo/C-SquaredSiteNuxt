export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  
  return {
    ok: true,
    message: `your body is ${JSON.stringify(body)}`
  }
})