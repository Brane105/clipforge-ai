type FAQItem = {
  question: string;
  answer: string;
};

export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">FAQ</p>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Questions creators ask first</h2>
      </div>
      <div className="divide-y divide-white/10 rounded-lg border border-white/10 bg-white/[0.04]">
        {items.map((item) => (
          <details key={item.question} className="group p-4">
            <summary className="cursor-pointer list-none text-sm font-semibold text-white">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="text-fuchsia-300 transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-6 text-zinc-300">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
