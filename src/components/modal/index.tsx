import React, { ComponentProps, useEffect, useRef } from "react";

interface IModalWrapper {
  showModal: boolean;
  children: React.ReactNode;
  bodyStyle?: ComponentProps<"div">;
  onClose: () => void;
  allowOnClickOutside?: boolean;
}

const ModalWrapper: React.FC<IModalWrapper> = (props) => {
  const { children, bodyStyle, showModal, onClose, allowOnClickOutside = false } = props;
  const modalRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const modalClose = (e: MouseEvent) => {
    if (allowOnClickOutside) {
      if (e.target !== modalRef.current && modalRef.current?.contains(e.target as Node) === false) {
        onClose();
      }
    }
  };

  useEffect(() => {
    const wrapperComponent = wrapperRef.current;
    wrapperComponent?.addEventListener("click", modalClose);
    return () => {
      wrapperComponent?.removeEventListener("click", modalClose);
    };
  }, []);

  return (
    showModal && (
      <section
        ref={wrapperRef}
        style={{ background: "rgba(0, 0, 0, 0.8)" }}
        className=" fixed h-screen w-screen left-0 top-0 flex items-center justify-center z-50"
      >
        <div ref={modalRef} {...bodyStyle}>
          {children}
        </div>
      </section>
    )
  );
};

export default ModalWrapper;
