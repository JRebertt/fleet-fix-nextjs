export default async function Test({
  params,
}: {
  params: { vehiclesId: string }
}) {
  console.log(params)

  return <h1>Hello Id: {params.vehiclesId} </h1>
}
