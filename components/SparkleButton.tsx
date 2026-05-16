import type { ButtonHTMLAttributes, ReactNode } from "react";

interface SparkleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

const sparkleParticles = Array.from({ length: 10 }, (_, index) => index);

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.187 8.096L15 5.25L15.813 8.096C16.023 8.831 16.417 9.501 16.958 10.041C17.498 10.582 18.168 10.976 18.903 11.186L21.75 12L18.904 12.813C18.169 13.023 17.499 13.417 16.959 13.958C16.418 14.498 16.024 15.168 15.814 15.903L15 18.75L14.187 15.904C13.977 15.169 13.583 14.499 13.042 13.959C12.502 13.418 11.832 13.024 11.097 12.814L8.25 12L11.096 11.187C11.831 10.977 12.501 10.583 13.041 10.042C13.582 9.502 13.976 8.832 14.186 8.097L14.187 8.096Z"
        fill="currentColor"
      />
      <path
        d="M6 14.25L5.741 15.285C5.593 15.879 5.286 16.421 4.853 16.853C4.421 17.286 3.879 17.593 3.285 17.741L2.25 18L3.285 18.259C3.879 18.407 4.421 18.714 4.853 19.147C5.286 19.579 5.593 20.121 5.741 20.715L6 21.75L6.259 20.715C6.407 20.122 6.714 19.58 7.146 19.147C7.579 18.714 8.121 18.408 8.714 18.259L9.75 18L8.714 17.741C8.121 17.593 7.579 17.286 7.146 16.853C6.714 16.42 6.407 15.878 6.259 15.285L6 14.25Z"
        fill="currentColor"
      />
      <path
        d="M6.5 4L6.303 4.592C6.248 4.757 6.155 4.908 6.031 5.031C5.908 5.155 5.757 5.248 5.592 5.303L5 5.5L5.592 5.697C5.757 5.752 5.908 5.845 6.031 5.969C6.155 6.092 6.248 6.243 6.303 6.409L6.5 7L6.697 6.409C6.752 6.243 6.845 6.092 6.969 5.969C7.092 5.845 7.243 5.752 7.409 5.697L8 5.5L7.409 5.303C7.243 5.248 7.092 5.155 6.969 5.031C6.845 4.908 6.752 4.757 6.697 4.592L6.5 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SparkleButton({ children, className = "", isLoading = false, ...props }: SparkleButtonProps) {
  return (
    <span className={`sparkle-button-shell ${className}`}>
      <button className="sparkle-button" {...props}>
        <span className="sparkle-button__spin" aria-hidden="true" />
        <span className="sparkle-button__backdrop" aria-hidden="true" />
        <SparkleIcon className="sparkle-button__icon" />
        <span className="sparkle-button__text">{children}</span>
      </button>

      <span className="sparkle-button__particles" aria-hidden="true">
        {sparkleParticles.map((particle) => (
          <SparkleIcon className="sparkle-button__particle" key={particle} />
        ))}
      </span>

      {isLoading ? <span className="sparkle-button__loading" aria-hidden="true" /> : null}
    </span>
  );
}
