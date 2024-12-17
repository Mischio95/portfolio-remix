export function EmailSidebar() {
  return (
    <div className="fixed bottom-0 right-10 hidden xl:block">
      <div className="flex flex-col items-center gap-6">
        <a
          href="mailto:michele.trombone95@gmail.com"
          className="vertical-text text-sm text-slate-400 transition-colors hover:text-[#64FFDA]"
        >
          michele.trombone95@gmail.com
        </a>
        <div className="mt-4 h-24 w-[1px] bg-slate-400" />
      </div>
    </div>
  );
}
