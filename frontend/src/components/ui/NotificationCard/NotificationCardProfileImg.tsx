const NotificationCardProfileImg = () => {
  return (
    <div className="profile-pic">
      <svg
        width="30"
        height="30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15" cy="15" r="15" fill="var(--sa-primary-200)" />
        <mask
          id="a"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="30"
          height="30"
        >
          <circle cx="15" cy="15" r="15" fill="var(--sa-primary-200)" />
        </mask>
        <g mask="url(#a)">
          <path
            d="M14.5 20a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-2.142 2.25A8.356 8.356 0 0 0 4 30.608C4 31.377 4.623 32 5.392 32h18.216c.769 0 1.392-.623 1.392-1.392a8.356 8.356 0 0 0-8.358-8.358h-4.284Z"
            fill="var(--sa-primary-950)"
          />
        </g>
      </svg>
    </div>
  );
};

export default NotificationCardProfileImg;
