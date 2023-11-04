import styles from "../Auth.module.scss";
import { routes } from "@/utils/constants";
import AuthFooter from "@/components/Auth/AuthFooter";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className={styles.root}>
      <LoginForm />

      <AuthFooter
        title="Need an account?"
        linkText="Register here"
        href={routes.register}
      />
    </main>
  );
}
