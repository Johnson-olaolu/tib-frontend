"use client";
import React, { useState } from "react";

const ViewTypeFilter = () => {
  const [viewTypeFilter, setViewTypeFilter] = useState<"grid" | "list">("grid");
  return (
    <div className="">
      {viewTypeFilter === "grid" ? (
        <button className="flex gap-2 items-center text-tib-primary" onClick={() => setViewTypeFilter("list")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.2999 2.40002C3.06121 2.40002 2.83229 2.49485 2.66351 2.66363C2.49472 2.83241 2.3999 3.06133 2.3999 3.30002V10.5C2.3999 10.9968 2.8031 11.4 3.2999 11.4H6.2999C6.5386 11.4 6.76752 11.3052 6.9363 11.1364C7.10508 10.9676 7.1999 10.7387 7.1999 10.5C7.1999 10.2613 7.10508 10.0324 6.9363 9.86363C6.76752 9.69485 6.5386 9.60002 6.2999 9.60002H4.1999V4.20002H6.2999C6.5386 4.20002 6.76752 4.1052 6.9363 3.93642C7.10508 3.76764 7.1999 3.53872 7.1999 3.30002C7.1999 3.06133 7.10508 2.83241 6.9363 2.66363C6.76752 2.49485 6.5386 2.40002 6.2999 2.40002H3.2999ZM3.2999 12.6C3.06121 12.6 2.83229 12.6948 2.66351 12.8636C2.49472 13.0324 2.3999 13.2613 2.3999 13.5V20.7C2.3999 21.1968 2.8031 21.6 3.2999 21.6H6.2999C6.5386 21.6 6.76752 21.5052 6.9363 21.3364C7.10508 21.1676 7.1999 20.9387 7.1999 20.7C7.1999 20.4613 7.10508 20.2324 6.9363 20.0636C6.76752 19.8948 6.5386 19.8 6.2999 19.8H4.1999V14.4H6.2999C6.5386 14.4 6.76752 14.3052 6.9363 14.1364C7.10508 13.9676 7.1999 13.7387 7.1999 13.5C7.1999 13.2613 7.10508 13.0324 6.9363 12.8636C6.76752 12.6948 6.5386 12.6 6.2999 12.6H3.2999ZM9.2999 14.4C9.06121 14.4 8.83229 14.4948 8.66351 14.6636C8.49472 14.8324 8.3999 15.0613 8.3999 15.3C8.3999 15.5387 8.49472 15.7676 8.66351 15.9364C8.83229 16.1052 9.06121 16.2 9.2999 16.2H20.6999C20.9386 16.2 21.1675 16.1052 21.3363 15.9364C21.5051 15.7676 21.5999 15.5387 21.5999 15.3C21.5999 15.0613 21.5051 14.8324 21.3363 14.6636C21.1675 14.4948 20.9386 14.4 20.6999 14.4H9.2999ZM8.3999 18.9C8.3999 18.6613 8.49472 18.4324 8.66351 18.2636C8.83229 18.0948 9.06121 18 9.2999 18H20.6999C20.9386 18 21.1675 18.0948 21.3363 18.2636C21.5051 18.4324 21.5999 18.6613 21.5999 18.9C21.5999 19.1387 21.5051 19.3676 21.3363 19.5364C21.1675 19.7052 20.9386 19.8 20.6999 19.8H9.2999C9.06121 19.8 8.83229 19.7052 8.66351 19.5364C8.49472 19.3676 8.3999 19.1387 8.3999 18.9ZM8.3999 5.10002C8.3999 4.86133 8.49472 4.63241 8.66351 4.46363C8.83229 4.29485 9.06121 4.20002 9.2999 4.20002H20.6999C20.9386 4.20002 21.1675 4.29485 21.3363 4.46363C21.5051 4.63241 21.5999 4.86133 21.5999 5.10002C21.5999 5.33872 21.5051 5.56764 21.3363 5.73642C21.1675 5.9052 20.9386 6.00002 20.6999 6.00002H9.2999C9.06121 6.00002 8.83229 5.9052 8.66351 5.73642C8.49472 5.56764 8.3999 5.33872 8.3999 5.10002ZM9.2999 7.80002C9.06121 7.80002 8.83229 7.89485 8.66351 8.06363C8.49472 8.23241 8.3999 8.46133 8.3999 8.70002C8.3999 8.93872 8.49472 9.16764 8.66351 9.33642C8.83229 9.5052 9.06121 9.60002 9.2999 9.60002H20.6999C20.9386 9.60002 21.1675 9.5052 21.3363 9.33642C21.5051 9.16764 21.5999 8.93872 21.5999 8.70002C21.5999 8.46133 21.5051 8.23241 21.3363 8.06363C21.1675 7.89485 20.9386 7.80002 20.6999 7.80002H9.2999Z"
              fill="#403E3E"
            />
          </svg>
          <span className="">List View</span>
        </button>
      ) : (
        <button className="flex gap-2 items-center text-tib-primary" onClick={() => setViewTypeFilter("grid")}>
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 2V5H2V2H5ZM6.5 12.5V9.5C6.5 9.10218 6.34196 8.72064 6.06066 8.43934C5.77936 8.15804 5.39782 8 5 8H2C1.60218 8 1.22064 8.15804 0.93934 8.43934C0.658035 8.72064 0.5 9.10218 0.5 9.5V12.5C0.5 12.8978 0.658035 13.2794 0.93934 13.5607C1.22064 13.842 1.60218 14 2 14H5C5.39782 14 5.77936 13.842 6.06066 13.5607C6.34196 13.2794 6.5 12.8978 6.5 12.5ZM6.5 5V2C6.5 1.60218 6.34196 1.22064 6.06066 0.93934C5.77936 0.658035 5.39782 0.5 5 0.5H2C1.60218 0.5 1.22064 0.658035 0.93934 0.93934C0.658035 1.22064 0.5 1.60218 0.5 2V5C0.5 5.39782 0.658035 5.77936 0.93934 6.06066C1.22064 6.34196 1.60218 6.5 2 6.5H5C5.39782 6.5 5.77936 6.34196 6.06066 6.06066C6.34196 5.77936 6.5 5.39782 6.5 5ZM14 12.5V9.5C14 9.10218 13.842 8.72064 13.5607 8.43934C13.2794 8.15804 12.8978 8 12.5 8H9.5C9.10218 8 8.72064 8.15804 8.43934 8.43934C8.15804 8.72064 8 9.10218 8 9.5V12.5C8 12.8978 8.15804 13.2794 8.43934 13.5607C8.72064 13.842 9.10218 14 9.5 14H12.5C12.8978 14 13.2794 13.842 13.5607 13.5607C13.842 13.2794 14 12.8978 14 12.5ZM14 5V2C14 1.60218 13.842 1.22064 13.5607 0.93934C13.2794 0.658035 12.8978 0.5 12.5 0.5H9.5C9.10218 0.5 8.72064 0.658035 8.43934 0.93934C8.15804 1.22064 8 1.60218 8 2V5C8 5.39782 8.15804 5.77936 8.43934 6.06066C8.72064 6.34196 9.10218 6.5 9.5 6.5H12.5C12.8978 6.5 13.2794 6.34196 13.5607 6.06066C13.842 5.77936 14 5.39782 14 5ZM12.5 2V5H9.5V2H12.5ZM20 2H17V5H20V2ZM5 9.5V12.5H2V9.5H5ZM12.5 9.5V12.5H9.5V9.5H12.5ZM20 9.5V12.5H17V9.5H20ZM15.5 2C15.5 1.60218 15.658 1.22064 15.9393 0.93934C16.2206 0.658035 16.6022 0.5 17 0.5H20C20.3978 0.5 20.7794 0.658035 21.0607 0.93934C21.342 1.22064 21.5 1.60218 21.5 2V5C21.5 5.39782 21.342 5.77936 21.0607 6.06066C20.7794 6.34196 20.3978 6.5 20 6.5H17C16.6022 6.5 16.2206 6.34196 15.9393 6.06066C15.658 5.77936 15.5 5.39782 15.5 5V2ZM17 8C16.6022 8 16.2206 8.15804 15.9393 8.43934C15.658 8.72064 15.5 9.10218 15.5 9.5V12.5C15.5 12.8978 15.658 13.2794 15.9393 13.5607C16.2206 13.842 16.6022 14 17 14H20C20.3978 14 20.7794 13.842 21.0607 13.5607C21.342 13.2794 21.5 12.8978 21.5 12.5V9.5C21.5 9.10218 21.342 8.72064 21.0607 8.43934C20.7794 8.15804 20.3978 8 20 8H17Z"
              fill="#403E3E"
            />
          </svg>
          <span className="">Grid View</span>
        </button>
      )}
    </div>
  );
};

export default ViewTypeFilter;
