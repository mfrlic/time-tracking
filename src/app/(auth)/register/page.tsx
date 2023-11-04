import styles from "../Auth.module.scss";
import { routes } from "@/utils/constants";
import AuthFooter from "@/components/Auth/AuthFooter";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className={styles.root}>
      <RegisterForm />

      <AuthFooter
        title="Already have an account?"
        linkText="Login here"
        href={routes.login}
      />
    </main>
  );
}
