import { firestore } from "firebase-admin";
import styles from "../../Trackers.module.scss";
import { notFound } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { StopwatchIcon } from "@/assets/icons";
import Timer from "./Timer";
import { initApp } from "@/lib/firebase-admin";

type TrackerPageProps = {
  params: {
    code: string;
  };
};

export const generateMetadata = async ({ params }: TrackerPageProps) => {
  const tracker = await firestore()
    .collection("trackers")
    .where("shareCode", "==", params.code)
    .get();

  const trackerData = tracker?.docs?.[0]?.data();

  return {
    title: `${trackerData?.description} [devōt - Tracking tool]`,
    description: `Track "${trackerData?.description}" using Tracking tool}`,
  };
};

initApp();

export default async function TrackerPage({ params }: TrackerPageProps) {
  const query = await firestore()
    .collection("trackers")
    .where("shareCode", "==", params.code)
    .get();

  const idTracker = query?.docs?.[0]?.id;
  const trackerData = query?.docs?.[0]?.data();

  if (!trackerData) {
    notFound();
  }

  return (
    <main className={styles.root}>
      <PageTitle
        title={`${trackerData?.description}`}
        icon={<StopwatchIcon color="black" />}
      />

      <Timer idTracker={idTracker} />
    </main>
  );
}
