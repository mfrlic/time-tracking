import styles from "./ErrorText.module.scss";

type ErrorTextProps = {
  text?: string;
};

export default function ErrorText({ text }: ErrorTextProps) {
  return (
    <label data-testid="error-text" className={styles.root}>
      {text}
    </label>
  );
}
