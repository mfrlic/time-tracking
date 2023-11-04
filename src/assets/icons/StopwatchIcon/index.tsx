import type { IconProps } from "../types";

export default function StopwatchIcon({ color = "#fff", ...props }: IconProps) {
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
        d="M5.72796 19.1326C4.10666 17.512 3.17324 15.3283 3.1222 13.0364C3.07117 10.7446 3.90645 8.52149 5.454 6.83029C7.00155 5.1391 9.14201 4.11028 11.4293 3.95822C13.7167 3.80616 15.9745 4.54259 17.7323 6.01405L18.8047 4.94163L18.1444 4.28127C18.0573 4.19365 18.0085 4.07511 18.0087 3.95161C18.0089 3.82811 18.058 3.70971 18.1453 3.62235C18.2326 3.53499 18.351 3.48579 18.4745 3.48552C18.598 3.48525 18.7166 3.53393 18.8043 3.62091L20.7849 5.60155C20.8719 5.68917 20.9207 5.80771 20.9205 5.93121C20.9203 6.05472 20.8712 6.17311 20.7839 6.26047C20.6966 6.34783 20.5782 6.39703 20.4547 6.3973C20.3312 6.39757 20.2127 6.34888 20.125 6.26189L19.4646 5.60155L18.4153 6.65126C19.2453 7.48221 19.9025 8.46921 20.3492 9.55536C20.7959 10.6415 21.0232 11.8053 21.018 12.9797C21.0128 14.1541 20.7752 15.3159 20.3189 16.398C19.8627 17.4802 19.1967 18.4613 18.3595 19.2849C17.5222 20.1085 16.5303 20.7582 15.4408 21.1966C14.3513 21.6351 13.1858 21.8535 12.0114 21.8394C10.8371 21.8253 9.67718 21.5789 8.59852 21.1144C7.51987 20.6499 6.54383 19.9765 5.72663 19.1331L5.72796 19.1326ZM4.01076 12.8397C4.01076 14.4238 4.48053 15.9724 5.36065 17.2896C6.24077 18.6068 7.49171 19.6334 8.95529 20.2397C10.4189 20.8459 12.0294 21.0045 13.5831 20.6955C15.1368 20.3864 16.564 19.6236 17.6842 18.5034C18.8044 17.3832 19.5672 15.956 19.8763 14.4023C20.1853 12.8485 20.0267 11.2381 19.4205 9.77447C18.8143 8.31089 17.7876 7.05994 16.4704 6.17982C15.1532 5.2997 13.6047 4.82994 12.0205 4.82994C9.89617 4.82994 7.85887 5.67381 6.35676 7.17593C4.85465 8.67804 4.01076 10.7154 4.01076 12.8397ZM10.2405 12.8397C10.2403 12.4449 10.3714 12.0613 10.613 11.7491C10.8547 11.437 11.1933 11.214 11.5755 11.1153V7.05486C11.5755 6.93685 11.6224 6.82367 11.7058 6.74022C11.7893 6.65677 11.9025 6.60988 12.0205 6.60988C12.1385 6.60988 12.2517 6.65677 12.3351 6.74022C12.4186 6.82367 12.4655 6.93685 12.4655 7.05486V11.1158C12.7878 11.199 13.0803 11.3709 13.3098 11.6121C13.5393 11.8532 13.6966 12.1539 13.7638 12.4799C13.831 12.806 13.8054 13.1443 13.6899 13.4565C13.5745 13.7688 13.3738 14.0423 13.1106 14.2462C12.8475 14.4501 12.5324 14.5761 12.2013 14.6099C11.8701 14.6438 11.5361 14.584 11.2372 14.4375C10.9382 14.291 10.6864 14.0636 10.5102 13.7812C10.3341 13.4987 10.2406 13.1725 10.2405 12.8397ZM11.1305 12.8397C11.1305 13.0157 11.1827 13.1877 11.2805 13.3341C11.3783 13.4805 11.5173 13.5945 11.6799 13.6619C11.8425 13.7292 12.0215 13.7469 12.1941 13.7125C12.3667 13.6782 12.5253 13.5934 12.6498 13.469C12.7742 13.3445 12.859 13.1859 12.8933 13.0133C12.9277 12.8406 12.9101 12.6617 12.8427 12.4991C12.7754 12.3365 12.6613 12.1975 12.5149 12.0997C12.3686 12.0019 12.1965 11.9497 12.0205 11.9497C11.7844 11.9497 11.5581 12.0435 11.3912 12.2104C11.2243 12.3773 11.1305 12.6036 11.1305 12.8397ZM9.79556 3.05C9.67754 3.05 9.56436 3.00311 9.48091 2.91966C9.39746 2.83621 9.35057 2.72304 9.35057 2.60502C9.35057 2.487 9.39746 2.37382 9.48091 2.29037C9.56436 2.20692 9.67754 2.16003 9.79556 2.16003H14.2454C14.3634 2.16003 14.4766 2.20692 14.56 2.29037C14.6435 2.37382 14.6904 2.487 14.6904 2.60502C14.6904 2.72304 14.6435 2.83621 14.56 2.91966C14.4766 3.00311 14.3634 3.05 14.2454 3.05H9.79556Z"
        fill={color}
      />
    </svg>
  );
}