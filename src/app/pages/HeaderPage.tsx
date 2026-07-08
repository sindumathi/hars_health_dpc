export default function HeaderPage({ title }: { title: string }) {
  return (
    <>
      <header className="flex gap-1 mb-20">
        <div className="w-0 h-0 border-r-[50px] border-r-transparent border-b-[80px] border-b-sky-800"></div>
        <div className="absolute top-5 bottom-0 max-w-sm mt-4 max-h-3 bg-sky-500 w-[100%]"></div>
        <div className="absolute top-10 bottom-0 max-w-sm mt-4 max-h-3 bg-sky-500 px-150"></div>
        <div className="flex items-center justify-center gap-4 p-4 text-sky-800  mx-auto">
          <div className="w-full absolute top-0 lg:static mx-auto text-2xl font-extrabold">
            {title}
          </div>
        </div>
      </header>
    </>
  );
}
//border-t-transparent border-b-[50px]
// border-b-transparent
//  border-r-[80px] border-r-green-500
