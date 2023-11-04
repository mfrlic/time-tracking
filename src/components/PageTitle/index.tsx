export default function PageTitle({
  title,
  icon,
}: {
  title: string;
  icon?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 32,
      }}
    >
      {icon ? (
        <i
          className={`pi pi-${icon}`}
          style={{
            fontSize: "24px",
            marginRight: 8,
          }}
        />
      ) : null}
      <span
        style={{
          fontSize: "24px",
          fontWeight: "700",
          lineHeight: "17px",
          letterSpacing: "0px",
          textAlign: "left",
        }}
      >
        {title}
      </span>
    </div>
  );
}
