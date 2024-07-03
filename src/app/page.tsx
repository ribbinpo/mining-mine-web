import TokenCardList from "@/components/tokens/TokenCardList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between px-48 py-10">
      <TokenCardList />
    </main>
  );
}
