const IdeaCreatedNotification = () => {
  return (
    <div className="">
      <div className="flex items-center gap-2">
        <div className=" bg-tib-purple h-12 w-12 rounded-full"></div>
        <div className=" space-y-1">
          <p className=" text-lg font-bold text-tib-purple">Dina Wong</p>
          <p className=" font-bold text-tib-primary2">Arts</p>
        </div>
      </div>
      <div className="mt-3 pl-14">
        <p className=" text-tib-primary text-sm">
          So i’m posting a notification sample of what is expected of me to do and i’m dping this because i don’tknow what else to post.And now i am
          doing the extended version of this and trust me i still don’t know what to write...
        </p>
        <span className=" capitalize mt-3 inline-block text-[10px] text-tib-primary2">2 Hours Ago</span>
      </div>
    </div>
  );
};

export default IdeaCreatedNotification;
