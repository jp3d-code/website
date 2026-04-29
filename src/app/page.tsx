export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10">
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
