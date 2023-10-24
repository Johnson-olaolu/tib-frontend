import React, { ComponentProps } from "react";

const ShareIcon: React.FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.8025 3.41901C15.7136 3.33563 15.6022 3.28007 15.4821 3.25918C15.362 3.23829 15.2384 3.25299 15.1265 3.30145C15.0147 3.34991 14.9194 3.43003 14.8525 3.53194C14.7856 3.63385 14.75 3.75311 14.75 3.87501V6.61101C14.571 6.61501 14.3625 6.62601 14.13 6.64701C13.3625 6.71801 12.322 6.91001 11.242 7.39951C9.041 8.39701 6.779 10.5865 6.254 15.1795C6.2397 15.3052 6.26391 15.4324 6.32342 15.544C6.38293 15.6557 6.47494 15.7467 6.58728 15.805C6.69962 15.8632 6.82699 15.886 6.95256 15.8703C7.07813 15.8546 7.19597 15.8011 7.2905 15.717C9.458 13.79 11.489 12.9605 12.9585 12.6075C13.5298 12.467 14.1137 12.3837 14.7015 12.359L14.75 12.3575V15.125C14.75 15.2469 14.7856 15.3662 14.8525 15.4681C14.9194 15.57 15.0147 15.6501 15.1265 15.6986C15.2384 15.747 15.362 15.7617 15.4821 15.7408C15.6022 15.72 15.7136 15.6644 15.8025 15.581L21.8025 9.95601C21.8649 9.89756 21.9146 9.82693 21.9486 9.74849C21.9825 9.67006 22.0001 9.58549 22.0001 9.50001C22.0001 9.41453 21.9825 9.32996 21.9486 9.25153C21.9146 9.1731 21.8649 9.10247 21.8025 9.04401L15.8025 3.41901ZM15.303 7.87101L15.313 7.87201H15.314H15.3135C15.4003 7.8806 15.488 7.87091 15.5709 7.84355C15.6538 7.8162 15.73 7.7718 15.7946 7.71321C15.8593 7.65462 15.911 7.58313 15.9464 7.50335C15.9817 7.42358 16 7.33728 16 7.25001V5.31751L20.461 9.50001L16 13.6825V11.75C16 11.435 15.773 11.17 15.4525 11.13H15.451L15.449 11.1295L15.444 11.129L15.43 11.1275C15.3618 11.1208 15.2934 11.1158 15.225 11.1125C15.0361 11.1036 14.847 11.1026 14.658 11.1095C14.175 11.1265 13.493 11.1945 12.6665 11.3925C11.3265 11.714 9.617 12.378 7.7775 13.719C8.5205 10.679 10.209 9.24001 11.7575 8.53801C12.678 8.12101 13.575 7.95401 14.245 7.89201C14.579 7.86101 14.853 7.85701 15.0405 7.86001C15.1281 7.86134 15.2156 7.86501 15.303 7.87101ZM6.125 4.00001C5.2962 4.00001 4.50134 4.32925 3.91529 4.9153C3.32924 5.50136 3 6.29621 3 7.12501V17.875C3 18.7038 3.32924 19.4987 3.91529 20.0847C4.50134 20.6708 5.2962 21 6.125 21H16.875C17.7038 21 18.4987 20.6708 19.0847 20.0847C19.6708 19.4987 20 18.7038 20 17.875V16.75C20 16.5843 19.9342 16.4253 19.8169 16.3081C19.6997 16.1909 19.5408 16.125 19.375 16.125C19.2092 16.125 19.0503 16.1909 18.9331 16.3081C18.8158 16.4253 18.75 16.5843 18.75 16.75V17.875C18.75 18.3723 18.5525 18.8492 18.2008 19.2008C17.8492 19.5525 17.3723 19.75 16.875 19.75H6.125C5.62772 19.75 5.15081 19.5525 4.79917 19.2008C4.44754 18.8492 4.25 18.3723 4.25 17.875V7.12501C4.25 6.62773 4.44754 6.15082 4.79917 5.79919C5.15081 5.44756 5.62772 5.25001 6.125 5.25001H10.25C10.4158 5.25001 10.5747 5.18417 10.6919 5.06695C10.8092 4.94974 10.875 4.79077 10.875 4.62501C10.875 4.45925 10.8092 4.30028 10.6919 4.18307C10.5747 4.06586 10.4158 4.00001 10.25 4.00001H6.125Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ShareIcon;