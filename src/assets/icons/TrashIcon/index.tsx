import type { IconProps } from "../types";

export default function TrashIcon({ color = "#5F6B8A", ...props }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.6564 18.0352C10.6564 15.0832 10.6564 12.1531 10.6564 9.20106C10.6564 8.56693 9.67236 8.56693 9.67236 9.20106C9.67236 12.1531 9.67236 15.0832 9.67236 18.0352C9.67236 18.6693 10.6564 18.6693 10.6564 18.0352Z"
        fill={color}
      />
      <path
        d="M14.2425 18.0352C14.2425 15.0832 14.2425 12.1531 14.2425 9.20106C14.2425 8.56693 13.2585 8.56693 13.2585 9.20106C13.2585 12.1531 13.2585 15.0832 13.2585 18.0352C13.2585 18.6693 14.2425 18.6693 14.2425 18.0352Z"
        fill={color}
      />
      <path
        d="M14.8329 2.15997H9.08196C8.16356 2.15997 7.42009 2.90344 7.42009 3.82184V5.22131C6.45796 5.22131 5.51769 5.22131 4.55556 5.22131C3.92142 5.22131 3.92142 6.20531 4.55556 6.20531C4.81796 6.20531 5.08036 6.20531 5.34276 6.20531V20.1781C5.34276 21.0965 6.08622 21.84 7.00462 21.84H16.9102C17.8286 21.84 18.5721 21.0965 18.5721 20.1781V6.20531C18.8345 6.20531 19.0969 6.20531 19.3593 6.20531C19.9934 6.20531 19.9934 5.22131 19.3593 5.22131C18.3972 5.22131 17.4569 5.22131 16.4948 5.22131V3.82184C16.4948 2.90344 15.7513 2.15997 14.8329 2.15997ZM8.40409 3.82184C8.40409 3.45011 8.71022 3.14397 9.08196 3.14397H14.8329C15.2046 3.14397 15.5108 3.45011 15.5108 3.82184V5.22131C13.1273 5.22131 10.7657 5.22131 8.38222 5.22131V3.82184H8.40409ZM17.5881 20.1781C17.5881 20.5498 17.282 20.856 16.9102 20.856H7.00462C6.63289 20.856 6.32676 20.5498 6.32676 20.1781V6.20531C10.0878 6.20531 13.8489 6.20531 17.61 6.20531V20.1781H17.5881Z"
        fill={color}
      />
    </svg>
  );
}