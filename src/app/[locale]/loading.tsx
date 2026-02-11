import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-14 h-14 animate-[spin_1.2s_ease-in-out_infinite]">
          <Image
            src="/icon.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="w-16 h-[2px] rounded-full overflow-hidden bg-white/5">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-accent to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
