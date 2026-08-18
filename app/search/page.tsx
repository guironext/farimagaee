import SearchView from "../components/SearchView";

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";

  return <SearchView query={query} />;
}
