import { Dialog } from "primereact/dialog";
import { Field, Form, Formik } from "formik";
import { InputText } from "primereact/inputtext";
import type { Tracker } from "@/app/api/types";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { createTracker, updateTracker } from "@/app/api/client";
import type { EditTrackerProps, TrackerFormValues } from "../types";
import styles from "./EditTracker.module.scss";

export default function EditTracker({
  editingTracker,
  onDialogHide,
}: EditTrackerProps) {
  const toast = useRef<Toast>(null);

  const handleSubmit = async ({ description }: TrackerFormValues) => {
    const idTracker = (editingTracker as Tracker)?.idTracker;
    if (idTracker) {
      await updateTracker({ idTracker, description });
    } else {
      await createTracker({
        description,
      });
    }

    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: `Tracker ${idTracker ? "updated" : "created"}`,
      life: 3000,
    });

    onDialogHide();
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        className={styles.root}
        dismissableMask
        header={
          (editingTracker as Tracker)?.idTracker
            ? "Edit tracker"
            : "New tracker"
        }
        visible={!!editingTracker}
        onHide={onDialogHide}
      >
        <Formik
          initialValues={{
            description: editingTracker?.description ?? "",
          }}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <Field
                as={InputText}
                name="description"
                type="text"
                placeholder="Description"
              />

              <Button type="submit" label="Save" disabled={isSubmitting} />
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
