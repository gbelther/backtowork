import styles from "./page.module.scss";
import Caique from "@/components/Caique";

export default function Home() {
  return (
    <div className={styles.container}>
      <Caique />
    </div>
  );
}
