

export default function WOTD() {
  return (
    <div className="flex flex-col w-full gap-[42px] bg-bg-muted rounded-xl p-4">
      <div className="anton-regular">WOTD / 23-AUG-25</div>
      <div className="self-center">
        <div className="flex flex-col space-y-1 ">
          <div className="text-text-muted font-semibold leading-[0.2]">adjective</div>
          <div className="text-8xl  anton-regular">ELOQUENT</div>
          <div className="self-center bg-accent px-2 text-xl font-bold">
            /ˈɛləkw(ə)nt/
          </div>
        </div>
      </div>
      <p className="self-center text-lg max-w-[800px]">
        “ fluent or persuasive in speaking or writing ”
      </p>
    </div>
  );
}

