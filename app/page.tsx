import Hero from "./components/Hero";

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  return <Hero sport={params.sport} />;
}
