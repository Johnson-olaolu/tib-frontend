import React, { ComponentProps } from "react";

const CreditCardChipIcon: React.FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg {...props} width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.671875 2.75118V16.8869V17.1605C0.671875 18.3693 1.65182 19.3493 2.86064 19.3493H23.2891C24.4979 19.3493 25.4778 18.3693 25.4778 17.1605V2.47758C25.4778 1.26876 24.4979 0.288818 23.2891 0.288818H2.86064C1.65182 0.288818 0.671875 1.26876 0.671875 2.47758V2.75118Z"
        fill="url(#paint0_linear_266_4639)"
        stroke="#8D731D"
        stroke-width="0.182397"
      />
      <path d="M10.156 0.380005C9.15286 3.26795 7.7484 11.1049 10.156 19.3493" stroke="#8D731D" stroke-width="0.182397" />
      <path d="M16.3576 0.380005C17.3608 3.26795 18.7653 11.1049 16.3576 19.3493" stroke="#8D731D" stroke-width="0.182397" />
      <path d="M0.762695 6.94617H8.97055" stroke="#8D731D" stroke-width="0.182397" />
      <path d="M17.6348 6.8551H25.4778" stroke="#8D731D" stroke-width="0.182397" />
      <path d="M0.762695 12.4181H8.97055" stroke="#8D731D" stroke-width="0.182397" />
      <path d="M17.6348 12.3269H25.4778" stroke="#8D731D" stroke-width="0.182397" />
      <defs>
        <linearGradient id="paint0_linear_266_4639" x1="25.1794" y1="0.313693" x2="0.738192" y2="19.5704" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E7BD61" />
          <stop offset="0.495738" stop-color="#FEE9BA" />
          <stop offset="1" stop-color="#E7BD61" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CreditCardChipIcon;
