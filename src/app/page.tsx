export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-between px-16 py-32 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs font-semibold text-3xl leading-10">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8">
            Looking for a starting point or more instructions? Head over to
            center.
          </p>
        </div>
      </main>
    </div>
  );
}
