import TokenCardList from "@/components/tokens/TokenCardList";
import TokenChartList from "@/components/tokens/TokenChartList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col space-y-3 px-48 py-10">
      <TokenCardList />
      <div>
        <TokenChartList />
      </div>
    </main>
  );
}
